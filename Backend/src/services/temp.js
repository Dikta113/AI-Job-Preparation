 const resume = `
  personalInfo: {
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 9876543210",
    location: "Kolkata, India",
    linkedin: "https://linkedin.com/in/rahulsharma",
    github: "https://github.com/rahulsharma",
  },

  summary:
    "Full Stack Developer with strong knowledge of React.js, Node.js, Express.js, and MongoDB. Passionate about building scalable web applications and solving real-world problems using modern JavaScript technologies.",

  skills: [
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Git",
    "REST API",
    "JWT Authentication",
  ],

  education: [
    {
      degree: "B.Tech in Computer Science",
      college: "Techno India University",
      year: "2026",
      cgpa: "8.4",
    },
  ],

  experience: [
    {
      role: "Frontend Developer Intern",
      company: "CodeCraft Solutions",
      duration: "Jan 2025 - Apr 2025",
      responsibilities: [
        "Developed responsive UI using React.js and Tailwind CSS",
        "Integrated REST APIs with frontend components",
        "Improved website performance and loading speed",
      ],
    },
  ],

  projects: [
    {
      title: "AI Interview Platform",
      description:
        "Built an AI-powered interview preparation platform with authentication, mock interviews, resume analysis, and feedback generation.",
      techStack: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Express.js",
      ],
    },
    {
      title: "Resume Analyzer",
      description:
        "Created a resume analyzer that compares resumes with job descriptions and provides ATS scores.",
      techStack: ["React.js", "Gemini API", "Node.js"],
    },
  ],

  certifications: [
    "Full Stack Web Development - Udemy",
    "JavaScript Algorithms and Data Structures - freeCodeCamp",
  ],
`;

const selfDescription = `
Hello, my name is Rahul Sharma. 
I am a Full Stack Web Developer with experience in JavaScript, React.js, Node.js, and MongoDB.

I enjoy building modern web applications and solving practical problems using technology. 
Recently, I worked on projects like an AI Interview Platform and a Resume Analyzer, where I implemented authentication systems, API integrations, and responsive user interfaces.

I am a quick learner, a good team player, and always eager to improve my technical skills. 
My goal is to work in a challenging environment where I can contribute to impactful projects while continuously learning new technologies.
`;

const jobDescription = `
Job Role: Full Stack Developer

Responsibilities:
- Develop and maintain scalable web applications.
- Build responsive frontend interfaces using React.js.
- Create backend APIs using Node.js and Express.js.
- Work with MongoDB databases.
- Collaborate with UI/UX designers and backend developers.
- Optimize applications for speed and performance.
- Implement authentication and authorization systems.

Required Skills:
- Strong knowledge of JavaScript.
- Experience with React.js and Node.js.
- Understanding of REST APIs and MongoDB.
- Familiarity with Git and version control.
- Good problem-solving and communication skills.

Preferred:
- Experience with AI-based applications.
- Knowledge of Tailwind CSS and cloud deployment.
`;

module.exports = { resume,
 selfDescription,
 jobDescription,
};