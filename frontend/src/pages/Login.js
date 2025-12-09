import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await login(formData);
            onLogin(response.data.user);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="card-header text-center">
                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        🏘️ NexusCare
                    </h1>
                    <p className="card-subtitle">Smart Community Services Platform</p>
                </div>

                <div className="card-body">
                    {error && (
                        <div className="alert alert-error">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-input"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-2">
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: '600' }}>
                                Register here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-2" style={{
                        padding: 'var(--spacing-md)',
                        background: 'var(--gray-50)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.75rem'
                    }}>
                        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Demo Credentials:</p>
                        <p>Admin: admin / admin123</p>
                        <p>Resident: resident1 / admin123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
