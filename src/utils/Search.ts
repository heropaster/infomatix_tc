export const searchItems = (url:string, title:string) => {
    let formattedUrl: string;

    if (title.trim() === '') {
        formattedUrl = `${url}?limit=10`
    }else formattedUrl = `${url}/search?q=${title}`
    
    return fetch(formattedUrl)
}