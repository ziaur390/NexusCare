import React, { useState, useEffect } from 'react';
import { getComplaints, createComplaint, updateComplaint, deleteComplaint } from '../services/api';

function Complaints({ user }) {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingComplaint, setEditingComplaint] = useState(null);
    const [filter, setFilter] = useState('all');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Maintenance',
        priority: 'Medium',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await getComplaints();
            setComplaints(response.data.complaints);
        } catch (error) {
            setError('Failed to fetch complaints');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (editingComplaint) {
                await updateComplaint(editingComplaint.id, formData);
                setSuccess('Complaint updated successfully!');
            } else {
                await createComplaint(formData);
                setSuccess('Complaint created successfully!');
            }

            setShowModal(false);
            setEditingComplaint(null);
            setFormData({
                title: '',
                description: '',
                category: 'Maintenance',
                priority: 'Medium',
            });
            fetchComplaints();

            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError(error.response?.data?.error || 'Operation failed');
        }
    };

    const handleEdit = (complaint) => {
        setEditingComplaint(complaint);
        setFormData({
            title: complaint.title,
            description: complaint.description,
            category: complaint.category,
            priority: complaint.priority,
            status: complaint.status,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this complaint?')) {
            try {
                await deleteComplaint(id);
                setSuccess('Complaint deleted successfully!');
                fetchComplaints();
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) {
                setError('Failed to delete complaint');
            }
        }
    };

    const openCreateModal = () => {
        setEditingComplaint(null);
        setFormData({
            title: '',
            description: '',
            category: 'Maintenance',
            priority: 'Medium',
        });
        setShowModal(true);
    };

    const getStatusBadge = (status) => {
        const badges = {
            'Open': 'badge-error',
            'In Progress': 'badge-warning',
            'Resolved': 'badge-success',
            'Closed': 'badge-secondary',
        };
        return badges[status] || 'badge-secondary';
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            'Low': 'badge-info',
            'Medium': 'badge-warning',
            'High': 'badge-error',
            'Critical': 'badge-error',
        };
        return badges[priority] || 'badge-secondary';
    };

    const filteredComplaints = complaints.filter(complaint => {
        if (filter === 'all') return true;
        return complaint.status === filter;
    });

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner loading-spinner-lg"></div>
                <p>Loading complaints...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="card mb-2">
                <div className="card-header">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="card-title">📝 Complaint Management</h1>
                            <p className="card-subtitle">Report and track community issues</p>
                        </div>
                        <button onClick={openCreateModal} className="btn btn-primary">
                            + New Complaint
                        </button>
                    </div>
                </div>
            </div>

            {success && (
                <div className="alert alert-success">
                    ✓ {success}
                </div>
            )}

            {error && (
                <div className="alert alert-error">
                    ⚠️ {error}
                </div>
            )}

            <div className="card mb-2">
                <div className="flex gap-1" style={{ flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setFilter('all')}
                        className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                        All ({complaints.length})
                    </button>
                    <button
                        onClick={() => setFilter('Open')}
                        className={`btn ${filter === 'Open' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                        Open ({complaints.filter(c => c.status === 'Open').length})
                    </button>
                    <button
                        onClick={() => setFilter('In Progress')}
                        className={`btn ${filter === 'In Progress' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                        In Progress ({complaints.filter(c => c.status === 'In Progress').length})
                    </button>
                    <button
                        onClick={() => setFilter('Resolved')}
                        className={`btn ${filter === 'Resolved' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    >
                        Resolved ({complaints.filter(c => c.status === 'Resolved').length})
                    </button>
                </div>
            </div>

            {filteredComplaints.length === 0 ? (
                <div className="card text-center">
                    <div style={{ padding: 'var(--spacing-2xl)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>📭</div>
                        <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>No complaints found</h3>
                        <p style={{ color: 'var(--gray-600)' }}>
                            {filter === 'all'
                                ? 'Create your first complaint to get started'
                                : `No complaints with status: ${filter}`}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                {user.role === 'Admin' && <th>Submitted By</th>}
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComplaints.map((complaint) => (
                                <tr key={complaint.id}>
                                    <td>#{complaint.id}</td>
                                    <td>
                                        <strong>{complaint.title}</strong>
                                        <br />
                                        <small style={{ color: 'var(--gray-600)' }}>
                                            {complaint.description.substring(0, 50)}...
                                        </small>
                                    </td>
                                    <td>{complaint.category}</td>
                                    <td>
                                        <span className={`badge ${getPriorityBadge(complaint.priority)}`}>
                                            {complaint.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(complaint.status)}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    {user.role === 'Admin' && (
                                        <td>{complaint.username}</td>
                                    )}
                                    <td>
                                        {new Date(complaint.created_at).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            {(user.role === 'Admin' || complaint.user_id === user.id) && (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(complaint)}
                                                        className="btn btn-secondary btn-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(complaint.id)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {editingComplaint ? 'Edit Complaint' : 'Create New Complaint'}
                            </h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="title">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-input"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Brief description of the issue"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="description">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    placeholder="Detailed description of the complaint"
                                />
                            </div>

                            <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-md)' }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="category">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        className="form-select"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Security">Security</option>
                                        <option value="Noise">Noise</option>
                                        <option value="Parking">Parking</option>
                                        <option value="Cleanliness">Cleanliness</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="priority">
                                        Priority *
                                    </label>
                                    <select
                                        id="priority"
                                        className="form-select"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        required
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Critical">Critical</option>
                                    </select>
                                </div>
                            </div>

                            {editingComplaint && user.role === 'Admin' && (
                                <div className="form-group">
                                    <label className="form-label" htmlFor="status">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        className="form-select"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        required
                                    >
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-1 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingComplaint ? 'Update' : 'Create'} Complaint
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Complaints;
