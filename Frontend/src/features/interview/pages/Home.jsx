import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50">
                <h1 className="text-xl font-semibold text-slate-700">
                    Generating your interview plan...
                </h1>
            </main>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 px-6 py-10">

            {/* Header */}
            <header className="text-center max-w-3xl mx-auto mb-10">
                <h1 className="text-4xl font-bold text-slate-800">
                    Create Your Custom <span className="text-indigo-600">Interview Plan</span>
                </h1>
                <p className="text-slate-600 mt-3">
                    Let AI analyze the job requirements and your profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Left Panel */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-slate-700">
                                Target Job Description
                            </h2>
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                Required
                            </span>
                        </div>

                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full h-64 border border-slate-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />

                        <div className="text-xs text-slate-500 mt-2 text-right">
                            {jobDescription.length} / 5000 characters
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-6">

                        {/* Resume Upload */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Upload Resume
                                <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                    Best Results
                                </span>
                            </label>

                            <label
                                htmlFor="resume"
                                className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition"
                            >
                                <p className="text-slate-600 font-medium">
                                    Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-slate-500">
                                    PDF or DOCX (Max 5MB)
                                </p>

                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.docx"
                                />
                            </label>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-slate-300"></div>
                            <span className="text-xs text-slate-500">OR</span>
                            <div className="flex-1 h-px bg-slate-300"></div>
                        </div>

                        {/* Self Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Quick Self-Description
                            </label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className="w-full h-32 border border-slate-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                placeholder="Briefly describe your skills and experience..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg text-sm">
                            Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required.
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-6">
                    <span className="text-sm text-slate-500">
                        AI-Powered Strategy Generation • Approx 30s
                    </span>

                    <button
                        onClick={handleGenerateReport}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                    >
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            {reports.length > 0 && (
                <section className="max-w-6xl mx-auto mt-12">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                        My Recent Interview Plans
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {reports.map(report => (
                            <div
                                key={report._id}
                                onClick={() => navigate(`/interview/${report._id}`)}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition"
                            >
                                <h3 className="text-lg font-semibold text-slate-800">
                                    {report.title || "Untitled Position"}
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Generated on {new Date(report.createdAt).toLocaleDateString()}
                                </p>

                                <p className={`mt-3 font-semibold ${
                                    report.matchScore >= 80
                                        ? "text-green-600"
                                        : report.matchScore >= 60
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                }`}>
                                    Match Score: {report.matchScore}%
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="text-center mt-16 text-sm text-slate-500 space-x-6">
                <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600">Terms of Service</a>
                <a href="#" className="hover:text-indigo-600">Help Center</a>
            </footer>

        </div>
    )
}

export default Home