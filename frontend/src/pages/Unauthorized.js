import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <div className="card text-center" style={{ maxWidth: '500px' }}>
                <div style={{ fontSize: '6rem', marginBottom: 'var(--spacing-md)' }}>
                    🚫
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                    Access Denied
                </h1>
                <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--spacing-xl)' }}>
                    You don't have permission to access this page. Please contact your administrator if you believe this is an error.
                </p>
                <div className="flex gap-1 justify-center">
                    <button onClick={() => navigate(-1)} className="btn btn-secondary">
                        Go Back
                    </button>
                    <Link to="/dashboard" className="btn btn-primary">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
