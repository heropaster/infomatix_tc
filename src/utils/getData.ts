export const getData = (url: string, limit: number) => {
    const urlWithLimit = `${url}?limit=${limit}`
    return fetch(urlWithLimit)
}