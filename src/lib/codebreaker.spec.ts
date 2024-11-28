import { describe, expect, it } from 'vitest';
import { encodeKeyString, solveKeyString } from './codebreaker';

describe('solveKeyString', () => {
	it('should return the correct decoded string', () => {
		const keystring = 'a1b2c3d4e5';
		const numbers = [1, 3, 5];
		const result = solveKeyString(keystring, numbers);
		expect(result).toBe('ace');
	});

	it('should handle empty keystring', () => {
		const keystring = '';
		const numbers = [1, 2, 3];
		const result = solveKeyString(keystring, numbers);
		expect(result).toBe('');
	});

	it('should handle empty numbers array', () => {
		const keystring = 'abcdef';
		const numbers: number[] = [];
		const result = solveKeyString(keystring, numbers);
		expect(result).toBe('');
	});
});

describe('encodeKeyString', () => {
	it('should return the correct encoded numbers', () => {
		const keystring = 'a1b2c3d4e5';
		const target = 'ace';
		const result = encodeKeyString(keystring, target);
		expect(result).toEqual([1, 3, 5]);
	});

	it('should handle empty keystring', () => {
		const keystring = '';
		const target = 'abc';
		const result = encodeKeyString(keystring, target);
		expect(result).toEqual([0, 0, 0]);
	});

	it('should handle empty target string', () => {
		const keystring = 'abcdef';
		const target = '';
		const result = encodeKeyString(keystring, target);
		expect(result).toEqual([]);
	});
});
