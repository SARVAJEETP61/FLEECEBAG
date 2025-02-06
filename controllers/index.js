$(document).ready(function () {
    if (typeof jQuery == "undefined") {
        console.error("jQuery is not loaded! Make sure to include it before this script.");
    } else {
        console.log("jQuery is loaded successfully.");
    }
    if ($(".owl-1").length > 0) {
        $(".owl-1").owlCarousel({
            items: 1,
            loop: true,
            stagePadding: 0,
            mouseDrag: true,
            touchDrag: true,
            margin: 20,
            smartSpeed: 1300,
            autoplay: true,
            pauseOnHover: false,
            responsive: {
                600: {
                    margin: 20,
                    nav: true,
                    items: 2,
                },
                1000: {
                    margin: 20,
                    stagePadding: 0,
                    items: 4,
                },
            },
        });
    }
});
if (typeof jQuery == "undefined") {
    console.error("jQuery is not loaded! Make sure to include it before this script.");
} else {
    console.log("jQuery is loaded successfully.");
}


document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');


    const token = localStorage.getItem('jwtToken');
    console.log('JWT Token:', token);


    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');

    if (loginLink && signupLink && logoutLink) {

        if (token) {
            console.log('User is logged in');
            const decodedToken = decodeJwt(token);
            console.log('Decoded User ID:', decodedToken.userId);


            const userIdElement = document.getElementById('user-id');
            if (userIdElement) {
                userIdElement.textContent = decodedToken.userId;
            }


            loginLink.style.display = 'none';
            signupLink.style.display = 'none';
            logoutLink.style.display = 'block';
        } else {
            console.log('User is not logged in');
            loginLink.style.display = 'block';
            signupLink.style.display = 'block';
            logoutLink.style.display = 'none';
        }
    } else {
        console.error('One or more elements are missing: login-link, signup-link, logout-link');
    }
});



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
    window.location.href = '/login.html';  // Redirect to login page after logout
}
