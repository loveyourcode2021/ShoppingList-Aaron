import axios from "axios";
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

export const Products = {
    index() {
        return fetch(`${baseURL}/products`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json());
    },
    show(id) {
        return fetch(`${baseURL}/products/${id}`, {
            method: "GET",
            credentials: 'include'
        }).then(res => res.json())
    },
    create(params) {
        return fetch(`${baseURL}/products/new`, {
            method: 'POST',
            credentials: 'include', //need for cookies to be allowed to be sent cross-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: params
        }).then(res => res.json());
    },
    create_t(params) {
        return fetch(`${baseURL}/products/new`, {
            method: 'POST',
            credentials: 'include', //need for cookies to be allowed to be sent cross-origin
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: params
        }).then(res => res.json());
    },
    create_axios(params) {
        return axios.post(`${baseURL}/products/new`, params).then(res => res.json());
         // axios
    //     // .post("http://localhost:9900/api/v1/products/new", formData, {
    //     //   headers: {
    //     //     "Content-Type": "multipart/form-data",
    //     //     withCredentials: true
    //     //   },
    //     // })
    //     axios
    //     .post("http://localhost:9900/api/v1/products/new", formData)
    },

    edit(params, id) {
        return fetch(`${baseURL}/products/${id}/edit`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    },
    destory(id) {
        return fetch(`${baseURL}/products/${id}/delete`, {
            method: 'post',
            credentials: 'include', //need for cookies to be allowed to be sent cross-origin
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    }

} 


export const Reviews = {
    index(id){
        return fetch(`${baseURL}/products/${id}/reviews`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    },
    create(params,id,rid){
        return fetch(`${baseURL}/products/${id}/reviews`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    },
    edit(params,id,rid){
        return fetch(`${baseURL}/products/${id}/reviews/${rid}/delete`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    },
    delete(id,rid){
        return fetch(`${baseURL}/products/${id}/reviews/${rid}/delete`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
    },


}