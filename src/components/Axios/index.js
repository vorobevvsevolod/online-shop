import axios from "axios";
const URLServer = 'http://192.168.31.11:3500';
const loginUserAxios = (email, password) =>{
    return axios.post(`${URLServer}/auth`, {"email": email, "password": password})
        .then(response => { return response})
        .catch(error => {
            return error
        });
}

const getCartAxios = (token) =>{
    return axios.get(`${URLServer}/cart`,{headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {return res})
        .catch(e => {return e})
}

const deleteItemByCartAxios = (token, id) =>{
    return axios.delete(`${URLServer}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` },
        data: { "cartItemId": `${id}` }
    })
        .then(res => {return res})
        .catch(e => {return e})
}

const addItemByCartAxios = (token, productId, quantity) =>{
    return axios.post(
        `${URLServer}/cart`,
        { "productId": productId, "quantity": quantity },
        { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then(res => { return res })
        .catch(e => { return e })
        .then(res => {return res})
        .catch(e => {return e})
}


export {
    loginUserAxios,
    getCartAxios,
    deleteItemByCartAxios,
    addItemByCartAxios
}