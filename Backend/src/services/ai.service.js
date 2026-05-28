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
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an expert interview coach.

Return ONLY valid JSON.

Match score must be split into:
- technical (0-100)
- behavioral (0-100)

Generate:
- technicalQuestions
- behavioralQuestions
- skillGaps
- preparationPlan

Resume:
${resume}

Job Description:
${jobDescription}

Self Description:
${selfDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    });

    const text = response.text();
    return JSON.parse(text);
}

module.exports = generateInterviewReport;