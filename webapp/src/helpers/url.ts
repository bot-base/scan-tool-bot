export function isValidUrl(value: string) {
    let url;

    try {
        url = new URL(value);
    } catch {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}