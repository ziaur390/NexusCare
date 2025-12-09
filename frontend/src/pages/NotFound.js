import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <div className="card text-center" style={{ maxWidth: '500px' }}>
                <div style={{ fontSize: '6rem', marginBottom: 'var(--spacing-md)' }}>
                    404
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                    Page Not Found
                </h1>
                <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--spacing-xl)' }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
