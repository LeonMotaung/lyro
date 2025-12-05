import { useState } from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import './AdminDashboard.css';
import apiClient from './api';

interface ContentBlock {
    id: string;
    type: 'latex' | 'image' | 'text';
    content: string;
}

interface Question {
    topic: string;
    paper: 1 | 2;
    questionBlocks: ContentBlock[];
    answerBlocks: ContentBlock[];
}

const AdminDashboard = () => {
    const [selectedPaper, setSelectedPaper] = useState<1 | 2>(1);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [questionBlocks, setQuestionBlocks] = useState<ContentBlock[]>([
        { id: '1', type: 'latex', content: '\\int_{a}^{b} x^2 \\, dx' }
    ]);
    const [answerBlocks, setAnswerBlocks] = useState<ContentBlock[]>([
        { id: 'a1', type: 'latex', content: '' }
    ]);

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

    const addBlock = (section: 'question' | 'answer', type: 'latex' | 'image' | 'text') => {
        const newBlock: ContentBlock = {
            id: Date.now().toString(),
            type,
            content: ''
        };

        if (section === 'question') {
            setQuestionBlocks([...questionBlocks, newBlock]);
        } else {
            setAnswerBlocks([...answerBlocks, newBlock]);
        }
    };

    const updateBlock = (section: 'question' | 'answer', id: string, content: string) => {
        if (section === 'question') {
            setQuestionBlocks(questionBlocks.map(block =>
                block.id === id ? { ...block, content } : block
            ));
        } else {
            setAnswerBlocks(answerBlocks.map(block =>
                block.id === id ? { ...block, content } : block
            ));
        }
    };

    const removeBlock = (section: 'question' | 'answer', id: string) => {
        if (section === 'question') {
            setQuestionBlocks(questionBlocks.filter(block => block.id !== id));
        } else {
            setAnswerBlocks(answerBlocks.filter(block => block.id !== id));
        }
    };

    const handleImageUpload = (section: 'question' | 'answer', id: string, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            updateBlock(section, id, reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handlePublish = async () => {
        const question: Question = {
            topic: selectedTopic,
            paper: selectedPaper,
            questionBlocks,
            answerBlocks
        };

        try {
            const response = await apiClient.post('/api/questions', question);

            if (response.ok) {
                const data = await response.json();
                alert('✅ Question published successfully!');
                console.log('Published question:', data);

                // Reset form
                setQuestionBlocks([{ id: Date.now().toString(), type: 'latex', content: '' }]);
                setAnswerBlocks([{ id: Date.now().toString(), type: 'latex', content: '' }]);
                setSelectedTopic('');
            } else {
                const error = await response.json();
                alert(`❌ Failed to publish: ${error.error}`);
            }
        } catch (error) {
            console.error('Error publishing question:', error);
            alert('❌ Error connecting to server. Make sure the backend is running.');
        }
    };

    const renderBlock = (block: ContentBlock, section: 'question' | 'answer') => {
        return (
            <div key={block.id} className="content-block">
                <div className="block-header">
                    <span className="block-type">
                        <i className={`fas fa-${block.type === 'latex' ? 'code' : block.type === 'image' ? 'image' : 'text'}`}></i>
                        {block.type.toUpperCase()}
                    </span>
                    <button
                        onClick={() => removeBlock(section, block.id)}
                        className="remove-block-btn"
                        title="Remove block"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {block.type === 'latex' && (
                    <div className="latex-block">
                        <textarea
                            value={block.content}
                            onChange={(e) => updateBlock(section, block.id, e.target.value)}
                            placeholder="Enter LaTeX code..."
                            className="latex-input"
                            spellCheck={false}
                        />
                        <div className="latex-preview">
                            {block.content ? (
                                <Latex>{`$$${block.content}$$`}</Latex>
                            ) : (
                                <span className="preview-placeholder">Preview...</span>
                            )}
                        </div>
                    </div>
                )}

                {block.type === 'image' && (
                    <div className="image-block">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(section, block.id, file);
                            }}
                            className="image-input"
                            id={`image-${block.id}`}
                        />
                        <label htmlFor={`image-${block.id}`} className="image-upload-label">
                            {block.content ? (
                                <img src={block.content} alt="Uploaded" className="uploaded-image" />
                            ) : (
                                <div className="upload-placeholder">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <span>Click to upload image</span>
                                </div>
                            )}
                        </label>
                    </div>
                )}

                {block.type === 'text' && (
                    <div className="text-block">
                        <textarea
                            value={block.content}
                            onChange={(e) => updateBlock(section, block.id, e.target.value)}
                            placeholder="Enter text content..."
                            className="text-input"
                        />
                    </div>
                )}
            </div>
        );
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

                    {/* Question Content Builder */}
                    <div className="content-builder">
                        <div className="builder-header">
                            <h3>Question Content</h3>
                            <div className="add-block-buttons">
                                <button
                                    onClick={() => addBlock('question', 'latex')}
                                    className="add-btn"
                                    title="Add LaTeX"
                                >
                                    <i className="fas fa-plus"></i>
                                    <i className="fas fa-code"></i>
                                </button>
                                <button
                                    onClick={() => addBlock('question', 'image')}
                                    className="add-btn"
                                    title="Add Image"
                                >
                                    <i className="fas fa-plus"></i>
                                    <i className="fas fa-image"></i>
                                </button>
                                <button
                                    onClick={() => addBlock('question', 'text')}
                                    className="add-btn"
                                    title="Add Text"
                                >
                                    <i className="fas fa-plus"></i>
                                    <i className="fas fa-text"></i>
                                </button>
                            </div>
                        </div>
                        <div className="blocks-container">
                            {questionBlocks.map(block => renderBlock(block, 'question'))}
                        </div>
                    </div>

                    {/* Answer Content Builder */}
                    <div className="content-builder">
                        <div className="builder-header">
                            <h3>Answer Content</h3>
                            <div className="add-block-buttons">
                                <button
                                    onClick={() => addBlock('answer', 'latex')}
                                    className="add-btn"
                                    title="Add LaTeX"
                                >
                                    <i className="fas fa-plus"></i>
                                    <i className="fas fa-code"></i>
                                </button>
                                <button
                                    onClick={() => addBlock('answer', 'image')}
                                    className="add-btn"
                                    title="Add Image"
                                >
                                    <i className="fas fa-plus"></i>
                                    <i className="fas fa-image"></i>
                                </button>
                                <button
                                    onClick={() => addBlock('answer', 'text')}
                                    className="add-btn"
                                    title="Add Text"
                                >
                                    <i className="fas fa-plus"></i>
                                    <i className="fas fa-text"></i>
                                </button>
                            </div>
                        </div>
                        <div className="blocks-container">
                            {answerBlocks.map(block => renderBlock(block, 'answer'))}
                        </div>
                    </div>

                    {/* Publish Button */}
                    <div className="publish-section">
                        <button
                            onClick={handlePublish}
                            className="publish-btn"
                            disabled={!selectedTopic || questionBlocks.every(b => !b.content)}
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
