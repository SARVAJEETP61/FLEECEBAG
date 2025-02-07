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
    

});


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




