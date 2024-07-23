export function isNotEmpty(obj) {
    return obj !== undefined && obj !== null && Object.keys(obj).length > 0;
}