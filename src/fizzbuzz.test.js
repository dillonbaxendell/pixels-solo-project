import fizzbuzz from "./fizzbuzz";

test('divisible by 3', () => {
    expect(fizzbuzz(12)).toBe('Fizz');
})

test('divisible by 5', () => {
    expect(fizzbuzz(10)).toBe('Buzz');
})

test('divisible by 3 and 5', () => {
    expect(fizzbuzz(15)).toBe('FizzBuzz');
})

test('other', () => {
    expect(fizzbuzz(2)).toBe(2);
})