// ============================================
// SIGNUP AUTHENTICATION SYSTEM
// ============================================

// Get form elements
const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const createAccountBtn = document.querySelector('.next-link');

// Tab switching (login/signup)
const loginLink = document.getElementById("login");
const signupLink = document.getElementById("signin");

// Set initial active state
if (signupLink) {
    signupLink.classList.add("active");
}

// Handle Create Account button click
createAccountBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get input values
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validate inputs
    if (!fullName || !email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Validate password strength
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Check if email already exists
    if (emailExists(email)) {
        alert('This email is already registered! Please login instead.');
        window.location.href = '../login/index.html';
        return;
    }
    
    // Save user data
    if (saveUser(fullName, email, password)) {
        alert('Account created successfully! Please login.');
        window.location.href = '../login/index.html';
    } else {
        alert('Something went wrong. Please try again.');
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if email already exists
function emailExists(email) {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    return registeredUsers.some(user => user.email === email);
}

// Save user to localStorage
function saveUser(name, email, password) {
    try {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        console.log('User saved successfully:', newUser);
        return true;
    } catch (error) {
        console.error('Error saving user:', error);
        return false;
    }
}

// Allow Enter key to submit
fullNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') createAccountBtn.click();
});

emailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') createAccountBtn.click();
});

passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') createAccountBtn.click();
});

console.log('Signup page ready!');