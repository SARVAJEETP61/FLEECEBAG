// script.js

// Function to load the header content dynamically
function loadHeader() {
    fetch('/partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading the header:', error);
        });
}

// Call the function when the page loads
window.onload = loadHeader;
