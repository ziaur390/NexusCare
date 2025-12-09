import React, { useState, useEffect } from 'react';
import { getAllUsers, getStats } from '../services/api';

function AdminPanel({ user }) {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersResponse, statsResponse] = await Promise.all([
                getAllUsers(),
                getStats(),
            ]);
            setUsers(usersResponse.data.users);
            setStats(statsResponse.data.stats);
        } catch (error) {
            setError('Failed to fetch admin data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner loading-spinner-lg"></div>
                <p>Loading admin panel...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="card mb-2">
                <div className="card-header">
                    <h1 className="card-title">🔧 Admin Panel</h1>
                    <p className="card-subtitle">System overview and user management</p>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    ⚠️ {error}
                </div>
            )}

            {stats && (
                <>
                    <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.5rem', fontWeight: '700' }}>
                        📊 System Statistics
                    </h2>

                    <div className="grid grid-cols-4 mb-2">
                        {stats.users_by_role && stats.users_by_role.map((item, index) => (
                            <div key={index} className="stat-card" style={{
                                background: `linear-gradient(135deg, var(--${index === 0 ? 'primary' : index === 1 ? 'success' : index === 2 ? 'warning' : 'secondary'
                                    }-500), var(--${index === 0 ? 'primary' : index === 1 ? 'success' : index === 2 ? 'warning' : 'secondary'
                                    }-700))`
                            }}>
                                <div className="stat-value">{item.count}</div>
                                <div className="stat-label">{item.role}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 mb-2">
                        {stats.complaints_by_status && stats.complaints_by_status.map((item, index) => (
                            <div key={index} className="card">
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: 'var(--spacing-sm)' }}>
                                    {item.count}
                                </h3>
                                <p style={{ color: 'var(--gray-600)', fontWeight: '600' }}>
                                    {item.status} Complaints
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.5rem', fontWeight: '700' }}>
                👥 User Management
            </h2>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>#{u.id}</td>
                                <td><strong>{u.username}</strong></td>
                                <td>{u.email}</td>
                                <td>{u.full_name}</td>
                                <td>
                                    <span className={`badge ${u.role === 'Admin' ? 'badge-error' :
                                            u.role === 'Resident' ? 'badge-info' :
                                                u.role === 'Security Staff' ? 'badge-warning' :
                                                    'badge-success'
                                        }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td>{u.phone || 'N/A'}</td>
                                <td>
                                    <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-secondary'
                                        }`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td>{new Date(u.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPanel;
