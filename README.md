# Student Speaking Assessment Report

## Overview
This project displays a student's speaking assessment report using a React + Vite frontend and a simple Node.js backend API. The report includes overall score, skill-wise scores, progress bars, dynamic feedback, and recommendations.

## How to Run

1. Start the Backend (API Server)

From the `student-report` folder:
```
cd backend
npm install
node server.js
```

Backend will start at:
`http://localhost:5000`


API Endpoint:
`http://localhost:5000/api/report`


2. Start the Frontend (React + Vite)

Open a second terminal with `student-report` folder:
```
cd frontend
npm install
npm run dev
```

Frontend will start at:
`http://localhost:5173`

**Make sure the backend is running so the frontend can fetch score data.**


## Where the Scores Are Stored
The scores are stored in a JSON file inside the backend folder:
`backend/data.json`

Current structure:
```
{
    "studentName": "Nerissa Smith",
    "assessmentDate": "2024-12-20",
    "overallScore": 6.5,
    "skills": {
        "pronunciation": 3.5,
        "fluency": 6.5,
        "vocabulary": 5.0,
        "grammar": 7.0
    }
}
```

The file can be edited to update the displayed report.



## How the Feedback Logic Works
The frontend contains simple condition-based logic to generate descriptive feedback.

1. Overall Feedback
Based on the overallScore:
- ≥ 8 → Excellent (Green)
- 6 – 7.9 → Good (Blue)
- 4 – 5.9 → Fair (Yellow)
- < 4 → Needs Improvement (Red)

Each level has its own color and detailed description.

2. Skill-Specific Feedback
Each skill score (pronunciation, fluency, vocabulary, grammar) is classified as:
- High (≥ 7.5)
- Medium (≥ 5.5)
- Low (< 5.5)

And feedback is selected accordingly from a predefined set of messages.
