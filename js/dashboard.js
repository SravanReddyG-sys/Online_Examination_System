/* =========================================================
   PROEXAM — STUDENT DASHBOARD
   Dashboard rendering and student session integration
   ========================================================= */


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);


function initializeDashboard() {

    /*
     * Protect the dashboard.
     *
     * Only authenticated students can access this page.
     */
    const student = requireRole("student");

    if (!student) {
        return;
    }


    /*
     * Display authenticated student information.
     */
    displayStudentInformation(student);


    /*
     * Render dashboard statistics.
     */
    renderDashboardStatistics();


    /*
     * Render available exams.
     */
    renderAvailableExams();


    /*
     * Render recent attempts.
     */
    renderRecentAttempts();


    /*
     * Initialize logout.
     */
    initializeLogout();
}


/* =========================================================
   STUDENT INFORMATION
   ========================================================= */

function displayStudentInformation(student) {

    const welcomeMessage =
        document.getElementById("welcomeMessage");

    const studentName =
        document.getElementById("studentName");

    const studentMeta =
        document.getElementById("studentMeta");

    const userInitial =
        document.getElementById("userInitial");


    const fullName =
        student.fullName || "Student";


    const firstName =
        fullName
            .trim()
            .split(/\s+/)[0];


    /*
     * Welcome message
     */

    if (welcomeMessage) {

        welcomeMessage.textContent =
            `Welcome back, ${firstName} 👋`;
    }


    /*
     * Profile name
     */

    if (studentName) {

        studentName.textContent =
            fullName;
    }


    /*
     * Profile role
     */

    if (studentMeta) {

        studentMeta.textContent =
            "Student";
    }


    /*
     * Avatar
     */

    if (userInitial) {

        userInitial.textContent =
            firstName
                .charAt(0)
                .toUpperCase();
    }
}

function getUpcomingExams() {
    return MOCK_EXAMS.filter(
        exam => exam.status === "scheduled"
    );
}


/* =========================================================
   DASHBOARD STATISTICS
   ========================================================= */

function renderDashboardStatistics() {

    const availableExamCount =
        document.getElementById(
            "availableExamCount"
        );

    const completedExamCount =
        document.getElementById(
            "completedExamCount"
        );

    const averageScore =
        document.getElementById(
            "averageScore"
        );

    const upcomingExamCount =
        document.getElementById(
            "upcomingExamCount"
        );


    /*
     * Exams visible on the dashboard.
     */

    const dashboardExams =
        MOCK_EXAMS.filter(
            exam => exam.dashboardVisible
        );


    /*
     * Upcoming examinations.
     */

    const upcomingExams = getUpcomingExams();


    if (availableExamCount) {

        availableExamCount.textContent =
            String(dashboardExams.length)
                .padStart(2, "0");
    }


    if (completedExamCount) {

        completedExamCount.textContent =
            String(
                MOCK_STUDENT_STATS.completedExams
            ).padStart(2, "0");
    }


    if (averageScore) {

        averageScore.textContent =
            `${MOCK_STUDENT_STATS.averageScore}%`;
    }


    if (upcomingExamCount) {

        upcomingExamCount.textContent =
            String(upcomingExams.length)
                .padStart(2, "0");
    }
}


/* =========================================================
   AVAILABLE EXAMS
   ========================================================= */

function renderAvailableExams() {

    const examList =
        document.getElementById(
            "availableExamList"
        );


    if (!examList) {
        return;
    }


    const dashboardExams =
        MOCK_EXAMS.filter(
            exam => exam.dashboardVisible
        );


    /*
     * Empty state
     */

    if (dashboardExams.length === 0) {

        examList.innerHTML = `
            <div class="dashboard-empty-state">
                No examinations are currently available.
            </div>
        `;

        return;
    }


    /*
     * Render exam cards.
     */

    examList.innerHTML =
        dashboardExams
            .map(exam => createExamCard(exam))
            .join("");
}


/* =========================================================
   CREATE EXAM CARD
   ========================================================= */

function createExamCard(exam) {

    const statusLabel =
        getExamStatusLabel(exam.status);


    const statusClass =
        exam.status;


    const icon =
        getExamIcon(exam.status);


    const examDetails =
        getExamDetails(exam);


    const action =
        getExamAction(exam);


    return `
        <article class="exam-card">

            <div class="exam-card-top">

                <span class="exam-card-icon">
                    ${icon}
                </span>

                <span class="exam-status ${statusClass}">
                    ${statusLabel}
                </span>

            </div>


            <h3>
                ${escapeHTML(exam.title)}
            </h3>


            <p class="exam-card-subtitle">
                ${escapeHTML(exam.type)}
                ·
                ${escapeHTML(exam.subjectCode)}
            </p>


            <div class="exam-card-meta">

                <span>
                    ${exam.questions} questions
                </span>

                <span>
                    ${exam.duration} minutes
                </span>

            </div>


            ${examDetails}


            ${action}

        </article>
    `;
}


