import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewComplaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    category: 'Water Supply',
    location: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError('');

    try {
      // First, get AI analysis
      let aiData = {};
      try {
        const aiRes = await axios.post('http://localhost:5000/api/ai/analyze', {
          title: formData.title,
          description: formData.description,
          category: formData.category
        });
        aiData = aiRes.data;
      } catch (aiErr) {
        console.error('AI Analysis failed, saving without AI data', aiErr);
      }

      // Merge form data with AI analysis
      const finalData = { ...formData, ...aiData };

      // Save complaint
      await axios.post('http://localhost:5000/api/complaints', finalData);
      
      setIsAnalyzing(false);
      navigate('/');
    } catch (err) {
      setIsAnalyzing(false);
      setError(err.response?.data?.msg || 'Failed to submit complaint');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="glass-card">
        <h2 className="mb-2">Register New Complaint</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Complaint Title</label>
            <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" className="form-control" value={formData.category} onChange={handleChange} required>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Roads">Roads</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} placeholder="e.g. Ghaziabad" required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" className="form-control" rows="5" value={formData.description} onChange={handleChange} required></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing with AI & Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewComplaint;
