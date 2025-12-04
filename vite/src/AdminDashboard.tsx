import { useState } from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import './AdminDashboard.css';

interface Question {
    latex: string;
    topic: string;
    paper: 1 | 2;
    options: string[];
    correctAnswer: number;
}

const AdminDashboard = () => {
    const [selectedPaper, setSelectedPaper] = useState<1 | 2>(1);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [latexInput, setLatexInput] = useState('\\int_{a}^{b} x^2 \\, dx');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const paper1Topics = [
        'Algebra',
        'Functions',
        'Sequences and Series',
        'Calculus',
        'Probability',
        'Statistics'
    ];

    const paper2Topics = [
        'Euclidean Geometry',
        'Analytical Geometry',
        'Trigonometry',
        'Statistics',
        'Transformations'
    ];

    const topics = selectedPaper === 1 ? paper1Topics : paper2Topics;

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handlePublish = () => {
        const question: Question = {
            latex: latexInput,
            topic: selectedTopic,
            paper: selectedPaper,
            options,
            correctAnswer
        };

        console.log('Publishing question:', question);
        // TODO: Send to backend API
        alert('Question published successfully!');

        // Reset form
        setLatexInput('');
        setOptions(['', '', '', '']);
        setCorrectAnswer(0);
    };

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <img src="/images/logo.png" alt="Lyro Logo" className="logo-img" />
                    <h2>Lyro Admin</h2>
                </div>
                <nav className="admin-nav">
                    <a href="#content" className="nav-item active">
                        <i className="fa-solid fa-file-lines"></i>
                        Content Manager
                    </a>
                    <a href="#questions" className="nav-item">
                        <i className="fa-solid fa-list"></i>
                        All Questions
                    </a>
                    <a href="#analytics" className="nav-item">
                        <i className="fa-solid fa-chart-line"></i>
                        Analytics
                    </a>
                    <a href="#users" className="nav-item">
                        <i className="fa-solid fa-users"></i>
                        Users
                    </a>
                    <a href="#settings" className="nav-item">
                        <i className="fa-solid fa-gear"></i>
                        Settings
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Content Manager</h1>
                    <div className="admin-user">
                        <span>Admin User</span>
                        <i className="fa-solid fa-circle-user"></i>
                    </div>
                </header>

                <div className="admin-content">
                    {/* Paper Selector */}
                    <div className="paper-selector">
                        <button
                            className={`paper-btn ${selectedPaper === 1 ? 'active' : ''}`}
                            onClick={() => setSelectedPaper(1)}
                        >
                            Paper 1
                        </button>
                        <button
                            className={`paper-btn ${selectedPaper === 2 ? 'active' : ''}`}
                            onClick={() => setSelectedPaper(2)}
                        >
                            Paper 2
                        </button>
                    </div>

                    {/* Topic Selector */}
                    <div className="topic-selector">
                        <label htmlFor="topic">Select Topic</label>
                        <select
                            id="topic"
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className="topic-dropdown"
                        >
                            <option value="">Choose a topic...</option>
                            {topics.map((topic) => (
                                <option key={topic} value={topic}>
                                    {topic}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* LaTeX Editor */}
                    <div className="latex-editor">
                        <h3>Live LaTeX Editor</h3>
                        <div className="editor-panels">
                            {/* Input Panel */}
                            <div className="editor-input">
                                <div className="panel-header">
                                    <span>LaTeX Input</span>
                                    <i className="fa-solid fa-code"></i>
                                </div>
                                <textarea
                                    value={latexInput}
                                    onChange={(e) => setLatexInput(e.target.value)}
                                    placeholder="Enter LaTeX code here..."
                                    className="latex-textarea"
                                    spellCheck={false}
                                />
                                <div className="latex-hints">
                                    <p>Quick tips:</p>
                                    <code>\frac{'{'}a{'}'}{'{'} b{'}'}</code> - Fraction
                                    <code>\int_{'{'}a{'}'}^{'{'}b{'}'}</code> - Integral
                                    <code>\sqrt{'{'}x{'}'}</code> - Square root
                                </div>
                            </div>

                            {/* Preview Panel */}
                            <div className="editor-preview">
                                <div className="panel-header">
                                    <span>Live Preview</span>
                                    <i className="fa-solid fa-eye"></i>
                                </div>
                                <div className="preview-content">
                                    {latexInput ? (
                                        <Latex>{`$${latexInput}$`}</Latex>
                                    ) : (
                                        <p className="preview-placeholder">Preview will appear here...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Answer Options */}
                    <div className="answer-options">
                        <h3>Answer Options</h3>
                        <div className="options-grid">
                            {options.map((option, index) => (
                                <div key={index} className="option-item">
                                    <label>
                                        <input
                                            type="radio"
                                            name="correct"
                                            checked={correctAnswer === index}
                                            onChange={() => setCorrectAnswer(index)}
                                        />
                                        <span className="option-label">Option {String.fromCharCode(65 + index)}</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder={`Enter option ${String.fromCharCode(65 + index)}...`}
                                        className="option-input"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Publish Button */}
                    <div className="publish-section">
                        <button
                            onClick={handlePublish}
                            className="publish-btn"
                            disabled={!selectedTopic || !latexInput || options.every(opt => !opt)}
                        >
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            Publish Question
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
