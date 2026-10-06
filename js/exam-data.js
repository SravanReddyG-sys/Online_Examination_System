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
 *
 * Developer A:
 * Examination availability is determined only by
 * the configured start and end time.
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

        startTime: "2026-10-03T09:00:00",

        endDate: "Oct 10, 2026",

        endTime: "2026-10-10T18:00:00",

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

        startTime: "2026-10-08T10:00:00",

        endDate: "Oct 08, 2026",

        endTime: "2026-10-08T10:40:00",

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

        startTime: "2026-10-06T09:00:00",

        endDate: "Oct 10, 2026",

        endTime: "2026-10-10T18:00:00",

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

        startTime: "2026-10-12T11:00:00",

        endDate: "Oct 12, 2026",

        endTime: "2026-10-12T11:45:00",

        dashboardVisible: false
    },


    {
        id: "EXAM-005",

        title: "Discrete Mathematics",

        type: "Unit 3 Assessment",

        subjectCode: "MA201",

        questions: 25,

        duration: 40,

        status: "scheduled",

        startDate: "Oct 15, 2026",

        startTime: "2026-10-15T14:00:00",

        endDate: "Oct 15, 2026",

        endTime: "2026-10-15T14:40:00",

        dashboardVisible: false
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