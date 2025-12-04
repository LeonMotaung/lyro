import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Assuming shared styles are here

function Home() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <>
            <button
                id="theme-toggle"
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
            >
                <i className="fas fa-moon"></i>
            </button>

            <div className="app-container">
                <div className="hero-content">
                    <img src="/images/logo.png" alt="Lyro Maths Logo" className="logo-img" />
                    <h1 className="headline">Lyro Maths</h1>
                    <p className="body">Master Grade 12 Maths.</p>
                    <p className="body"><span className="text-teal">Achieve Your Potential.</span></p>
                </div>

                <div className="feature-grid">
                    <div className="feature-item">
                        <div className="icon-circle icon-green"><i className="fas fa-lightbulb"></i></div>
                        <span>Interactive Lessons</span>
                    </div>
                    <div className="feature-item">
                        <div className="icon-circle icon-orange"><i className="fas fa-search-plus"></i></div>
                        <span>Step-by-Step Solutions</span>
                    </div>
                    <div className="feature-item">
                        <div className="icon-circle icon-green"><i className="fas fa-clipboard-check"></i></div>
                        <span>Practice Quizzes</span>
                    </div>
                    <div className="feature-item">
                        <div className="icon-circle icon-orange"><i className="fas fa-chart-line"></i></div>
                        <span>Progress Tracking</span>
                    </div>
                </div>

                <div className="cta-container">
                    <Link to="/onboarding" className="button primary-btn">
                        Get Started <i className="fas fa-arrow-right"></i>
                    </Link>
                    <Link to="/learn" className="button secondary-btn">Learn More</Link>
                    <p className="footer-note">Aligned with Grade 12 Curriculum.</p>
                </div>
            </div>
        </>
    );
}

export default Home;
