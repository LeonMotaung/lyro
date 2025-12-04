import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add authentication logic here
        console.log('Login attempt:', { email, password });
        // For now, just navigate to learn page
        navigate('/learn');
    };

    return (
        <div className="login-screen">
            <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
            >
                <i className="fas fa-moon"></i>
            </button>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <img src="/images/logo.png" alt="Lyro Logo" className="login-logo" />
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to continue your learning journey</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="login-btn">
                            Sign In
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
                    </div>

                    <div className="back-to-home">
                        <Link to="/" className="home-link">
                            <i className="fas fa-arrow-left"></i> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
