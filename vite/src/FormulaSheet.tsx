import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import './FormulaSheet.css';

const FormulaSheet = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    // LaTeX rendering helpers with proper delimiters
    const renderLatex = (latexString: string) => (
        <Latex>{`\\[${latexString}\\]`}</Latex>
    );

    const renderInlineLatex = (latexString: string) => (
        <Latex>{`\\(${latexString}\\)`}</Latex>
    );

    return (
        <div className="formula-screen">
            <div className="header">
                <Link to="/learn" className="back-btn">
                    <i className="fas fa-arrow-left"></i> Back
                </Link>
                <div className="page-title">Formula Sheet</div>
                <button
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label="Toggle dark mode"
                >
                    <i className="fas fa-moon"></i>
                </button>
            </div>

            <main className="content-wrapper formula-content">

                {/* Algebra */}
                <section className="formula-section">
                    <h2>Algebra</h2>
                    <div className="formula-card">
                        <h3>Quadratic Formula</h3>
                        {renderLatex(`x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`)}
                        <p>Solves {renderInlineLatex(`ax^2 + bx + c = 0`)}</p>
                    </div>
                </section>

                {/* Sequences & Series */}
                <section className="formula-section">
                    <h2>Sequences & Series</h2>
                    <div className="formula-card">
                        <h3>Arithmetic Progression (AP)</h3>
                        {renderLatex(`T_n = a + (n-1)d`)}
                        {renderLatex(`S_n = \\frac{n}{2}[2a + (n-1)d]`)}
                    </div>
                    <div className="formula-card">
                        <h3>Geometric Progression (GP)</h3>
                        {renderLatex(`T_n = ar^{n-1}`)}
                        {renderLatex(`S_n = \\frac{a(r^n - 1)}{r - 1}, \\quad r \\ne 1`)}
                        {renderLatex(`S_\\infty = \\frac{a}{1 - r}, \\quad -1 < r < 1`)}
                    </div>
                </section>

                {/* Calculus */}
                <section className="formula-section">
                    <h2>Calculus</h2>
                    <div className="formula-card">
                        <h3>First Principles</h3>
                        {renderLatex(`f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}`)}
                    </div>
                </section>

                {/* Analytical Geometry */}
                <section className="formula-section">
                    <h2>Analytical Geometry</h2>
                    <div className="formula-card">
                        <h3>Distance & Midpoint</h3>
                        {renderLatex(`d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`)}
                        {renderLatex(`M\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)`)}
                    </div>
                    <div className="formula-card">
                        <h3>Straight Line</h3>
                        {renderLatex(`y = mx + c`)}
                        {renderLatex(`y - y_1 = m(x - x_1)`)}
                        {renderLatex(`m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan \\theta`)}
                    </div>
                    <div className="formula-card">
                        <h3>Circle</h3>
                        {renderLatex(`(x - a)^2 + (y - b)^2 = r^2`)}
                    </div>
                </section>

                {/* Trigonometry */}
                <section className="formula-section">
                    <h2>Trigonometry</h2>
                    <div className="formula-card">
                        <h3>Laws</h3>
                        {renderLatex(`\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}`)}
                        {renderLatex(`a^2 = b^2 + c^2 - 2bc \\cos A`)}
                        {renderLatex(`\\text{Area} = \\frac{1}{2} ab \\sin C`)}
                    </div>
                    <div className="formula-card">
                        <h3>Identities</h3>
                        {renderLatex(`\\sin(\\alpha \\pm \\beta) = \\sin \\alpha \\cos \\beta \\pm \\cos \\alpha \\sin \\beta`)}
                        {renderLatex(`\\cos(\\alpha \\pm \\beta) = \\cos \\alpha \\cos \\beta \\mp \\sin \\alpha \\sin \\beta`)}
                        {renderLatex(`\\cos 2\\alpha = \\cos^2 \\alpha - \\sin^2 \\alpha`)}
                        {renderLatex(`\\sin 2\\alpha = 2 \\sin \\alpha \\cos \\alpha`)}
                    </div>
                </section>

                {/* Statistics & Probability */}
                <section className="formula-section">
                    <h2>Statistics & Probability</h2>
                    <div className="formula-card">
                        <h3>Statistics</h3>
                        {renderLatex(`\\bar{x} = \\frac{\\sum x_i}{n}`)}
                        {renderLatex(`\\sigma^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n}`)}
                        {renderLatex(`\\hat{y} = a + bx`)}
                        {renderLatex(`b = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2}`)}
                    </div>
                    <div className="formula-card">
                        <h3>Probability</h3>
                        {renderLatex(`P(A) = \\frac{n(A)}{n(S)}`)}
                        {renderLatex(`P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)`)}
                    </div>
                </section>

                {/* Finance */}
                <section className="formula-section">
                    <h2>Finance</h2>
                    <div className="formula-card">
                        <h3>Interest Formulas</h3>
                        {renderLatex(`A = P(1 + ni)`)}
                        <p>Simple Interest</p>
                        {renderLatex(`A = P(1 + i)^n`)}
                        <p>Compound Interest</p>
                        {renderLatex(`A = P(1 - i)^n`)}
                        <p>Depreciation</p>
                    </div>
                    <div className="formula-card">
                        <h3>Annuities</h3>
                        {renderLatex(`F = \\frac{x[(1 + i)^n - 1]}{i}`)}
                        <p>Future Value</p>
                        {renderLatex(`P = \\frac{x[1 - (1 + i)^{-n}]}{i}`)}
                        <p>Present Value</p>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default FormulaSheet;