import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import './Paper.css';

interface Question {
    id: number;
    latex: string;
    topic: string;
    options: string[];
    correctAnswer: number;
}

const Paper1 = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedTopic, setSelectedTopic] = useState('all');
    const [loading, setLoading] = useState(true);

    const topics = [
        'All Topics',
        'Algebra',
        'Functions',
        'Sequences and Series',
        'Calculus',
        'Probability',
        'Statistics'
    ];

    useEffect(() => {
        // Fetch questions from API
        fetchQuestions();
    }, [selectedTopic]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            // TODO: Replace with actual API call
            const response = await fetch(`/api/questions/paper/1${selectedTopic !== 'all' ? `?topic=${selectedTopic}` : ''}`);

            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                // Mock data for development
                setQuestions(getMockQuestions());
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Use mock data if API fails
            setQuestions(getMockQuestions());
        } finally {
            setLoading(false);
        }
    };

    const getMockQuestions = (): Question[] => {
        return [
            {
                id: 1,
                latex: '\\int_{0}^{1} x^2 \\, dx',
                topic: 'Calculus',
                options: ['1/3', '1/2', '2/3', '1'],
                correctAnswer: 0
            },
            {
                id: 2,
                latex: '\\frac{d}{dx}(x^3 + 2x)',
                topic: 'Calculus',
                options: ['3x² + 2', 'x² + 2', '3x² + 2x', 'x³ + 2'],
                correctAnswer: 0
            },
            {
                id: 3,
                latex: '\\sum_{i=1}^{n} i',
                topic: 'Sequences and Series',
                options: ['n(n+1)/2', 'n²', 'n(n-1)/2', '2n'],
                correctAnswer: 0
            }
        ];
    };

    const filteredQuestions = selectedTopic === 'all'
        ? questions
        : questions.filter(q => q.topic.toLowerCase() === selectedTopic.toLowerCase());

    return (
        <div className="paper-screen">
            {/* Header */}
            <header className="paper-header">
                <Link to="/learn" className="back-btn">
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <h1>Paper 1 - Algebra & Calculus</h1>
                <div className="header-icon">
                    <i className="fas fa-square-root-alt"></i>
                </div>
            </header>

            {/* Topic Filter */}
            <div className="topic-filter">
                <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="topic-select"
                >
                    {topics.map((topic) => (
                        <option key={topic} value={topic === 'All Topics' ? 'all' : topic}>
                            {topic}
                        </option>
                    ))}
                </select>
            </div>

            {/* Questions List */}
            <main className="questions-container">
                {loading ? (
                    <div className="loading">
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Loading questions...</p>
                    </div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="no-questions">
                        <i className="fas fa-inbox"></i>
                        <p>No questions available yet</p>
                        <p className="sub-text">Questions will appear here once they are published</p>
                    </div>
                ) : (
                    <div className="questions-grid">
                        {filteredQuestions.map((question, index) => (
                            <div key={question.id} className="question-card">
                                <div className="question-header">
                                    <span className="question-number">Question {index + 1}</span>
                                    <span className="question-topic">{question.topic}</span>
                                </div>

                                <div className="question-content">
                                    <div className="latex-display">
                                        <Latex>{`$$${question.latex}$$`}</Latex>
                                    </div>
                                </div>

                                <div className="question-options">
                                    {question.options.map((option, optIndex) => (
                                        <button
                                            key={optIndex}
                                            className="option-btn"
                                        >
                                            <span className="option-label">
                                                {String.fromCharCode(65 + optIndex)}
                                            </span>
                                            <span className="option-text">{option}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Bottom Stats */}
            <div className="bottom-stats">
                <div className="stat-item">
                    <i className="fas fa-list"></i>
                    <span>{filteredQuestions.length} Questions</span>
                </div>
                <div className="stat-item">
                    <i className="fas fa-book"></i>
                    <span>{selectedTopic === 'all' ? 'All Topics' : selectedTopic}</span>
                </div>
            </div>
        </div>
    );
};

export default Paper1;
