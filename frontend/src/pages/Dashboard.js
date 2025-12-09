import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
    const features = [
        {
            icon: '📝',
            title: 'Complaint Management',
            description: 'Report and track community issues and complaints',
            link: '/complaints',
            color: 'var(--primary-500)',
        },
        {
            icon: '👥',
            title: 'Resident Services',
            description: 'Access community services and information',
            link: '/dashboard',
            color: 'var(--secondary-500)',
        },
        {
            icon: '🏥',
            title: 'Medical Assistance',
            description: 'Book appointments and request medical help',
            link: '/dashboard',
            color: 'var(--success-500)',
        },
        {
            icon: '🔒',
            title: 'Security Services',
            description: 'Visitor management and emergency alerts',
            link: '/dashboard',
            color: 'var(--warning-500)',
        },
    ];

    return (
        <div>
            <div className="hero">
                <h1 className="hero-title">Welcome to NexusCare</h1>
                <p className="hero-subtitle">
                    Your Integrated Smart Community Services Platform
                </p>
                <div style={{ marginTop: 'var(--spacing-xl)' }}>
                    <span className="badge badge-info" style={{ fontSize: '1rem', padding: 'var(--spacing-sm) var(--spacing-lg)' }}>
                        Logged in as: {user.role}
                    </span>
                </div>
            </div>

            <div className="card mb-2">
                <div className="card-header">
                    <h2 className="card-title">👋 Hello, {user.username}!</h2>
                    <p className="card-subtitle">
                        Welcome back to your dashboard. Here's what you can do:
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 mb-2">
                {features.map((feature, index) => (
                    <Link
                        to={feature.link}
                        key={index}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="card" style={{ height: '100%' }}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: 'var(--spacing-md)',
                                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: 'var(--spacing-sm)',
                                color: feature.color
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                                {feature.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-3">
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))' }}>
                    <div className="stat-value">24/7</div>
                    <div className="stat-label">Support Available</div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--success-500), var(--success-600))' }}>
                    <div className="stat-value">100%</div>
                    <div className="stat-label">Secure Platform</div>
                </div>
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-700))' }}>
                    <div className="stat-value">Fast</div>
                    <div className="stat-label">Response Time</div>
                </div>
            </div>

            {user.role === 'Admin' && (
                <div className="card mt-2">
                    <div className="card-header">
                        <h3 className="card-title">🔧 Admin Quick Actions</h3>
                    </div>
                    <div className="card-body">
                        <div className="flex gap-2">
                            <Link to="/admin" className="btn btn-primary">
                                Go to Admin Panel
                            </Link>
                            <Link to="/complaints" className="btn btn-secondary">
                                View All Complaints
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
