const loginLink = document.getElementById("login");
const signupLink = document.getElementById("signin");

console.log("Login link:", loginLink);
console.log("Signup link:", signupLink);

// Set initial active state
loginLink.classList.add("active");

loginLink.addEventListener("click", function(event) {
    // Don't prevent default - let the link work!
    loginLink.classList.add("active");
    signupLink.classList.remove("active");
    console.log("Login link clicked!");
    // Link will navigate naturally
});

signupLink.addEventListener("click", function(event) {
    // Don't prevent default - let the link work!
    signupLink.classList.add("active");
    loginLink.classList.remove("active");
    console.log("Sign up link clicked!");
    // Link will navigate naturally
});