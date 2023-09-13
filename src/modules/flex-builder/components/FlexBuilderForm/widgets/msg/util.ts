export const getSanitizedJsonStringOrDefault = (data: any) => {
    if (typeof data === 'object') {
        return JSON.stringify(data);
    }
    if (typeof data === 'string') {
        // If its a string, first try to parse it to validate it as a json, and then return stringified json
        try {
            const json = JSON.parse(data);
            return JSON.stringify(json);
        } catch (err) {
            return data;
        }
    }
    return JSON.stringify(data);
}