// user จำลอง
const USER_DATA = {
    username: "admin",
    password: "admin1234"
};

// ตรวจ password
function checkPassword(password) {
    return password.length >= 8 && /\d/.test(password);
}
module.exports = { checkPassword };


// handle login
const form = document.getElementById("loginForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const error = document.getElementById("error");

        // ตรวจ format
        if (!checkPassword(password)) {
            error.textContent = "Password ต้อง ≥ 8 ตัว และมีตัวเลข";
            return;
        }

        // ตรวจ auth
        if (username === USER_DATA.username && password === USER_DATA.password) {
            // เก็บ session (localStorage)
            localStorage.setItem("user", username);
            window.location.href = "dashboard.html";
        } else {
            error.textContent = "Username หรือ Password ไม่ถูกต้อง";
        }
    });
}

// dashboard logic
if (window.location.pathname.includes("dashboard.html")) {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "index.html";
    } else {
        document.getElementById("welcome").textContent = "Welcome " + user + " 🎉";
    }
}

// logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}