import React from "react";
import "../style/home.scss";

const InterviewHomeUI = ({
  jobDescription = "",
  selfDescription = "",
  resumeFileName = "No resume selected",
  onJobDescriptionChange = () => {},
  onSelfDescriptionChange = () => {},
  onResumeChange = () => {},
  onGenerate = () => {},
}) => {
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

            <button className="button primary-button generate-button" onClick={onGenerate}>
              Generate My Interview Strategy
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default InterviewHomeUI;
