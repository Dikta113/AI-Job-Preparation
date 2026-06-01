const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.object({
    technical: z.number().min(0).max(100),
    behavioral: z.number().min(0).max(100),
  }),

  technicalQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
  })),

  behavioralQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
  })),

  skillGaps: z.array(z.object({
    skill: z.string(),
    severity: z.enum(["low", "medium", "high"]),
  })),

  preparationPlan: z.array(z.object({
    day: z.number(),
    focus: z.string(),
    tasks: z.array(z.string()),
  })),
  title: z.string().describe("The title of the job for which the interview report is generated")
});

async function generateInterviewReport({ resumeText, selfDescription, jobDescription }) {

  const prompt = `
You are an expert interview coach.

Analyze the resume and job description.

Return ONLY valid JSON.

Example format:

{
  "matchScore": {
    "technical": 85,
    "behavioral": 90
  },
  "technicalQuestions": [
    {
      "question": "Explain WebSockets.",
      "intention": "Check realtime communication knowledge",
      "answer": "WebSockets provide..."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a challenge.",
      "intention": "Assess problem solving",
      "answer": "In my project..."
    }
  ],
  "skillGaps": [
    {
      "skill": "AWS",
      "severity": "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Backend Development",
      "tasks": [
        "Study Node.js",
        "Practice Express"
      ]
    }
  ]
}

Resume:
${resumeText}

Job Description:
${jobDescription}

Self Description:
${selfDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  const rawText = response.text || (response?.candidates?.[0]?.content?.parts || [])
    .map((part) => (typeof part.text === 'string' ? part.text : ''))
    .join('');

  if (!rawText || !rawText.trim()) {
    throw new Error('AI response contained no text output.');
  }

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    const match = rawText.match(/\{[\s\S]*\}$/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      console.error('Failed to parse AI JSON output:', rawText);
      throw new Error('AI response was not valid JSON.');
    }
  }

  return parsed;
}

module.exports = generateInterviewReport;