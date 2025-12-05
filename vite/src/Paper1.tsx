import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import './Paper.css';
import './PaperContentBlocks.css';

interface ContentBlock {
    id: string;
    type: 'latex' | 'image' | 'text';
    content: string;
}

interface Question {
    _id: string;
    topic: string;
    paper: number;
    questionBlocks: ContentBlock[];
    answerBlocks: ContentBlock[];
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
        fetchQuestions();
    }, [selectedTopic]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const topicParam = selectedTopic !== 'all' ? `?topic=${encodeURIComponent(selectedTopic)}` : '';
            const response = await fetch(`/api/questions/paper/1${topicParam}`);

            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                console.error('Failed to fetch questions');
                setQuestions([]);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const renderContentBlock = (block: ContentBlock) => {
        switch (block.type) {
            case 'latex':
                return <Latex key={block.id}>{`$$${block.content}$$`}</Latex>;
            case 'image':
                return <img key={block.id} src={block.content} alt="Question content" className="question-image" />;
            case 'text':
                return <p key={block.id} className="question-text">{block.content}</p>;
            default:
                return null;
        }
    };

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
                ) : questions.length === 0 ? (
                    <div className="no-questions">
                        <i className="fas fa-inbox"></i>
                        <p>No questions available yet</p>
                        <p className="sub-text">Questions will appear here once they are published from the Admin Dashboard</p>
                    </div>
                ) : (
                    <div className="questions-grid">
                        {questions.map((question, index) => (
                            <div key={question._id} className="question-card">
                                <div className="question-header">
                                    <span className="question-number">Question {index + 1}</span>
                                    <span className="question-topic">{question.topic}</span>
                                </div>

                                <div className="question-content">
                                    {question.questionBlocks.map(block => (
                                        <div key={block.id} className="content-block-display">
                                            {renderContentBlock(block)}
                                        </div>
                                    ))}
                                </div>

                                {question.answerBlocks.length > 0 && (
                                    <details className="answer-section">
                                        <summary>View Answer</summary>
                                        <div className="answer-content">
                                            {question.answerBlocks.map(block => (
                                                <div key={block.id} className="content-block-display">
                                                    {renderContentBlock(block)}
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Bottom Stats */}
            <div className="bottom-stats">
                <div className="stat-item">
                    <i className="fas fa-list"></i>
                    <span>{questions.length} Questions</span>
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
