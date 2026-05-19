import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('/api/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!locationFilter) return fetchComplaints();
    
    try {
      const res = await axios.get(`/api/complaints/search?location=${locationFilter}`);
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredComplaints = categoryFilter 
    ? complaints.filter(c => c.category === categoryFilter) 
    : complaints;

  const getStatusBadgeClass = (status) => {
    if (status === 'Resolved') return 'badge badge-resolved';
    if (status === 'Pending') return 'badge badge-pending';
    return 'badge badge-in-progress';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Dashboard</h2>
        <Link to="/new-complaint" className="btn btn-primary">+ New Complaint</Link>
      </div>

      <div className="glass-card mb-2" style={{ padding: '1rem 2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <label>Search by Location</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Ghaziabad"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: 'fit-content' }}>Search</button>
          
          <div className="form-group" style={{ marginBottom: 0, flex: 1, marginLeft: '2rem' }}>
            <label>Filter by Category</label>
            <select 
              className="form-control"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Roads">Roads</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </form>
      </div>

      <div className="grid-2">
        {filteredComplaints.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No complaints found.</p>
        ) : (
          filteredComplaints.map(complaint => (
            <Link to={`/complaint/${complaint._id}`} key={complaint._id} style={{ color: 'inherit' }}>
              <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>{complaint.title}</h3>
                  <span className={getStatusBadgeClass(complaint.status)}>{complaint.status}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{complaint.category} • {complaint.location}</p>
                <p style={{ flex: 1 }}>{complaint.description.substring(0, 100)}...</p>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Reported by: {complaint.name} on {new Date(complaint.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
