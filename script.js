
function showMessage(text, type) {
    const msg = document.getElementById("message");
    msg.innerText = text;
    msg.className = "message " + type;
}

function validatePassword(password) {
    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }
    if (!/\d/.test(password)) {
        return "Password must contain at least 1 number";
    }
    return null;
}

function togglePassword() {
    const pwd = document.getElementById("password");
    const confirm = document.getElementById("confirmPassword");

    const type = pwd.type === "password" ? "text" : "password";
    pwd.type = type;
    confirm.type = type;
}

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !password || !confirmPassword) {
        showMessage("Please fill all fields", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match", "error");
        return;
    }

    const error = validatePassword(password);
    if (error) {
        showMessage(error, "error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        showMessage("User already exists", "error");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Register success!", "success");
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username]) {
        showMessage("User not found", "error");
        return;
    }

    if (users[username] !== password) {
        showMessage("Wrong password", "error");
        return;
    }

    // เก็บ session
    localStorage.setItem("currentUser", username);

    showMessage("Login success 🎉", "success");

    // redirect
    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validatePassword, register, login };
}
