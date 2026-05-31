const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');


const interviewRouter = express.Router();


/**
 * @route POST /api/interview/
 * @description Generate an interview report for a candidate based on their resume, self-description, and the job description
 * @access Private (Requires authentication)
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get the interview report by interviewId
 * @access Private */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController);

/**
 * @route GET /api/interview/
 * @description Get all interview reports of logged in user
 * @access Private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);

module.exports = interviewRouter;