/* =========================================================
   EXAM STATUS LABEL
   ========================================================= */

function getExamStatusLabel(status) {

    const labels = {

        "available": "Available",

        "scheduled": "Scheduled",

        "in-progress": "In progress",

        "completed": "Completed"

    };


    return labels[status] || "Unknown";
}


/* =========================================================
   EXAM ICON
   ========================================================= */

function getExamIcon(status) {

    /*
     * Data Structures icon
     */

    if (status === "in-progress") {

        return `
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M6 6h12" />
                <path d="M6 12h8" />
                <path d="M6 18h10" />
                <path d="M18 10v8" />
                <path d="M15 15l3 3 3-3" />
            </svg>
        `;
    }


    /*
     * Scheduled / database icon
     */

    if (status === "scheduled") {

        return `
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <ellipse
                    cx="12"
                    cy="6"
                    rx="7"
                    ry="3"
                />
                <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
                <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
            </svg>
        `;
    }


    /*
     * Available / network icon
     */

    return `
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="5"
                r="2.5"
            />
            <circle
                cx="6"
                cy="18"
                r="2.5"
            />
            <circle
                cx="18"
                cy="18"
                r="2.5"
            />
            <path d="M12 7.5v5" />
            <path d="M12 12.5 6 15.5" />
            <path d="M12 12.5 18 15.5" />
        </svg>
    `;
}


/* =========================================================
   EXAM DETAILS
   ========================================================= */

function getExamDetails(exam) {

    if (exam.status === "in-progress") {

        return `
            <p class="exam-progress-text">
                Question ${exam.progress.currentQuestion}
                of ${exam.progress.totalQuestions}
                · ${exam.progress.remainingTime} remaining
            </p>
        `;
    }


    if (exam.status === "scheduled") {

        return `
            <p class="exam-card-time">
                Opens ${escapeHTML(exam.startDate)}
                · ${escapeHTML(exam.startTime)}
            </p>
        `;
    }


    if (exam.status === "available") {

        return `
            <p class="exam-card-time">
                Open until ${escapeHTML(exam.endDate)}
                · ${escapeHTML(exam.endTime)}
            </p>
        `;
    }


    return "";
}


/* =========================================================
   EXAM ACTION
   ========================================================= */
function getExamAction(exam) {

    if (exam.status === "in-progress") {

        return `
            <button
                type="button"
                class="exam-card-action"
                data-exam-id="${exam.id}"
            >

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M8 5v14l11-7L8 5Z" />
                </svg>

                <span>Resume Exam</span>

            </button>
        `;
    }


    if (exam.status === "scheduled") {

        return `
            <button
                type="button"
                class="exam-card-action secondary"
                data-exam-id="${exam.id}"
            >

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="8"
                    />

                    <path d="M12 8v4l2.5 2.5" />
                </svg>

                <span>View Details</span>

            </button>
        `;
    }


    if (exam.status === "available") {

        return `
            <button
                type="button"
                class="exam-card-action"
                data-exam-id="${exam.id}"
            >

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M8 5v14l11-7L8 5Z" />
                </svg>

                <span>Start Exam</span>

            </button>
        `;
    }


    return "";
}

/* =========================================================
   RECENT ATTEMPTS
   ========================================================= */

function renderRecentAttempts() {

    const attemptsList =
        document.getElementById(
            "recentAttemptsList"
        );


    if (!attemptsList) {
        return;
    }


    if (MOCK_ATTEMPTS.length === 0) {

        attemptsList.innerHTML = `
            <div class="dashboard-empty-state">
                No examination attempts found.
            </div>
        `;

        return;
    }


    attemptsList.innerHTML =
        MOCK_ATTEMPTS
            .map(
                attempt =>
                    createAttemptRow(attempt)
            )
            .join("");
}


/* =========================================================
   CREATE ATTEMPT ROW
   ========================================================= */

function createAttemptRow(attempt) {

    return `
        <div class="attempt-row">

            <strong>
                ${escapeHTML(
                    attempt.examination
                )}
            </strong>


            <span>
                ${escapeHTML(
                    attempt.completedDate
                )}
            </span>


            <span class="attempt-score">
                ${attempt.score}/${attempt.totalMarks}
                · ${attempt.percentage}%
            </span>


            <span class="attempt-result">
                ${escapeHTML(attempt.result)}
            </span>

        </div>
    `;
}


/* =========================================================
   LOGOUT
   ========================================================= */

function initializeLogout() {

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        () => {

            logout();

        }
    );
}


/* =========================================================
   HTML SAFETY
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}