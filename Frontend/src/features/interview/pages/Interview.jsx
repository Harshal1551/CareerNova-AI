import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

// ─────────────────────────────────────────────
// Question Card
// ─────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <div className="flex items-start gap-3">
          <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            Q{index + 1}
          </span>
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            {item.question}
          </p>
        </div>
        <span
          className={`transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {open && (
        <div className="px-6 pb-5 space-y-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-xs font-semibold text-blue-600">
              Intention
            </span>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {item.intention}
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold text-green-600">
              Model Answer
            </span>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// RoadMap Day Card
// ─────────────────────────────────────────────
const RoadMapDay = ({ day }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
        Day {day.day}
      </span>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
        {day.focus}
      </h3>
    </div>

    <ul className="space-y-2">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading your interview plan...
      </div>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "text-green-500"
      : report.matchScore >= 60
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT NAV */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 space-y-4">
          <h3 className="text-sm uppercase tracking-wider text-gray-500">
            Sections
          </h3>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                activeNav === item.id
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => getResumePdf(interviewId)}
            className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Download Resume
          </button>
        </div>

        {/* CENTER CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {activeNav === "technical" && (
            <>
              <Header title="Technical Questions" count={report.technicalQuestions.length} />
              <div className="space-y-4">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </>
          )}

          {activeNav === "behavioral" && (
            <>
              <Header title="Behavioral Questions" count={report.behavioralQuestions.length} />
              <div className="space-y-4">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </>
          )}

          {activeNav === "roadmap" && (
            <>
              <Header title="Preparation Road Map" count={`${report.preparationPlan.length} Days`} />
              <div className="space-y-4">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 space-y-6">

          {/* Match Score */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Match Score</p>
            <div className={`text-5xl font-bold ${scoreColor}`}>
              {report.matchScore}%
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Strong match for this role
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-500 mb-3">Skill Gaps</p>
            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title, count }) => (
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
      {title}
    </h2>
    <span className="text-sm bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
      {count}
    </span>
  </div>
);

export default Interview;