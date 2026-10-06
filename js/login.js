/* =========================================================
   PROEXAM LOGIN
   ========================================================= */


const USERS_STORAGE_KEY = "proexam_users";

const SESSION_STORAGE_KEY = "proexam_current_user";



/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();

});



/* =========================================================
   INITIALIZE LOGIN
   ========================================================= */

function initializeLogin() {

    const loginForm =
        document.getElementById("loginForm");


    if (!loginForm) {
        return;
    }


    const emailInput =
        document.getElementById("email");


    const passwordInput =
        document.getElementById("password");


    const rememberMe =
        document.getElementById("rememberMe");


    const togglePasswordButton =
        document.getElementById("togglePassword");


    const forgotPasswordLink =
        document.getElementById("forgotPasswordLink");



    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    if (togglePasswordButton) {

        togglePasswordButton.addEventListener(
            "click",
            () => {

                const isPassword =
                    passwordInput.type === "password";


                passwordInput.type =
                    isPassword
                        ? "text"
                        : "password";


                togglePasswordButton.setAttribute(
                    "aria-label",
                    isPassword
                        ? "Hide password"
                        : "Show password"
                );


                togglePasswordButton.setAttribute(
                    "aria-pressed",
                    String(isPassword)
                );

            }
        );

    }



    /* =====================================================
       CLEAR EMAIL ERROR WHILE TYPING
       ===================================================== */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            () => {

                clearFieldError("email");

                clearGeneralError();

            }
        );

    }



    /* =====================================================
       CLEAR PASSWORD ERROR WHILE TYPING
       ===================================================== */

    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            () => {

                clearFieldError("password");

                clearGeneralError();

            }
        );

    }



    /* =====================================================
       LOGIN SUBMISSION
       ===================================================== */

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            handleLogin();

        }
    );



    /* =====================================================
       FORGOT PASSWORD
       ===================================================== */

    if (forgotPasswordLink) {

        forgotPasswordLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                showGeneralError(
                    "Password recovery will be available in a future version of ProExam."
                );

            }
        );

    }

}



/* =========================================================
   HANDLE LOGIN
   ========================================================= */

function handleLogin() {

    const emailInput =
        document.getElementById("email");


    const passwordInput =
        document.getElementById("password");


    const rememberMe =
        document.getElementById("rememberMe");



    const email =
        emailInput.value
            .trim()
            .toLowerCase();


    const password =
        passwordInput.value;



    /* =====================================================
       CLEAR PREVIOUS ERRORS
       ===================================================== */

    clearAllErrors();



    let isValid = true;



    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    if (!email) {

        showFieldError(
            "email",
            "Please enter your email address."
        );


        isValid = false;

    }
    else if (!isValidEmail(email)) {

        showFieldError(
            "email",
            "Please enter a valid email address."
        );


        isValid = false;

    }



    /* =====================================================
       PASSWORD VALIDATION
       ===================================================== */

    if (!password) {

        showFieldError(
            "password",
            "Please enter your password."
        );


        isValid = false;

    }



    /* =====================================================
       STOP IF VALIDATION FAILED
       ===================================================== */

    if (!isValid) {

        return;

    }



    /* =====================================================
       GET REGISTERED USERS
       ===================================================== */

    const users =
        getRegisteredUsers();



    /* =====================================================
       FIND MATCHING USER
       ===================================================== */

    const user =
        users.find(
            (registeredUser) => {

                return (
                    typeof registeredUser.email === "string" &&
                    registeredUser.email
                        .toLowerCase() === email &&
                    registeredUser.password === password
                );

            }
        );



    /* =====================================================
       INVALID CREDENTIALS
       ===================================================== */

    if (!user) {

        showGeneralError(
            "Invalid email or password. Please check your credentials and try again."
        );


        return;

    }



    /* =====================================================
       CREATE LOGIN SESSION
       ===================================================== */

    const loggedInUser = {

        id: user.id,

        fullName: user.fullName,

        email: user.email,

        role: user.role,

        loginAt: new Date().toISOString()

    };



    /* =====================================================
       REMEMBER ME
       =====================================================

       Checked:
       localStorage

       Unchecked:
       sessionStorage

       Password is NOT stored in the session.
       ===================================================== */

    if (
        rememberMe &&
        rememberMe.checked
    ) {

        localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(loggedInUser)
        );


        sessionStorage.removeItem(
            SESSION_STORAGE_KEY
        );

    }
    else {

        sessionStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(loggedInUser)
        );


        localStorage.removeItem(
            SESSION_STORAGE_KEY
        );

    }



    /* =====================================================
       REDIRECT BASED ON ROLE
       ===================================================== */

    redirectUserByRole(
        user.role
    );

}



/* =========================================================
   GET REGISTERED USERS
   ========================================================= */

function getRegisteredUsers() {

    try {

        const storedUsers =
            localStorage.getItem(
                USERS_STORAGE_KEY
            );


        if (!storedUsers) {

            return [];

        }


        const parsedUsers =
            JSON.parse(storedUsers);


        if (!Array.isArray(parsedUsers)) {

            return [];

        }


        return parsedUsers;

    }
    catch (error) {

        console.error(
            "Unable to read registered users:",
            error
        );


        return [];

    }

}



/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(email);

}



/* =========================================================
   SHOW FIELD ERROR
   ========================================================= */

function showFieldError(
    fieldName,
    message
) {

    const errorElement =
        document.getElementById(
            `${fieldName}Error`
        );


    if (errorElement) {

        errorElement.textContent =
            message;

    }


    const input =
        document.getElementById(
            fieldName
        );


    if (input) {

        input.setAttribute(
            "aria-invalid",
            "true"
        );

    }

}



/* =========================================================
   CLEAR FIELD ERROR
   ========================================================= */

function clearFieldError(fieldName) {

    const errorElement =
        document.getElementById(
            `${fieldName}Error`
        );


    if (errorElement) {

        errorElement.textContent = "";

    }


    const input =
        document.getElementById(
            fieldName
        );


    if (input) {

        input.removeAttribute(
            "aria-invalid"
        );

    }

}



/* =========================================================
   SHOW GENERAL ERROR
   ========================================================= */

function showGeneralError(message) {

    const errorElement =
        document.getElementById(
            "loginError"
        );


    if (!errorElement) {

        return;

    }


    errorElement.textContent =
        message;


    errorElement.classList.add(
        "visible"
    );

}



/* =========================================================
   CLEAR GENERAL ERROR
   ========================================================= */

function clearGeneralError() {

    const errorElement =
        document.getElementById(
            "loginError"
        );


    if (!errorElement) {

        return;

    }


    errorElement.textContent = "";


    errorElement.classList.remove(
        "visible"
    );

}



/* =========================================================
   CLEAR ALL ERRORS
   ========================================================= */

function clearAllErrors() {

    clearFieldError("email");

    clearFieldError("password");

    clearGeneralError();

}



/* =========================================================
   ROLE-BASED REDIRECTION
   ========================================================= */

function redirectUserByRole(role) {

    switch (role) {


        /* =================================================
           STUDENT
           ================================================= */

        case "student":

            window.location.href =
                "student-dashboard.html";

            break;



        /* =================================================
           EXAMINER
           ================================================= */

        case "examiner":

            window.location.href =
                "pages/examiner-dashboard.html";

            break;



        /* =================================================
           ADMIN
           ================================================= */

        case "admin":

            window.location.href =
                "pages/admin-dashboard.html";

            break;



        /* =================================================
           UNKNOWN ROLE
           ================================================= */

        default:

            showGeneralError(
                "Your account role could not be determined. Please contact the administrator."
            );

            break;

    }

}