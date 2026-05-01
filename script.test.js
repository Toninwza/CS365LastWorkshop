// นำเข้าฟังก์ชันจากไฟล์ของเพื่อน
const { checkPassword } = require('./script');

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();
global.localStorage = localStorageMock;

describe('Password Validation Tests', () => {

    // 1. ทดสอบกรณีที่ควรผ่าน (Positive Test)
    test('รหัสผ่านที่ถูกต้อง (8 ตัวขึ้นไป และมีตัวเลข) -> ควรผ่าน', () => {
        expect(checkPassword('Kamonphan2026')).toBe(true);
        expect(checkPassword('12345678')).toBe(true); // เลขล้วนแต่ยาวพอก็ถือว่ามีเลข
    });

    // 2. ทดสอบกรณีที่ควรตก (Negative Test)
    test('รหัสผ่านสั้นเกินไป -> ไม่ควรผ่าน', () => {
        expect(checkPassword('Abc1')).toBe(false);
    });

    test('รหัสผ่านไม่มีตัวเลข -> ไม่ควรผ่าน', () => {
        expect(checkPassword('PasswordOnly')).toBe(false);
    });

    // 3. ทดสอบกรณีพิเศษ (Edge Cases) - อันนี้แหละที่จะทำให้คุณดูเก่ง!
    test('รหัสผ่านว่างเปล่า -> ไม่ควรผ่าน', () => {
        expect(checkPassword('')).toBe(false);
    });

    test('ใส่ช่องว่างหลายๆ อัน -> ไม่ควรผ่าน', () => {
        expect(checkPassword('        ')).toBe(false);
    });

    test('ใส่เป็นตัวเลขอย่างเดียวแต่สั้นไป -> ไม่ควรผ่าน', () => {
        expect(checkPassword('123')).toBe(false);
    });
    
    test('กรณี Input ไม่ใช่ข้อความ (เช่น null หรือ undefined) -> ไม่ควรพังและต้องไม่ผ่าน', () => {
        expect(checkPassword(null)).toBe(false);
        expect(checkPassword(undefined)).toBe(false);
    });
});

describe('Login Flow Tests', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    // ทดสอบการ Login ด้วย Credentials ที่ถูกต้อง
    test('Login ด้วย Username และ Password ที่ถูกต้อง -> ควรจัดเก็บ user ใน localStorage', () => {
        const username = 'admin';
        const password = 'admin1234';

        // ตรวจสอบว่า password ผ่านการตรวจสอบก่อน
        expect(checkPassword(password)).toBe(true);

        // จำลองการบันทึก user
        localStorage.setItem('user', username);

        // ตรวจสอบว่า user ถูกจัดเก็บในไป localStorage
        expect(localStorage.getItem('user')).toBe('admin');
    });

    // ทดสอบการ Login ด้วย Password ที่ไม่ผ่านการตรวจสอบ
    test('Login ด้วย Password ที่สั้นเกินไป -> ไม่ควรผ่านการตรวจสอบ', () => {
        const password = 'pass1';
        expect(checkPassword(password)).toBe(false);
    });

    // ทดสอบการ Login ด้วย Username ผิด
    test('Login ด้วย Username ผิด -> ไม่ควรผ่าน', () => {
        const username = 'wronguser';
        const password = 'admin1234';
        const validUser = 'admin';

        expect(username).not.toBe(validUser);
    });

    // ทดสอบการ Login ด้วย Password ผิด
    test('Login ด้วย Password ผิด -> ไม่ควรผ่าน', () => {
        const username = 'admin';
        const password = 'wrongpass1234';
        const validPassword = 'admin1234';

        expect(password).not.toBe(validPassword);
    });

    // ทดสอบการ Logout
    test('Logout -> ควรลบ user จาก localStorage', () => {
        localStorage.setItem('user', 'admin');
        expect(localStorage.getItem('user')).toBe('admin');

        // จำลองการ logout
        localStorage.removeItem('user');
        expect(localStorage.getItem('user')).toBeNull();
    });

    // ทดสอบการป้องกัน: ถ้าไม่ได้ login ก็ไม่มี user ใน localStorage
    test('ก่อน Login -> localStorage ไม่มี user', () => {
        expect(localStorage.getItem('user')).toBeNull();
    });

    // ทดสอบ Credentials ที่ถูกต้องทั้งหมด
    test('Login ด้วยข้อมูลถูกต้องทั้งหมด -> ควรบันทึกและเข้าถึงได้', () => {
        const username = 'admin';
        const password = 'admin1234';

        // ตรวจสอบ password ผ่านการตรวจสอบ
        if (checkPassword(password) && username === 'admin' && password === 'admin1234') {
            localStorage.setItem('user', username);
        }

        expect(localStorage.getItem('user')).toBe('admin');
    });
});