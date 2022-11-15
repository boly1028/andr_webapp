import { downloadURI } from ".";

export const downloadBlob = (blob: Blob, name: string) => {
    // Create URL
    const url = URL.createObjectURL(blob);
    downloadURI(url, name);
    // Revoke created url to free up space
    URL.revokeObjectURL(url);
}