export const searchItems = (url:string, title:string) => {
    return fetch(`${url}/search?q:${title}`)
}