const baseURL = "http://localhost:9900/api/v1"
export const User = {
    current() {
        return fetch(`${baseURL}/users/current`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
    },
    signup(params) {
        return fetch(`${baseURL}/users/signup`, {
            method: 'POST',
            credentials: 'include', //need for cookies to be allowed to be sent cross-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    },
    signin(params) {
        return fetch(`${baseURL}/users/signin`, {
            method: 'POST',
            credentials: 'include', //need for cookies to be allowed to be sent cross-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    },
    destroy() {
        return fetch(`${baseURL}/users/signout`, {
            method: 'DELETE',
            credentials: 'include', //need for cookies to be allowed to be sent cross-origin
        }).then(res => { res.json() });
    },
}

export const products = {
    index() {
        return fetch(`${baseURL}/products/`).then(res => res.json());
    },
    create(params) {
        return fetch(`${baseURL}/products/new`, {
            method: 'POST',
            credentials: 'include', //need for cookies to be allowed to be sent cross-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    }

} 
