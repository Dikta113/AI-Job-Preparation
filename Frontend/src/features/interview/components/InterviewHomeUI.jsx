import React, { useRef } from "react";
import { useNavigate } from "react-router";
import "../style/home.scss";

const InterviewHomeUI = ({
  jobDescription = "",
  selfDescription = "",
  resumeFileName = "No resume selected",
  onJobDescriptionChange = () => { },
  onSelfDescriptionChange = () => { },
  onResumeChange = () => { },
  onGenerate = () => { },
  resumeInputRef = null,
  reports = [],
}) => {
  const navigate = useNavigate();
  return (
    <main className="interview-page">
      <div className="interview-page__wrapper">
        <header className="interview-page__header">
          <h1>
            Create Your Custom <span>Interview Plan</span>
          </h1>
          <p>
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </header>

        <section className="interview-grid">
          <div className="input-card job-panel">
            <div className="panel-head">
              <div>
                <h2>Target Job Description</h2>
                <p className="panel-subtitle">
                  Paste the full job description here.
                </p>
              </div>
              <span className="badge">Required</span>
            </div>

            <textarea
              id="jobDescription"
              name="jobDescription"
              value={jobDescription}
              onChange={onJobDescriptionChange}
              placeholder="e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              aria-label="Job description"
            />
            <div className="field-footer">
              <span>0 / 5000 chars</span>
            </div>
          </div>

          <aside className="profile-panel">
            <div className="input-card upload-card">
              <div className="panel-head">
                <div>
                  <h2>Your Profile</h2>
                  <p className="panel-subtitle">Upload resume to enhance results.</p>
                </div>
                <span className="badge badge-secondary">Best results</span>
              </div>

              <label htmlFor="resume" className="file-label">
                <div className="file-label__icon">⬆</div>
                <div className="file-label__text">
                  Click to upload or drag & drop
                </div>
                <div className="file-label__detail">PDF or DOCX (Max 5MB)</div>
                <div className="file-label__name">{resumeFileName}</div>
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                  onChange={onResumeChange}
                />
              </label>
            </div>

            <div className="input-card self-panel">
              <div className="panel-head panel-head--compact">
                <div>
                  <h3>Quick Self-Description</h3>
                  <p className="panel-subtitle">
                    Briefly describe your experience, skills, and goals.
                  </p>
                </div>
              </div>
              <textarea
                id="selfDescription"
                name="selfDescription"
                value={selfDescription}
                onChange={onSelfDescriptionChange}
                placeholder="Describe your experience, key skills, and years of expertise if you don't have a resume handy..."
                aria-label="Self description"
              />
              <div className="hint-card">
                Either a Resume or a Self Description is required to generate a personalized plan.
              </div>
            </div>

            <button
              onClick={onGenerate}
              className="button primary-button generate-button">
              Generate My Interview Strategy
            </button>
          </aside>
        
          <aside className="recent-column">
            <div className="input-card recent-reports">
              <div className="panel-head">
                <div>
                  <h3>My Recent Interview Plans</h3>
                </div>
              </div>
              <ul className="reports-list">
                {reports && reports.length > 0 ? (
                  reports.slice(0, 6).map((r) => (
                    <li key={r._id} className="report-item" onClick={() => navigate(`/interview/${r._id}`)}>
                      <div className="report-content">
                        <div className="report-title">{r.title || 'Interview Report'}</div>
                        <div className="report-date">{r.createdAt ? `Generated on ${new Date(r.createdAt).toLocaleDateString()}` : ''}</div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="empty">No recent reports</li>
                )}
              </ul>
            </div>

            {/* footer removed as requested */}
          </aside>
        </section>

        <div className="recent-row">
          <h3 className="recent-row__title">My Recent Interview Plans</h3>
          <div className="recent-cards">
            {reports && reports.length > 0 ? (
              reports.slice(0, 6).map((r) => {
                const tech = r.matchScore?.technical ?? 0
                const beh = r.matchScore?.behavioral ?? 0
                const match = Math.round((tech + beh) / 2)
                return (
                  <div key={r._id} className="recent-card input-card" onClick={() => navigate(`/interview/${r._id}`)}>
                    <div className="recent-card__title">{r.title || 'Interview Report'}</div>
                    <div className="recent-card__meta">{r.createdAt ? `Generated on ${new Date(r.createdAt).toLocaleDateString()}` : ''}</div>
                    <div className="recent-card__score">Match Score: <span className="score-value">{match}%</span></div>
                  </div>
                )
              })
            ) : (
              <div className="no-reports">No recent reports</div>
            )}
          </div>

          <footer className="site-footer">
            <div className="footer-center">
              <nav className="footer-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/help">Help Center</a>
              </nav>
            </div>
          </footer>
        </div>

      </div>
    </main>
  );
};

export default InterviewHomeUI;
