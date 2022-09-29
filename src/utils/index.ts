/**
 * A Utility function which downloads a given URL by creating a link item and simulating
 * on CLick functionality and then dele the link item from dom.
 * @param {string} uri url that needs to be downloaded
 * @param {string} name name of the file
 */
export function downloadURI(uri: string, name: string) {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}