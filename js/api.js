const API_BASE = 'http://COP4331-5.com/LAMPAPI';

async function searchColors(searchTerm, userId) {
    const response = await fetch(`${API_BASE}/SearchColors.php`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ search: searchTerm, userId: userId })
    });
    return response.json();
}

function parseSearchResponse(data) {
    if (!data || typeof data !== 'object') {
        return { results: [], error: 'Invalid response' };
    }
    return {
        results: Array.isArray(data.results) ? data.results : [],
        error: typeof data.error === 'string' ? data.error : ''
    };
}

module.exports = { searchColors, parseSearchResponse };
