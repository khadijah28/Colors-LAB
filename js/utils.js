function isValidColor(name) {
    return typeof name === 'string' && name.trim().length > 0;
}

function buildColorPayload(color, userId) {
    return { color: color.trim(), userId: userId };
}

function parseCookieString(cookieStr) {
    const result = { firstName: '', lastName: '', userId: -1 };
    if (!cookieStr) return result;
    const splits = cookieStr.split(',');
    for (let i = 0; i < splits.length; i++) {
        const thisOne = splits[i].trim();
        const tokens = thisOne.split('=');
        if (tokens[0] === 'firstName') {
            result.firstName = tokens[1];
        } else if (tokens[0] === 'lastName') {
            result.lastName = tokens[1];
        } else if (tokens[0] === 'userId') {
            result.userId = parseInt(tokens[1].trim(), 10);
        }
    }
    return result;
}

module.exports = { isValidColor, buildColorPayload, parseCookieString };
