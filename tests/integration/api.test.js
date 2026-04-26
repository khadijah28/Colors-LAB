const { parseSearchResponse } = require('../../js/api');

global.fetch = jest.fn();

describe('SearchColors API integration', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('successful response contains a results array and empty error', () => {
        const mockData = { results: ['red', 'crimson', 'rose'], error: '' };
        const parsed = parseSearchResponse(mockData);
        expect(Array.isArray(parsed.results)).toBe(true);
        expect(parsed.results).toHaveLength(3);
        expect(parsed.error).toBe('');
    });

    test('error response from API is handled and surfaces the error message', () => {
        const mockData = { id: 0, firstName: '', lastName: '', error: 'No Records Found' };
        const parsed = parseSearchResponse(mockData);
        expect(parsed.results).toEqual([]);
        expect(parsed.error).toBe('No Records Found');
    });

    test('invalid (non-object) response is handled gracefully', () => {
        const parsed = parseSearchResponse(null);
        expect(parsed.results).toEqual([]);
        expect(parsed.error).toBe('Invalid response');
    });

    test('searchColors sends a POST request with correct JSON payload', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({ results: ['crimson'], error: '' })
        });

        const { searchColors } = require('../../js/api');
        const result = await searchColors('crim', 3);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('SearchColors.php'),
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ search: 'crim', userId: 3 })
            })
        );
        expect(result.results).toContain('crimson');
    });

    test('response JSON structure has the expected fields', () => {
        const mockData = { results: ['navy', 'teal'], error: '' };
        const parsed = parseSearchResponse(mockData);
        expect(parsed).toHaveProperty('results');
        expect(parsed).toHaveProperty('error');
    });
});
