import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      // Find complaint from the list
      const res = await axios.get('/api/complaints');
      const found = res.data.find(c => c._id === id);
      if (found) {
        setComplaint(found);
        setStatus(found.status);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/complaints/${id}`, { status });
      // update local state
      setComplaint({ ...complaint, status });
      alert('Status updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await axios.delete(`/api/complaints/${id}`);
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <div className="text-center mt-2">Loading...</div>;
  if (!complaint) return <div className="text-center mt-2">Complaint not found</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div className="glass-card mb-2">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>{complaint.title}</h2>
          <button className="btn" style={{ backgroundColor: 'var(--danger)', color: 'white' }} onClick={handleDelete}>Delete</button>
        </div>
        
        <div className="grid-2 mb-2">
          <div>
            <p><strong>Reported By:</strong> {complaint.name} ({complaint.email})</p>
            <p><strong>Category:</strong> {complaint.category}</p>
            <p><strong>Location:</strong> {complaint.location}</p>
            <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <form onSubmit={handleStatusUpdate} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
              <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                <label>Update Status</label>
                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>

        <div>
          <h3>Description</h3>
          <p style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>{complaint.description}</p>
        </div>
      </div>

      <div className="glass-card ai-card">
        <h3 style={{ color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ✨ AI Analysis Results
        </h3>
        
        <div className="grid-2 mt-1">
          <div>
            <p><strong>Urgency Priority:</strong> 
              <span className={`badge ${complaint.priority === 'High' ? 'badge-pending' : complaint.priority === 'Medium' ? 'badge-in-progress' : 'badge-resolved'}`} style={{ marginLeft: '0.5rem' }}>
                {complaint.priority || 'N/A'}
              </span>
            </p>
            <p className="mt-1"><strong>Suggested Department:</strong> <br/> {complaint.department || 'N/A'}</p>
          </div>
          <div>
            <p><strong>AI Summary:</strong></p>
            <p style={{ color: 'var(--text-muted)' }}>{complaint.summary || 'N/A'}</p>
          </div>
        </div>
        
        <div className="mt-2">
          <p><strong>Auto-Generated Response sent to User:</strong></p>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            "{complaint.autoResponse || 'N/A'}"
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
