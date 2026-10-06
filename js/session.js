/* =========================================================
   PROEXAM — SESSION MANAGEMENT
   Authentication session + access control
   ========================================================= */

const SESSION_STORAGE_KEY = "proexam_current_user";


/* ---------------------------------------------------------
   GET CURRENT USER
   --------------------------------------------------------- */

/*
 * Retrieve the currently authenticated user.
 *
 * The login system stores the session in:
 * - localStorage when "Remember Me" is selected
 * - sessionStorage otherwise
 *
 * We check both storage locations.
 */
function getCurrentUser() {

    const localSession =
        localStorage.getItem(SESSION_STORAGE_KEY);

    if (localSession) {

        try {

            return JSON.parse(localSession);

        } catch (error) {

            console.error(
                "Unable to read local authentication session.",
                error
            );

            localStorage.removeItem(
                SESSION_STORAGE_KEY
            );
        }
    }


    const sessionStorageData =
        sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (sessionStorageData) {

        try {

            return JSON.parse(sessionStorageData);

        } catch (error) {

            console.error(
                "Unable to read temporary authentication session.",
                error
            );

            sessionStorage.removeItem(
                SESSION_STORAGE_KEY
            );
        }
    }


    return null;
}


/* ---------------------------------------------------------
   AUTHENTICATION CHECK
   --------------------------------------------------------- */

/*
 * Determine whether a user is currently authenticated.
 */
function isAuthenticated() {

    return getCurrentUser() !== null;
}


/* ---------------------------------------------------------
   REQUIRE AUTHENTICATION
   --------------------------------------------------------- */

/*
 * Protect a page that requires authentication.
 *
 * If no authenticated user exists, redirect to login.
 */
function requireAuthentication() {

    const user = getCurrentUser();

    if (!user) {

        window.location.href =
            "login.html";

        return null;
    }

    return user;
}


/* ---------------------------------------------------------
   ROLE CHECK
   --------------------------------------------------------- */

/*
 * Ensure that the authenticated user has
 * permission to access a particular role-based page.
 */
function requireRole(requiredRole) {

    const user =
        requireAuthentication();

    if (!user) {
        return null;
    }


    if (user.role !== requiredRole) {

        console.warn(
            `Access denied. Required role: ${requiredRole}`
        );

        window.location.href =
            "index.html";

        return null;
    }


    return user;
}


/* ---------------------------------------------------------
   LOGOUT
   --------------------------------------------------------- */

/*
 * End the current authentication session.
 *
 * Both storage locations are cleared because
 * the session could have been created with or
 * without "Remember Me".
 */
function logout() {

    localStorage.removeItem(
        SESSION_STORAGE_KEY
    );

    sessionStorage.removeItem(
        SESSION_STORAGE_KEY
    );


    /*
     * Redirect the user to the public landing page.
     */
    window.location.href =
        "index.html";
}