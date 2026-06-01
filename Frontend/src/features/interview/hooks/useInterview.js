import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api.jsx"
import { useContext } from "react"
import { InterviewContext } from "../interview.context.jsx"


export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context


    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            const interviewReport = response?.interviewReport ?? null
            setReport(interviewReport)
            return interviewReport
        } catch (error) {
            console.error("Error generating report:", error)
            setReport(null)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null;
        try {
            response = await getInterviewReportById(interviewId)
            const interviewReport = response?.interviewReport ?? null
            setReport(interviewReport)
            return interviewReport
        } catch (error) {
            console.error("Error fetching report by ID:", error)
            setReport(null)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        let response = null;
        try {
            response = await getAllInterviewReports()
            const interviewReports = response?.interviewReports ?? []
            setReports(interviewReports)
            return interviewReports
        } catch (error) {
            console.error("Error fetching reports:", error)
            return []
        } finally {
            setLoading(false)
        }
    }

    return { loading, report, reports, generateReport, getReportById, getReports }
}