import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // TODO: Add registration logic here
        console.log('Signup attempt:', formData);
        // For now, just navigate to learn page
        navigate('/learn');
    };

    return (
        <div className="signup-screen">
            <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
            >
                <i className="fas fa-moon"></i>
            </button>

            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <img src="/images/logo.png" alt="Lyro Logo" className="signup-logo" />
                        <h1 className="signup-title">Create Account</h1>
                        <p className="signup-subtitle">Join us and start your learning journey</p>
                    </div>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

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

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                                minLength={6}
                            />
                        </div>

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
                                minLength={6}
                            />
                        </div>

                        <div className="terms-agreement">
                            <label className="terms-label">
                                <input type="checkbox" required />
                                <span>I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link></span>
                            </label>
                        </div>

                        <button type="submit" className="signup-btn">
                            Create Account
                        </button>
                    </form>

                    <div className="signup-footer">
                        <p>Already have an account? <Link to="/login" className="login-link">Sign in</Link></p>
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

export default Signup;
