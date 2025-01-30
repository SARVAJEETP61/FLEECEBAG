document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded - Starting header fetch');

    fetch('/partials/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load header.html: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log("Header successfully loaded!");
            document.getElementById("header-container").innerHTML = data;

            setTimeout(() => {
                console.log("Running authentication logic...");
                initializeAuth();
            }, 200);
        })
        .catch(error => console.error("Error loading header:", error));
});

function initializeAuth() {
    console.log('Initializing authentication logic');

    const token = localStorage.getItem('jwtToken');
    console.log('JWT Token:', token);

    const logoutLink = document.getElementById('logout-link');
    if (!logoutLink) {
        console.error("Logout link not found in the DOM! Check if header.html is loading correctly.");
        return;
    }

    if (token) {
        console.log('User is logged in');
        const decodedToken = decodeJwt(token);
        console.log('Decoded User ID:', decodedToken.userId);

        const userIdElement = document.getElementById('user-id');
        if (userIdElement) {
            userIdElement.textContent = decodedToken.userId;
        }

        document.getElementById('login-link').style.display = 'none';
        document.getElementById('signup-link').style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        console.log('User is not logged in');
        document.getElementById('login-link').style.display = 'block';
        document.getElementById('signup-link').style.display = 'block';
        logoutLink.style.display = 'none';
    }

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        logoutUser();
    });
}

function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function logoutUser() {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login.html';
}
