export const getData = (url: string, pageSize: number, skip: number) => {
    const urlWithLimit = `${url}?limit=${pageSize}&skip=${skip}`
    return fetch(urlWithLimit)
}