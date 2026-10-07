/* =========================================================
   PROEXAM — MOCK EXAM DATA
   Temporary frontend data for Student Dashboard
   ========================================================= */


/*
 * These exams represent examinations that would
 * eventually be configured and published by an Examiner.
 *
 * For now, the data is duplicated locally so that
 * we can build and test the Student Dashboard without
 * implementing the Examiner module.
 */

const MOCK_EXAMS = [

    {
        id: "EXAM-001",

        title: "Data Structures & Algorithms",

        type: "Practice Assessment",

        subjectCode: "CS201",

        questions: 30,

        duration: 45,

        status: "in-progress",

        progress: {
            currentQuestion: 12,
            totalQuestions: 30,
            remainingTime: "32:18"
        },

        startDate: "Oct 03, 2026",

        endDate: "Oct 10, 2026",

        dashboardVisible: true
    },


    {
        id: "EXAM-002",

        title: "Database Fundamentals",

        type: "Unit 2 Assessment",

        subjectCode: "CS202",

        questions: 25,

        duration: 40,

        status: "scheduled",

        startDate: "Oct 08, 2026",

        startTime: "10:00 AM",

        endDate: "Oct 08, 2026",

        dashboardVisible: true
    },


    {
        id: "EXAM-003",

        title: "Computer Networks",

        type: "Practice Quiz",

        subjectCode: "CS203",

        questions: 20,

        duration: 30,

        status: "available",

        startDate: "Oct 06, 2026",

        endDate: "Oct 10, 2026",

        endTime: "6:00 PM",

        dashboardVisible: true
    },


    {
        id: "EXAM-004",

        title: "Object-Oriented Programming",

        type: "Practice Assessment",

        subjectCode: "CS204",

        questions: 30,

        duration: 45,

        status: "scheduled",

        startDate: "Oct 12, 2026",

        startTime: "11:00 AM",

        endDate: "Oct 12, 2026",

        dashboardVisible: true
    },


    {
        id: "EXAM-005",

        title: "Discrete Mathematics",

        type: "Unit 3 Assessment",

        subjectCode: "MA201",

        questions: 25,

        duration: 40,

        status: "available",

        startDate: "Oct 15, 2026",

        startTime: "2:00 PM",

        endDate: "Oct 15, 2026",

        dashboardVisible: true
    },

    {
        id: "EXAM-006",

        title: "System Design",

        type: "Digital Assignment",

        subjectCode: "CS207",

        questions: 30,

        duration: 60,

        status: "scheduled",

        startDate: "Oct 07, 2026",

        startTime: "2:00 PM",

        endDate: "Oct 15, 2026",

        dashboardVisible: true
    }
];


/* =========================================================
   MOCK RECENT ATTEMPTS
   ========================================================= */

const MOCK_ATTEMPTS = [

    {
        id: "ATTEMPT-001",

        examId: "EXAM-001",

        examination: "Data Structures & Algorithms · Midterm",

        completedDate: "Oct 03, 2026",

        score: 24,

        totalMarks: 30,

        percentage: 80,

        result: "Passed"
    },


    {
        id: "ATTEMPT-002",

        examId: "EXAM-006",

        examination: "Object-Oriented Programming",

        completedDate: "Sep 28, 2026",

        score: 27,

        totalMarks: 30,

        percentage: 90,

        result: "Passed"
    },

     {
        id: "ATTEMPT-007",

        examId: "EXAM-007",

        examination: "Python Programming",

        completedDate: "Oct 04, 2026",

        score: 23,

        totalMarks: 25,

        percentage: 92,

        result: "Passed"
    },


    {
        id: "ATTEMPT-003",

        examId: "EXAM-007",

        examination: "Discrete Mathematics",

        completedDate: "Sep 24, 2026",

        score: 21,

        totalMarks: 25,

        percentage: 84,

        result: "Passed"
    }
];


/* =========================================================
   MOCK STUDENT DASHBOARD STATISTICS
   ========================================================= */

/*
 * These values represent additional student history
 * that would eventually come from a backend/database.
 *
 * We use them temporarily because the dashboard currently
 * does not have a complete examination history system.
 */

const MOCK_STUDENT_STATS = {

    completedExams: 8,

    averageScore: 84

};