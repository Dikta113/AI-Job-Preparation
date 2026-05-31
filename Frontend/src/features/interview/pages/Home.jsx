import React, { useState, useRef } from "react";
import InterviewHomeUI from "../components/InterviewHomeUI";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport } = useInterview();
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
    navigate(`/interview/${data._id}`);
  };

  if(loading) {
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
      onJobDescriptionChange={handleJobDescriptionChange}
      onSelfDescriptionChange={handleSelfDescriptionChange}
      onResumeChange={handleResumeChange}
      onGenerate={handleGenerateReport}
    />
  );
};

export default Home;