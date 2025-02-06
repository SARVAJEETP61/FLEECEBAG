document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded - Starting header fetch');

    // Load the header HTML component
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

            // Run authentication logic after loading header
            initializeAuth();
        })
        .catch(error => console.error("Error loading header:", error));
    fetch('/partials/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load footer.html: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log("Footer successfully loaded!");
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
    // Protect Add to Cart Button logic

});

// Check login status
// function checkLoginStatus(event) {
//     const token = localStorage.getItem('jwtToken');

//     if (!token) {
//         // If no token is found, the user is not logged in
//         event.preventDefault();  // Prevent the default link action (navigation)
//         showLoginPopup();  // Show login popup and redirect after
//     } else {
//         console.log('User is logged in');
//         // Proceed with the normal action if the user is logged in
//     }
// }

// Show the login popup and redirect to login page
// function showLoginPopup() {
//     const popup = document.createElement('div');
//     popup.innerText = "You need to be logged in to access this page.";
//     popup.style.position = "fixed";
//     popup.style.top = "50%";
//     popup.style.left = "50%";
//     popup.style.transform = "translate(-50%, -50%)";
//     popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
//     popup.style.color = "white";
//     popup.style.padding = "20px";
//     popup.style.borderRadius = "10px";
//     document.body.appendChild(popup);

//     setTimeout(() => {
//         document.body.removeChild(popup);  // Remove popup after 2 seconds
//         window.location.href = "/login.html";  // Redirect to the login page
//     }, 2000);
// }

// Initialize authentication (checking token in localStorage)
function initializeAuth() {
    const token = localStorage.getItem('jwtToken');
    console.log('JWT Token:', token);

    const logoutLink = document.getElementById('logout-link');
    if (token) {
        console.log('User is logged in');
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

// Decode JWT token
function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Logout user and remove token
function logoutUser() {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login.html';
}
$("#subscribe").click(function () {
    Swal.fire({
        title: "Thank You!",
        text: "You are now subscribed to our weekly newsletter.",
        icon: "success",
        confirmButtonText: "Yayy",
    });
});



// document.addEventListener('DOMContentLoaded', function () {
//     console.log('DOM fully loaded - Starting header fetch');

//     fetch('/partials/header.html')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Failed to load header.html: ${response.status}`);
//             }
//             return response.text();
//         })
//         .then(data => {
//             console.log("Header successfully loaded!");
//             document.getElementById("header-container").innerHTML = data;

//             setTimeout(() => {
//                 console.log("Running authentication logic...");
//                 initializeAuth();
//             }, 200);
//         })
//         .catch(error => console.error("Error loading header:", error));
// });

// function initializeAuth() {
//     console.log('Initializing authentication logic');

//     const token = localStorage.getItem('jwtToken');
//     console.log('JWT Token:', token);

//     const logoutLink = document.getElementById('logout-link');
//     if (!logoutLink) {
//         console.error("Logout link not found in the DOM! Check if header.html is loading correctly.");
//         return;
//     }

//     if (token) {
//         console.log('User is logged in');
//         const decodedToken = decodeJwt(token);
//         console.log('Decoded User ID:', decodedToken.userId);

//         const userIdElement = document.getElementById('user-id');
//         if (userIdElement) {
//             userIdElement.textContent = decodedToken.userId;
//         }

//         document.getElementById('login-link').style.display = 'none';
//         document.getElementById('signup-link').style.display = 'none';
//         logoutLink.style.display = 'block';
//     } else {
//         console.log('User is not logged in');
//         document.getElementById('login-link').style.display = 'block';
//         document.getElementById('signup-link').style.display = 'block';
//         logoutLink.style.display = 'none';
//     }

//     logoutLink.addEventListener('click', function (event) {
//         event.preventDefault();
//         logoutUser();
//     });
// }

// function decodeJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace('-', '+').replace('_', '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }

// function logoutUser() {
//     localStorage.removeItem('jwtToken');
//     window.location.href = '/login.html';
// }
