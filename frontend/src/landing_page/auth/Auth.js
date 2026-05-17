import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
    };

    const validateForm = () => {
        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return false;
            }
            if (!formData.email.includes('@')) {
                setError('Please enter a valid email');
                return false;
            }
        }
        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002';
            if (isLogin) {
                // Login
                const response = await axios.post(`${backendUrl}/login`, {
                    username: formData.username,
                    password: formData.password
                });
                const token = response.data.token;
                // keep token/user in landing origin as well
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // redirect to dashboard and pass token via URL so dashboard (different origin/port) can store it
                const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || 'http://localhost:3000';
                window.location.replace(`${dashboardUrl}?token=${token}`);
            } else {
                // Signup
                await axios.post(`${backendUrl}/register`, {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                setSuccess('Account created successfully! Switching to login...');
                setIsLogin(true);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (err) {
            setError(err.response?.data?.error || (isLogin ? 'Login failed' : 'Registration failed'));
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setError('');
        setSuccess('');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h2>{isLogin ? 'Login to Zerodha' : 'Join Zerodha'}</h2>
                    <p className="auth-subtitle">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button 
                            type="button" 
                            onClick={toggleMode}
                            className="toggle-btn"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>

                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Trade with Zerodha - The stock trading platform</p>
                </div>
            </div>
        </div>
    );
}

export default Auth;
