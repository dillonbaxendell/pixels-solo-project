//add two integers
//add decimals
//add negative
//add string
//One number?
//string 'ten'

import sum from "./add.js";


test('Add 2 Integers', () => {
    expect(sum(1,2)).toBe(3);
})

test('Add decimals', () => {
    expect(sum(1.5, 2.7)).toBe(4.2);
})

test('Add negatives', () => {
    expect(sum(-1, 3)).toBe(2);
})

test('Add strings', () => {
    expect(sum('1', '3')).toBe(4);
})

test('Add ONE', () => {
    expect(sum(1)).toBe(1);
})

test(`'Add String 'ten'`, () => {
    expect(sum('ten', 1)).toBe(NaN);
})