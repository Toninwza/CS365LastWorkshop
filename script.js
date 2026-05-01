console.log("JS LOADED");

function showMessage(text, type) {
    const msg = document.getElementById("message");
    if (!msg) return;

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

function register() {
    console.log("register clicked");

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value;

    if (!username || !password) {
        showMessage("Please fill all fields", "error");
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
    console.log("login clicked");

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username]) {
        showMessage("User not found", "error");
        return;
    }

    if (users[username] !== password) {
        showMessage("Wrong password", "error");
        return;
    }

    localStorage.setItem("currentUser", username);

    showMessage("Login success ", "success");

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
}