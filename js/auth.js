/* =========================================================
   PROEXAM — REGISTRATION
   Registration UI + Business Logic
   ========================================================= */


/* =========================================================
   STORAGE CONFIGURATION
   ========================================================= */

const USERS_STORAGE_KEY = "proexam_users";


/* =========================================================
   INITIALIZE REGISTRATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeRegistration();

});


/* =========================================================
   MAIN INITIALIZATION
   ========================================================= */

function initializeRegistration() {

    /* -----------------------------------------------------
       DOM ELEMENTS
       ----------------------------------------------------- */

    const registrationForm =
        document.getElementById("registrationForm");

    const registrationContent =
        document.getElementById("registrationContent");

    const registrationSuccess =
        document.getElementById("registrationSuccess");

    const registerSubmitButton =
        document.getElementById("registerSubmitButton");

    const termsCheckbox =
        document.getElementById("terms");


    /*
     * Stop execution if this script is loaded on
     * a page that does not contain the registration form.
     */
    if (!registrationForm) {
        return;
    }


    /* =====================================================
       STORAGE FUNCTIONS
       ===================================================== */

    /*
     * Get registered users from localStorage.
     */
    function getRegisteredUsers() {

        try {

            const storedUsers =
                localStorage.getItem(
                    USERS_STORAGE_KEY
                );


            /*
             * No users have been registered yet.
             */
            if (!storedUsers) {
                return [];
            }


            const users =
                JSON.parse(storedUsers);


            /*
             * Make sure stored data is actually
             * an array.
             */
            if (!Array.isArray(users)) {
                return [];
            }


            return users;

        } catch (error) {

            console.error(
                "Error reading registered users:",
                error
            );

            return [];
        }
    }


    /*
     * Save users to localStorage.
     */
    function saveRegisteredUsers(users) {

        try {

            localStorage.setItem(
                USERS_STORAGE_KEY,
                JSON.stringify(users)
            );

            return true;

        } catch (error) {

            console.error(
                "Error saving registered user:",
                error
            );

            return false;
        }
    }


    /* =====================================================
       ERROR HANDLING
       ===================================================== */

    /*
     * Display an error message.
     */
    function showError(elementId, message) {

        const element =
            document.getElementById(elementId);


        if (element) {
            element.textContent = message;
        }
    }


    /*
     * Clear all form errors.
     */
    function clearErrors() {

        const errors =
            document.querySelectorAll(".form-error");


        errors.forEach((error) => {

            error.textContent = "";

        });
    }


    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    const passwordToggles =
        document.querySelectorAll(".password-toggle");


    passwordToggles.forEach((toggle) => {

        toggle.addEventListener(
            "click",
            () => {

                const targetId =
                    toggle.getAttribute(
                        "data-target"
                    );


                const input =
                    document.getElementById(
                        targetId
                    );


                if (!input) {
                    return;
                }


                if (input.type === "password") {

                    input.type = "text";

                    toggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    input.type = "password";

                    toggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );
                }

            }
        );

    });


    /* =====================================================
       VALIDATION FUNCTIONS
       ===================================================== */

    /*
     * Validate email format.
     */
    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return emailPattern.test(email);
    }


    /*
     * Validate password.
     *
     * Requirements:
     *
     * - Minimum 8 characters
     * - At least one uppercase letter
     * - At least one number
     * - At least one special character
     */
    function isStrongPassword(password) {

        const hasMinimumLength =
            password.length >= 8;


        const hasCapitalLetter =
            /[A-Z]/.test(password);


        const hasNumber =
            /\d/.test(password);


        const hasSpecialCharacter =
            /[^A-Za-z0-9]/.test(password);


        return (
            hasMinimumLength &&
            hasCapitalLetter &&
            hasNumber &&
            hasSpecialCharacter
        );
    }


    /*
     * Check whether the email already exists.
     */
    function isEmailAlreadyRegistered(email) {

        const normalizedEmail =
            email
                .trim()
                .toLowerCase();


        const users =
            getRegisteredUsers();


        return users.some((user) => {

            /*
             * Protect against malformed
             * localStorage data.
             */
            if (
                !user ||
                typeof user.email !== "string"
            ) {
                return false;
            }


            return (
                user.email.toLowerCase() ===
                normalizedEmail
            );

        });
    }


    /* =====================================================
       USER ID
       ===================================================== */

    /*
     * Generate a unique user ID.
     *
     * We don't depend exclusively on
     * crypto.randomUUID(), because the project
     * may sometimes be opened directly from
     * the filesystem.
     */
    function generateUserId() {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID ===
                "function"
        ) {

            return window.crypto.randomUUID();
        }


        /*
         * Fallback ID.
         */
        return (
            "user_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 10)
        );
    }


    /* =====================================================
       TERMS & SUBMIT BUTTON
       ===================================================== */

    /*
     * Enable Create Account only when
     * Terms is checked.
     */
    function updateSubmitButtonState() {

        if (
            !registerSubmitButton ||
            !termsCheckbox
        ) {
            return;
        }


        registerSubmitButton.disabled =
            !termsCheckbox.checked;
    }


    /*
     * Listen for Terms checkbox changes.
     */
    if (termsCheckbox) {

        termsCheckbox.addEventListener(
            "change",
            () => {

                updateSubmitButtonState();


                /*
                 * Remove Terms error after
                 * the checkbox is selected.
                 */
                if (termsCheckbox.checked) {

                    showError(
                        "termsError",
                        ""
                    );
                }

            }
        );
    }


    /* =====================================================
       SUCCESS COMPONENT
       ===================================================== */

    /*
     * Hide registration content and show
     * registration success component.
     */
    function showRegistrationSuccess() {

        if (registrationContent) {

            registrationContent.hidden =
                true;
        }


        if (registrationSuccess) {

            registrationSuccess.hidden =
                false;
        }
    }


    /* =====================================================
       FORM SUBMISSION
       ===================================================== */

    registrationForm.addEventListener(
        "submit",
        (event) => {

            /*
             * Prevent browser page reload.
             */
            event.preventDefault();


            /*
             * Clear previous errors.
             */
            clearErrors();


            /* ---------------------------------------------
               GET FORM VALUES
               --------------------------------------------- */

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            const role =
                document
                    .getElementById("role")
                    .value;


            const terms =
                document
                    .getElementById("terms")
                    .checked;


            let isValid = true;


            /* =============================================
               FULL NAME
               Minimum 6 characters
               ============================================= */

            if (fullName.length < 6) {

                showError(
                    "fullNameError",
                    "Full name must contain at least 6 characters."
                );

                isValid = false;
            }


            /* =============================================
               EMAIL
               Valid format
               ============================================= */

            if (!isValidEmail(email)) {

                showError(
                    "emailError",
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            /* =============================================
               EMAIL
               Duplicate check
               ============================================= */

            else if (
                isEmailAlreadyRegistered(email)
            ) {

                showError(
                    "emailError",
                    "This email is already registered."
                );

                isValid = false;
            }


            /* =============================================
               PASSWORD
               ============================================= */

            if (!isStrongPassword(password)) {

                showError(
                    "passwordError",
                    "Password must be at least 8 characters and include one capital letter, one number and one special character."
                );

                isValid = false;
            }


            /* =============================================
               CONFIRM PASSWORD
               ============================================= */

            if (password !== confirmPassword) {

                showError(
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                isValid = false;
            }


            /* =============================================
               ROLE
               Student / Examiner only
               ============================================= */

            if (
                role !== "student" &&
                role !== "examiner"
            ) {

                showError(
                    "roleError",
                    "Please select a valid role."
                );

                isValid = false;
            }


            /* =============================================
               TERMS
               ============================================= */

            if (!terms) {

                showError(
                    "termsError",
                    "Please accept the Terms & Privacy Policy."
                );

                isValid = false;
            }


            /* =============================================
               STOP IF VALIDATION FAILS
               ============================================= */

            if (!isValid) {

                return;
            }


            /* =============================================
               GET EXISTING USERS
               ============================================= */

            const users =
                getRegisteredUsers();


            /* =============================================
               CREATE NEW USER
               ============================================= */

            const newUser = {

                id:
                    generateUserId(),

                fullName:
                    fullName,

                email:
                    email.toLowerCase(),

                /*
                 * For this frontend-only prototype.
                 *
                 * A production application should
                 * NEVER store plain-text passwords.
                 */
                password:
                    password,

                role:
                    role,

                createdAt:
                    new Date().toISOString()
            };


            /* =============================================
               ADD USER TO USERS ARRAY
               ============================================= */

            users.push(newUser);


            /* =============================================
               SAVE USER
               ============================================= */

            const saveSuccessful =
                saveRegisteredUsers(users);


            /*
             * Make sure the user was actually
             * saved before showing success.
             */
            if (!saveSuccessful) {

                showError(
                    "emailError",
                    "Unable to create your account. Please try again."
                );

                return;
            }


            /* =============================================
               REGISTRATION SUCCESS
               ============================================= */

            /*
             * Clear the form.
             */
            registrationForm.reset();


            /*
             * Disable Create Account again.
             */
            updateSubmitButtonState();


            /*
             * Replace form with success card.
             */
            showRegistrationSuccess();

        }
    );


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    /*
     * Create Account is disabled initially
     * because Terms is unchecked.
     */
    updateSubmitButtonState();

}