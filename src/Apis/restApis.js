import Cookies from "universal-cookie";

const API = "http://localhost:8080/todo";

const cookies = new Cookies();

const headers = cookies.get("jwt") ? {
    'Content-Type': 'application/json',
    "authorization": cookies.get("jwt")
} : {
    'Content-Type': 'application/json'
};

export const getTodos = async (callback, api = API) => {
    fetch(api, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(res => callback(res));
}

export const addTodo = async (callback, content, api = API) => {
    return fetch(API, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(content)
    })
        .then(res => res.json())
        .then(res => callback(res));
}

export const deleteTodo = async (id, callback, api = API) => {
    return fetch(API + "/" + id, {
        method: "DELETE",
        headers: headers
    })
        .then(res => res.json())
        .then(res => {
            callback(res);
        })
}

export const patchTodo = async (id, content, callback, api = API) => {
    return fetch(API + "/" + id, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(content)
    })
        .then(res => res.json())
        .then(res => callback(res));
}