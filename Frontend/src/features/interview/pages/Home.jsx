import React, { useState, useRef, useEffect } from "react";
import InterviewHomeUI from "../components/InterviewHomeUI";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview();

  useEffect(() => {
    // fetch recent reports when the page mounts
    const fetch = async () => {
      try {
        await getReports();
      } catch (err) {
        // ignore
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFileName, setResumeFileName] = useState("No resume selected");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSelfDescriptionChange = (e) => {
    setSelfDescription(e.target.value);
  };

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleGenerateReport = async () => {
    const data = await generateReport({ jobDescription, selfDescription, resumeFile: resumeInputRef.current?.files[0] });
    if (!data) {
      console.error('Failed to generate interview report.');
      return;
    }
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className='loading-screen'>
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }

  return (
    <InterviewHomeUI
      jobDescription={jobDescription}
      selfDescription={selfDescription}
      resumeFileName={resumeFileName}
      resumeInputRef={resumeInputRef}
      reports={reports}
      onJobDescriptionChange={handleJobDescriptionChange}
      onSelfDescriptionChange={handleSelfDescriptionChange}
      onResumeChange={handleResumeChange}
      onGenerate={handleGenerateReport}
    />
  );
};

export default Home;