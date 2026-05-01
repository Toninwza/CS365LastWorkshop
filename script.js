// user จำลอง
const USER_DATA = {
    username: "admin",
    password: "admin1234"
};

// ตรวจ password
function checkPassword(inputPassword) {
    // 1. ตรวจสอบว่า input เป็นข้อความหรือไม่ และความยาว: 
    // ใช้ .length เพื่อนับจำนวนตัวอักษร
    // ถ้าไม่มีข้อมูล หรือความยาวน้อยกว่า 8 จะให้ผลลัพธ์เป็น false ทันที
    if (!inputPassword || inputPassword.length < 8) {
        return false;
    }

    // 2. ตรวจสอบตัวเลข: เราจะสร้างตัวแปรไว้เช็กว่า "เจอตัวเลขหรือยัง?"
    let hasNumber = false;

    // ใช้การวนลูป (for) เพื่อไล่ดูตัวอักษรในรหัสผ่านทีละตัว
    // ใน JS เรามักใช้การวนลูปแบบนี้เพื่อไล่ดูสมาชิกแต่ละตัวในข้อความ
    for (let i = 0; i < inputPassword.length; i++) {
        let char = inputPassword[i];
        
        // ตรวจสอบว่าตัวอักษรตัวนั้นเป็นตัวเลขหรือไม่
        // ใน JS วิธีง่ายๆ คือเช็กว่ามันไม่ใช่ช่องว่าง และสามารถแปลงเป็นตัวเลขได้
        if (char >= '0' && char <= '9') {
            hasNumber = true;
            break; // เมื่อเจอตัวเลขตัวแรกแล้ว ก็หยุดหาต่อได้เลยเพื่อประหยัดเวลา
        }
    }

    // 3. สรุปผล: ฟังก์ชันจะคืนค่า true ก็ต่อเมื่อมีตัวเลขประกอบอยู่ด้วย
    return hasNumber;
}

// โค้ด browser ทั้งหมดอยู่ในนี้
if (typeof document !== 'undefined') {
    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const error = document.getElementById("error");

            if (!checkPassword(password)) {
                error.textContent = "Password ต้อง ≥ 8 ตัว และมีตัวเลข";
                return;
            }

            if (username === USER_DATA.username && password === USER_DATA.password) {
                localStorage.setItem("user", username);
                window.location.href = "dashboard.html";
            } else {
                error.textContent = "Username หรือ Password ไม่ถูกต้อง";
            }
        });
    }

    if (window.location.pathname.includes("dashboard.html")) {
        const user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "index.html";
        } else {
            document.getElementById("welcome").textContent = "Welcome " + user + " 🎉";
        }
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

// module.exports = { checkPassword };
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkPassword };
}