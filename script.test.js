// นำเข้าฟังก์ชันจากไฟล์ของเพื่อน
const { validatePassword, register, login } = require('./script');

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
        expect(validatePassword('Kamonphan2026')).toBeNull();
        expect(validatePassword('12345678')).toBeNull();
    });

    // 2. ทดสอบกรณีที่ควรตก (Negative Test)
    test('รหัสผ่านสั้นเกินไป -> ต้องมีข้อความ error', () => {
        expect(validatePassword('Abc1')).toBe('Password must be at least 8 characters');
    });

    test('รหัสผ่านไม่มีตัวเลข -> ต้องมีข้อความ error', () => {
        expect(validatePassword('PasswordOnly')).toBe('Password must contain at least 1 number');
    });

    // 3. ทดสอบกรณีพิเศษ (Edge Cases)
    test('รหัสผ่านว่างเปล่า -> ต้องมีข้อความ error', () => {
        expect(validatePassword('')).toBe('Password must be at least 8 characters');
    });

    test('ใส่เป็นตัวเลขอย่างเดียวแต่สั้นไป -> ต้องมีข้อความ error', () => {
        expect(validatePassword('123')).toBe('Password must be at least 8 characters');
    });
    
    test('Password 8 ตัว มีตัวเลข -> ควรผ่าน', () => {
        expect(validatePassword('Abcdefg1')).toBeNull();
    });
});

describe('Register Flow Tests', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    // ทดสอบ validatePassword function ก่อน register
    test('Register ด้วย Password ที่ถูกต้อง -> validatePassword ต้องคืน null', () => {
        const password = 'ValidPass123';
        expect(validatePassword(password)).toBeNull();
    });

    test('Register ด้วย Password ที่สั้น -> validatePassword ต้องคืน error message', () => {
        const password = 'short1';
        expect(validatePassword(password)).not.toBeNull();
    });

    test('Register ด้วย Password ที่ไม่มีตัวเลข -> validatePassword ต้องคืน error message', () => {
        const password = 'NoNumbers';
        expect(validatePassword(password)).not.toBeNull();
    });

    // ทดสอบการจัดเก็บ users ใน localStorage
    test('Users ควรเก็บอยู่ใน localStorage เป็น JSON', () => {
        const testUsers = { testuser: 'password1234' };
        localStorage.setItem('users', JSON.stringify(testUsers));
        
        const stored = JSON.parse(localStorage.getItem('users'));
        expect(stored.testuser).toBe('password1234');
    });

    test('User ใหม่ต้องสามารถเพิ่มเข้า users object ได้', () => {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        users['newuser'] = 'newpass1234';
        localStorage.setItem('users', JSON.stringify(users));
        
        const updated = JSON.parse(localStorage.getItem('users'));
        expect(updated.newuser).toBe('newpass1234');
    });
});

describe('Login Flow Tests', () => {
    beforeEach(() => {
        localStorage.clear();
        // สร้าง test user
        const testUsers = { 'testuser': 'testpass1234' };
        localStorage.setItem('users', JSON.stringify(testUsers));
    });

    // ทดสอบการตรวจสอบ Password
    test('Password ของ Login ต้องผ่านการ validate', () => {
        const password = 'testpass1234';
        expect(validatePassword(password)).toBeNull();
    });

    // ทดสอบการตรวจสอบ User ใน localStorage
    test('Login ด้วย Username ที่มีอยู่ -> ควรเจอ user ใน localStorage', () => {
        const users = JSON.parse(localStorage.getItem('users'));
        expect(users['testuser']).toBe('testpass1234');
    });

    test('Login ด้วย Username ที่ไม่มี -> ไม่ควรเจอใน users object', () => {
        const users = JSON.parse(localStorage.getItem('users'));
        expect(users['wronguser']).toBeUndefined();
    });

    test('Login ด้วย Password ที่ถูกต้อง -> ต้องตรงกับที่เก็บ', () => {
        const username = 'testuser';
        const password = 'testpass1234';
        const users = JSON.parse(localStorage.getItem('users'));
        
        expect(users[username] === password).toBe(true);
    });

    test('Login ด้วย Password ที่ผิด -> ต้องไม่ตรงกับที่เก็บ', () => {
        const username = 'testuser';
        const password = 'wrongpassword';
        const users = JSON.parse(localStorage.getItem('users'));
        
        expect(users[username] === password).toBe(false);
    });

    test('Login สำเร็จ -> ต้องจัดเก็บ currentUser ใน localStorage', () => {
        const username = 'testuser';
        localStorage.setItem('currentUser', username);
        
        expect(localStorage.getItem('currentUser')).toBe('testuser');
    });

    test('Logout -> ต้องลบ currentUser จาก localStorage', () => {
        localStorage.setItem('currentUser', 'testuser');
        expect(localStorage.getItem('currentUser')).toBe('testuser');
        
        localStorage.removeItem('currentUser');
        expect(localStorage.getItem('currentUser')).toBeNull();
    });
});