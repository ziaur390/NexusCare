import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            onLogout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="navbar-brand">
                    🏘️ NexusCare
                </Link>

                <ul className="navbar-nav">
                    <li>
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/complaints" className="nav-link">
                            Complaints
                        </Link>
                    </li>
                    {user.role === 'Admin' && (
                        <li>
                            <Link to="/admin" className="nav-link">
                                Admin Panel
                            </Link>
                        </li>
                    )}
                    <li className="user-info">
                        <div className="user-avatar">
                            {getInitials(user.username)}
                        </div>
                        <div className="user-details">
                            <div className="user-name">{user.username}</div>
                            <div className="user-role">{user.role}</div>
                        </div>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
