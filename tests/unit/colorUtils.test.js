const { isValidColor, buildColorPayload, parseCookieString } = require('../../js/utils');

describe('isValidColor', () => {
    test('returns true for a valid color name', () => {
        expect(isValidColor('red')).toBe(true);
    });

    test('returns true for a multi-word color name', () => {
        expect(isValidColor('sky blue')).toBe(true);
    });

    test('returns false for an empty string', () => {
        expect(isValidColor('')).toBe(false);
    });

    test('returns false for a whitespace-only string', () => {
        expect(isValidColor('   ')).toBe(false);
    });

    test('returns false for null', () => {
        expect(isValidColor(null)).toBe(false);
    });

    test('returns false for a number', () => {
        expect(isValidColor(123)).toBe(false);
    });
});

describe('buildColorPayload', () => {
    test('builds the correct payload object', () => {
        expect(buildColorPayload('blue', 5)).toEqual({ color: 'blue', userId: 5 });
    });

    test('trims leading and trailing whitespace from color name', () => {
        expect(buildColorPayload('  green  ', 1)).toEqual({ color: 'green', userId: 1 });
    });

    test('preserves the userId as-is', () => {
        const payload = buildColorPayload('red', 42);
        expect(payload.userId).toBe(42);
    });
});

describe('parseCookieString', () => {
    test('parses a valid cookie string into user fields', () => {
        const result = parseCookieString('firstName=Jane,lastName=Doe,userId=7');
        expect(result.firstName).toBe('Jane');
        expect(result.lastName).toBe('Doe');
        expect(result.userId).toBe(7);
    });

    test('returns default values for an empty cookie string', () => {
        const result = parseCookieString('');
        expect(result.firstName).toBe('');
        expect(result.lastName).toBe('');
        expect(result.userId).toBe(-1);
    });

    test('returns default values for null input', () => {
        const result = parseCookieString(null);
        expect(result.userId).toBe(-1);
    });

    test('parses userId as an integer', () => {
        const result = parseCookieString('userId=99');
        expect(typeof result.userId).toBe('number');
        expect(result.userId).toBe(99);
    });
});
