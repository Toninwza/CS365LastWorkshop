// นำเข้าฟังก์ชันจากไฟล์ของเพื่อน
const { checkPassword } = require('./script');

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

    // 3. ทดสอบกรณีพิเศษ (Edge Cases) - กรณีที่อาจเกิดขึ้นได้แต่ไม่บ่อยนัก
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