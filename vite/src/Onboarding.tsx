import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Onboarding = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const navigate = useNavigate();
    const slidesCount = 3;

    const handleNext = () => {
        if (currentSlideIndex < slidesCount - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('onboardingComplete', 'true');
        navigate('/learn');
    };

    const handleComplete = () => {
        localStorage.setItem('onboardingComplete', 'true');
        navigate('/learn');
    };

    const progressPercentage = ((currentSlideIndex + 1) / slidesCount) * 100;

    return (
        <div className="onboarding-body">
            {/* Preloader - Optional: You might want to handle this with a separate state or component */}
            {/* <div id="preloader">
          <img src="/images/logo.png" alt="Lyro Maths Logo" className="preloader-logo" />
      </div> */}

            <div className="canvas">
                {/* Dynamic Background Elements */}
                <div className="bg-mesh"></div>

                {/* Progress Bar */}
                <div className="progress-container">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                {/* Shared Brand Header */}
                <div className="brand">
                    <img src="/images/logo.png" alt="Lyro Maths Logo" className="logo-img small" />
                    <div className="app-name">Lyro Maths</div>
                </div>

                <div className="glass-card-container">
                    {/* Slide 1 */}
                    <div className={`slide ${currentSlideIndex === 0 ? 'active' : ''}`}>
                        <div className="slide-content">
                            <div className="step-badge">STEP 1</div>
                            <div className="illustration-container">
                                <img src="/images/first.png" alt="Core Concepts Illustration" className="onboarding-img" />
                            </div>
                            <h2 className="headline">Master Every <span className="text-teal">Section</span>.</h2>
                            <p className="body">Seamlessly navigate Grade 12 Paper 1 (Algebra) and Paper 2 (Geometry) topics with interactive lessons.</p>
                        </div>
                        <div className="cta-row">
                            <button onClick={handleSkip} className="btn link-skip">Skip</button>
                            <button onClick={handleNext} className="btn next">Next <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div className={`slide ${currentSlideIndex === 1 ? 'active' : ''}`}>
                        <div className="slide-content">
                            <div className="step-badge">STEP 2</div>
                            <div className="illustration-container">
                                <img src="/images/second.png" alt="Detailed Solutions Illustration" className="onboarding-img" />
                            </div>
                            <h2 className="headline">Understand the <span className="text-orange">'How' & 'Why'</span>.</h2>
                            <p className="body">Access step-by-step solutions for all examples, ensuring you grasp the underlying mathematical logic.</p>
                        </div>
                        <div className="cta-row">
                            <button onClick={handleBack} className="btn back">Back</button>
                            <button onClick={handleSkip} className="btn link-skip">Skip</button>
                            <button onClick={handleNext} className="btn next">Next <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div className={`slide ${currentSlideIndex === 2 ? 'active' : ''}`}>
                        <div className="slide-content">
                            <div className="step-badge">STEP 3</div>
                            <div className="illustration-container">
                                <img src="/images/third.png" alt="Exam Success Illustration" className="onboarding-img" />
                            </div>
                            <h2 className="headline">Track Progress & <span className="text-teal">Ace Exams</span>.</h2>
                            <p className="body">Simulate past papers under exam conditions and use detailed progress reports to focus on your weak areas.</p>
                        </div>
                        <div className="cta-row">
                            <button onClick={handleBack} className="btn back">Back</button>
                            <button onClick={handleComplete} className="btn primary">Get Started</button>
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="dots">
                    {[0, 1, 2].map((index) => (
                        <span
                            key={index}
                            className={`dot ${currentSlideIndex === index ? 'active' : ''} ${index === 1 ? 'orange' : 'teal'}`}
                            onClick={() => setCurrentSlideIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
