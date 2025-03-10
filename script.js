// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Login/Signup Modals
function openLogin() {
    document.getElementById('loginModal').style.display = 'block';
}
function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}
function openSignup() {
    document.getElementById('signupModal').style.display = 'block';
}
function closeSignup() {
    document.getElementById('signupModal').style.display = 'none';
}

// Terms and Privacy Policy Modal
function openTermsModal() {
    document.getElementById('termsModal').style.display = 'block';
}
function closeTermsModal() {
    document.getElementById('termsModal').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// User Account System
let users = JSON.parse(localStorage.getItem('users')) || [];

// Signup Functionality
document.getElementById('signupForm').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    // Add the new user
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! You can now login.');
    closeSignup();
};

// Login Functionality
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Check if the user exists
    const user = users.find(user => user.username === username);
    if (!user) {
        alert('Username not found. Please sign up first.');
        return;
    }

    // Check if the password is correct
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    // Login the user
    login(username, 'https://i.pinimg.com/474x/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg'); 
    closeLogin();
};

// Login Function
function login(username, profilePicUrl) {
    console.log('Logging in user:', username);

    // Hide the login/signup buttons
    document.getElementById('authButtons').style.display = 'none';

    // Show the profile picture
    const userProfile = document.getElementById('userProfile');
    const profilePic = document.getElementById('profilePic');
    userProfile.style.display = 'block';
    profilePic.src = profilePicUrl || 'https://i.pinimg.com/474x/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg'; 

    // Show hidden sections
    document.getElementById('hiddenSections').style.display = 'block';

    // Store the login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('profilePicUrl', profilePicUrl || 'https://i.pinimg.com/474x/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg');
}

// Logout Functionality
function logout() {
    // Hide the profile picture
    document.getElementById('userProfile').style.display = 'none';
    
    // Show the login/signup buttons
    document.getElementById('authButtons').style.display = 'flex';
    
    // Hide hidden sections
    document.getElementById('hiddenSections').style.display = 'none';
    
    // Clear the login status from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('profilePicUrl');
}

// Profile Dropdown Functionality
document.getElementById('profilePic').onclick = function(event) {
    event.stopPropagation(); 
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
};

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown.style.display === 'block' && !event.target.closest('#userProfile')) {
        dropdown.style.display = 'none';
    }
});

// Check if the user is already logged in when the page loads
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const username = localStorage.getItem('username');
        const profilePicUrl = localStorage.getItem('profilePicUrl');
        login(username, profilePicUrl);
    }
};

document.querySelector('a[href="#home"]').onclick = function(event) {
    event.preventDefault(); 
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); 
};

// Scroll to contact section when "Contact" is clicked
document.querySelector('a[href="#contact"]').onclick = function(event) {
    event.preventDefault(); 
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); 
};