// Using Test-Driven Development by testing the calculator's calculations
const calculator = require('./script');

describe('add', () => {
	test('adds 0 and 0', () => {
		expect(calculator.add(0,0)).toBe(0);
	});

	test('adds 2 and 2', () => {
		expect(calculator.add(2,2)).toBe(4);
	});

	test('adds positive numbers', () => {
		expect(calculator.add(2,6)).toBe(8);
	});
});

describe('subtract', () => {
	test('subtracts numbers', () => {
		expect(calculator.subtract(10,4)).toBe(6);
	});
});

describe('multiply', () => {
	test('multiplies two numbers', () => {
		expect(calculator.multiply(2,4)).toBe(8);
	});

	test('multiplies larger numbers', () => {
		expect(calculator.multiply(123456789,987654321)).toBe(121932631112635269);
	});
});

describe('divide', () => {
	test('divides two numbers and outputs an integer where appropriate', () => {
		expect(calculator.divide(16,4)).toBe(4);
	});

	test('divides to a non-integer', () => {
		expect(calculator.divide(6,8)).toBe(0.75);
	});
});

describe('operate', () => {
	test('adds two numbers', () => {
		expect(calculator.operate('+',4,5)).toBe(9);
	});

	test('subtracts two numbers', () => {
		expect(calculator.operate('-',4,5)).toBe(20);
	});

	test('multiplies two numbers', () => {
		expect(calculator.operate('*',4,5)).toBe(-1);
	});

	test('divides two numbers', () => {
		expect(calculator.operate('/',4,5)).toBe(0.8);
	});
});