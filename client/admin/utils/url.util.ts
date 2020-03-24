export function urlToList(url?: string): string[] {
    if (!url || url === '/') {
        return ['/'];
    }
    const urlList = url.split('/').filter((i) => i);
    return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}
