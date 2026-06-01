const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const generateInterviewReport = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

/**
 * @description Controller to generate an interview report based on user self description, resume and job description
 */

async function extractResumeText(file) {
    if (!file) {
        return '';
    }

    const extension = file.originalname.split('.').pop().toLowerCase();

    if (extension === 'pdf' || file.mimetype === 'application/pdf') {
        const parsed = await pdfParse(file.buffer);
        return parsed.text || '';
    }

    if (extension === 'docx' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const { value } = await mammoth.extractRawText({ buffer: file.buffer });
        return value || '';
    }

    throw new Error('Unsupported resume format. Please upload a PDF or DOCX file.');
}

async function generateInterviewReportController(req, res) {
    try {
        const resumeText = await extractResumeText(req.file);
        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resumeText,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resumeText,
            selfDescription,
            jobDescription,
            title: interviewReportByAi?.title || `Interview plan for ${jobDescription?.slice(0, 60) || 'your role'}`,
            ...interviewReportByAi
        });

        res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport
        });
    } catch (error) {
        console.error('Interview report generation failed:', error);
        res.status(503).json({
            message: 'Unable to generate interview report at this time. Please try again later.',
            error: error.message || 'Service unavailable'
        });
    }
}

/**
 * 
 *@description Controller to get the interview report by interviewId
 */

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
}

/**
 * @description Controller to get all interview reports of logged in user
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resumeText -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");;
    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    })
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }