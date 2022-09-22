const API = "http://localhost:8080/todo";

export const getTodos = async (callback, api = API) => {
    fetch(api)
    .then(res => res.json())
    .then(res => callback(res));
}

export const addTodo = async (callback, content, api = API) => {
    return fetch(API, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
    })
        .then(res => res.json())
        .then(res => callback(res));
}

export const deleteTodo = async (id, callback, api = API) => {
    return fetch(API +"/" + id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(res => {
        callback(res);
    })
}

export const patchTodo = async (id, content, callback, api= API) => {
    return fetch(API + "/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
    })
    .then(res => res.json())
    .then(res => callback(res));
}