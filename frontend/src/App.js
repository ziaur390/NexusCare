import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import { checkSession } from './services/api';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user session exists
        const verifySession = async () => {
            try {
                const response = await checkSession();
                if (response.data.authenticated) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Session check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        verifySession();
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner loading-spinner-lg"></div>
                <p>Loading NexusCare...</p>
            </div>
        );
    }

    return (
        <Router>
            <div className="app-container">
                {user && <Navbar user={user} onLogout={handleLogout} />}
                <main className="main-content">
                    <Routes>
                        {/* Public Routes */}
                        <Route
                            path="/login"
                            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
                        />
                        <Route
                            path="/register"
                            element={user ? <Navigate to="/dashboard" /> : <Register />}
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/complaints"
                            element={user ? <Complaints user={user} /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/admin"
                            element={
                                user ? (
                                    user.role === 'Admin' ? <AdminPanel user={user} /> : <Unauthorized />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />

                        {/* Default Routes */}
                        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
