import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Learn.css';

const Learn = () => {
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
        <div className="learn-screen">


            <main className="content-wrapper">
                <button
                    id="theme-toggle"
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    <i className="fas fa-moon"></i>
                </button>
                <div className="hero">
                    <div className="hero-title">GRADE 12 MATHS</div>
                    <div className="hero-sub">Master Grade 12 Maths. Achieve Your Potential.</div>
                </div>

                <div className="paper-cards">
                    <Link to="/paper1" className="card card-teal">
                        <div className="card-icons">
                            <i className="fas fa-square-root-alt"></i>
                            <span className="eq">x = -b ± √...</span>
                        </div>
                        <div className="card-title">Paper 1<br />Algebra</div>
                        <div className="chevron"><i className="fas fa-chevron-right"></i></div>
                    </Link>
                    <Link to="/paper2" className="card card-orange">
                        <div className="card-icons">
                            <i className="fas fa-shapes"></i>
                            <span className="eq">sin²θ + cos²θ</span>
                        </div>
                        <div className="card-title">Paper 2<br />Geometry</div>
                        <div className="chevron"><i className="fas fa-chevron-right"></i></div>
                    </Link>
                </div>

                <div className="utilities">
                    <Link to="/formula-sheet" className="util-item">
                        <div className="icon-circle icon-green"><i className="fas fa-file-alt"></i></div>
                        <span className="util-label">Formula Sheet</span>
                    </Link>
                    <a href="#" className="util-item">
                        <div className="icon-circle icon-orange"><i className="fas fa-clock"></i></div>
                        <span className="util-label">Past Papers</span>
                    </a>
                    <a href="#" className="util-item">
                        <div className="icon-circle icon-teal"><i className="fas fa-calculator"></i></div>
                        <span className="util-label">NBT Prep</span>
                    </a>
                </div>
            </main>

            <div className="bottom-nav">
                <Link to="/learn" className="nav-item active"><i className="fas fa-home"></i><span>Home</span></Link>
                <Link to="/login" className="nav-item"><i className="fas fa-user"></i><span>login</span></Link>
                <div id="settings-btn" className="nav-item"><i className="fas fa-cog"></i><span>Settings</span></div>
                <a href="#" className="nav-item"><i className="fas fa-book-open"></i><span>Resources</span></a>
            </div>
        </div>
    );
};

export default Learn;
