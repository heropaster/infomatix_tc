export const searchItems = (url:string, title:string) => {
    // TODO Если инпут пустой, сделать лимит на поиск (для более быстрой выдачи результатов, так же это можно использовать как сброс поиска - API возвращает все продукты при пустой строке)
    const formattedUrl = `${url}/search?q=${title}`
    return fetch(formattedUrl)
}