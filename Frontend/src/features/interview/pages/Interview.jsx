import React, { useState, useEffect } from 'react';
import '../style/interview.scss';
import { useInterview } from '../hooks/useInterview';
import { useParams } from 'react-router';

const Interview = () => {
    const [activeTab, setActiveTab] = useState('technical');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { report, loading, getReportById } = useInterview();
    const { interviewId } = useParams();

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    if (loading) {
        return <div className="loading-screen"><h1>Loading your interview plan...</h1></div>;
    }

    if (!report) {
        return <div className="error-screen"><h1>Interview report not found</h1></div>;
    }

    const currentQuestions = activeTab === 'technical'
        ? report.technicalQuestions
        : report.behavioralQuestions;

    const currentQuestion = currentQuestions[currentQuestionIndex] || {};

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return '#ff4f8b';
            case 'medium': return '#fbbf24';
            case 'low': return '#10b981';
            default: return '#cbd5f0';
        }
    };

    return (
        <div className="interview-report-page">
            <div className="interview-report-wrapper">
                {/* Left Sidebar */}
                <aside className="interview-sidebar-left">
                    <nav className="interview-nav">
                        <div className="nav-section">
                            <h3 className="nav-section-title">Technical questions</h3>
                            <button
                                className={`nav-item ${activeTab === 'technical' ? 'nav-item--active' : ''}`}
                                onClick={() => {
                                    setActiveTab('technical');
                                    setCurrentQuestionIndex(0);
                                }}
                            >
                                <span className="nav-item-count">{report.technicalQuestions.length}</span>
                                Questions
                            </button>
                        </div>

                        <div className="nav-section">
                            <h3 className="nav-section-title">Behavioral questions</h3>
                            <button
                                className={`nav-item ${activeTab === 'behavioral' ? 'nav-item--active' : ''}`}
                                onClick={() => {
                                    setActiveTab('behavioral');
                                    setCurrentQuestionIndex(0);
                                }}
                            >
                                <span className="nav-item-count">{report.behavioralQuestions.length}</span>
                                Questions
                            </button>
                        </div>

                        <div className="nav-section">
                            <h3 className="nav-section-title">Road Map</h3>
                            <div className="roadmap-list">
                                {report.preparationPlan.map((item) => (
                                    <div key={item.day} className="roadmap-item">
                                        <span className="roadmap-day">Day {item.day}</span>
                                        <span className="roadmap-focus">{item.focus}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="interview-main-content">
                    {/* Score Cards */}
                    <div className="score-section">
                        <div className="score-card">
                            <div className="score-label">Technical Score</div>
                            <div className="score-value">{report.matchScore.technical}%</div>
                            <div className="score-bar">
                                <div
                                    className="score-bar-fill score-bar-technical"
                                    style={{ width: `${report.matchScore.technical}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="score-card">
                            <div className="score-label">Behavioral Score</div>
                            <div className="score-value">{report.matchScore.behavioral}%</div>
                            <div className="score-bar">
                                <div
                                    className="score-bar-fill score-bar-behavioral"
                                    style={{ width: `${report.matchScore.behavioral}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="question-card">
                        <div className="question-header">
                            <div className="question-meta">
                                <span className="question-type">{activeTab === 'technical' ? 'Technical' : 'Behavioral'} Question</span>
                                <span className="question-number">{currentQuestionIndex + 1} / {currentQuestions.length}</span>
                            </div>
                        </div>

                        <div className="question-section">
                            <h3 className="section-title">Question</h3>
                            <p className="question-text">{currentQuestion.question}</p>
                        </div>

                        <div className="question-section">
                            <h3 className="section-title">Intention</h3>
                            <p className="intention-text">{currentQuestion.intention}</p>
                        </div>

                        <div className="question-section">
                            <h3 className="section-title">Answer</h3>
                            <p className="answer-text">{currentQuestion.answer}</p>
                        </div>

                        {/* Navigation */}
                        <div className="question-navigation">
                            <button
                                className="nav-button"
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            >
                                ← Previous
                            </button>
                            <button
                                className="nav-button"
                                disabled={currentQuestionIndex === currentQuestions.length - 1}
                                onClick={() => setCurrentQuestionIndex(Math.min(currentQuestions.length - 1, currentQuestionIndex + 1))}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Skill Gaps */}
                <aside className="interview-sidebar-right">
                    <div className="skills-panel">
                        <h3 className="skills-title">Skill Gaps</h3>
                        <div className="skills-grid">
                            {report.skillGaps.map((item, idx) => (
                                <span
                                    key={idx}
                                    className="skill-badge"
                                    style={{
                                        borderColor: getSeverityColor(item.severity),
                                        color: getSeverityColor(item.severity)
                                    }}
                                >
                                    {item.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Interview;