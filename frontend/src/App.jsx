import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  // Fetch report data from backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/report")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Feedback logic based on score ranges
  const getFeedback = (score) => {
    if (score >= 8) {
      return {
        level: "Excellent",
        description: "Excellent performance with strong control and natural delivery. Demonstrates sophisticated language use.",
        color: "text-green-600",
        bgColor: "bg-green-50"
      };
    } else if (score >= 6) {
      return {
        level: "Good",
        description: "Good performance with minor inaccuracies. Generally effective communication with occasional errors.",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      };
    } else if (score >= 4) {
      return {
        level: "Fair",
        description: "Fair performance with noticeable limitations. Can communicate basic ideas but with frequent errors.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
      };
    } else {
      return {
        level: "Needs Improvement",
        description: "Needs improvement in fundamental skills. Requires significant practice to develop proficiency.",
        color: "text-red-600",
        bgColor: "bg-red-50"
      };
    }
  };

  // Skill-specific feedback
  const getSkillFeedback = (skillName, score) => {
    const feedbacks = {
      pronunciation: {
        high: "Clear and accurate pronunciation with minimal errors. Native-like intonation and stress patterns.",
        medium: "Generally clear pronunciation with some errors. Occasional issues with specific sounds or stress.",
        low: "Pronunciation frequently interferes with understanding. Needs focused practice on sound production."
      },
      fluency: {
        high: "Speaks smoothly with natural rhythm. Minimal hesitation and effective use of discourse markers.",
        medium: "Maintains flow with occasional hesitations. Some pauses but generally coherent speech.",
        low: "Frequent pauses and hesitations disrupt communication. Limited ability to maintain extended speech."
      },
      vocabulary: {
        high: "Sophisticated vocabulary with precise word choice. Effective use of idiomatic expressions.",
        medium: "Adequate vocabulary for most topics. Some imprecise usage but meaning is clear.",
        low: "Limited vocabulary range restricts expression. Frequent word-finding difficulties."
      },
      grammar: {
        high: "Consistently accurate grammar structures. Wide range of complex sentences used effectively.",
        medium: "Generally accurate with good control of common structures. Some errors in complex grammar.",
        low: "Basic grammar errors are frequent. Limited range of sentence structures."
      }
    };

    const level = score >= 7.5 ? 'high' : score >= 5.5 ? 'medium' : 'low';
    return feedbacks[skillName][level];
  };

  // Score color coding
  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-blue-600";
    if (score >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  // Progress bar color
  const getBarColor = (score) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-blue-500";
    if (score >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessment report...</p>
        </div>
      </div>
    );
  }

  const overallFeedback = getFeedback(data.overallScore);

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Speaking Assessment Report</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Student: {data.studentName}</p>
              <p className="text-xs sm:text-sm text-gray-500">Assessment Date: {data.assessmentDate}</p>
            </div>
            <div className="text-right">
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-2" />
            </div>
          </div>
        </div>

        {/* Summary of Scores */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
            Summary of Scores
          </h2>

          {/* Overall Score */}
          <div className={`${overallFeedback.bgColor} mb-6 sm:mb-8 text-center py-4 sm:py-6 rounded-lg`}>
            <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide mb-2">Overall Score</p>
            <div className={`text-4xl sm:text-5xl md:text-6xl font-bold ${getScoreColor(data.overallScore)}`}>
              {data.overallScore.toFixed(1)}
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">out of 9.0</p>
          </div>

          {/* Skill Scores with Progress Bars */}
          <div className="space-y-4 sm:space-y-6">
            {Object.entries(data.skills).map(([skill, score]) => (
              <div key={skill}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm sm:text-base text-gray-700 font-medium capitalize">{skill}</span>
                  <span className={`text-base sm:text-lg font-bold ${getScoreColor(score)}`}>
                    {score.toFixed(1)} / 9
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                  <div
                    className={`h-2.5 sm:h-3 rounded-full ${getBarColor(score)} transition-all duration-500`}
                    style={{ width: `${(score / 9) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Descriptive Feedback */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Descriptive Feedback</h2>

          {/* Overall Feedback */}
          <div className={`${overallFeedback.bgColor} border-l-4 ${overallFeedback.color.replace('text', 'border')} p-3 sm:p-4 mb-4 sm:mb-6 rounded`}>
            <h3 className={`font-bold text-base sm:text-lg ${overallFeedback.color} mb-2`}>
              Overall Performance: {overallFeedback.level}
            </h3>
            <p className="text-sm sm:text-base text-gray-700">{overallFeedback.description}</p>
          </div>

          {/* Skill-specific Feedback */}
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(data.skills).map(([skill, score]) => {
              const feedback = getFeedback(score);
              return (
                <div key={skill} className="border-l-4 border-gray-300 pl-3 sm:pl-4 py-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 capitalize">{skill}</h4>
                    <span className={`font-bold text-sm sm:text-base ${getScoreColor(score)}`}>
                      {`(${score.toFixed(1)})`}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{getSkillFeedback(skill, score)}</p>
                </div>
              );
            })}
          </div>

          {/* Recommendations */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-sm sm:text-base text-gray-800 mb-2">Recommendations for Improvement</h3>
            <ul className="text-gray-700 text-xs sm:text-sm space-y-1 list-disc list-inside leading-relaxed">
              {data.skills.pronunciation < 7 && (
                <li>Practice pronunciation with native speaker audio resources</li>
              )}
              {data.skills.fluency < 7 && (
                <li>Engage in regular conversation practice to improve speaking flow</li>
              )}
              {data.skills.vocabulary < 7 && (
                <li>Expand vocabulary through reading and targeted word learning</li>
              )}
              {data.skills.grammar < 7 && (
                <li>Review and practice complex grammar structures</li>
              )}
              {data.overallScore >= 7 && (
                <li>Continue practicing to maintain and enhance your strong performance</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;