import leapYear from "./leapYear";

test('divisible by 4', () => {
    expect(leapYear(1816)).toBe(true);
})

test('divisible by 100', () => {
    expect(leapYear(1900)).toBe(false);
})

test('divisible by 400', () => {
    expect(leapYear(1600)).toBe(true);
})

test('other', () => {
    expect(leapYear(2021)).toBe(false);
})