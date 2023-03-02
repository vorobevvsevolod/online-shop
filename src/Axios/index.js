import axios from "axios";
export const URLServer = 'http://192.168.31.241:3500';

//Пользователь
const loginUserAxios = (email, password) =>{
    return axios.post(`${URLServer}/auth`, {"email": email, "password": password})
        .then(response => { return response})
        .catch(error => {
            return error
        });
}

const registrationNewUserAxios = (user) =>{
    return axios.post(`${URLServer}/registration`, {"email": user.email, "username": user.username, "password": user.password})
        .then(response => { return response})
        .catch(error => {
            return error
        });
}

const changeEmailUserAxios = (email) =>{
    return axios.post(`${URLServer}/auth/email`, {"email": email})
        .then(response => { return response})
        .catch(error => {
            return error
        });
}
const changeUsernameUserAxios = (username) =>{
    return axios.post(`${URLServer}/auth/username`, {"username": username})
        .then(response => { return response})
        .catch(error => {
            return error
        });
}

const changePhoneUserAxios = (phone) =>{
    return axios.post(`${URLServer}/auth/phone`, {"phone": phone})
        .then(response => { return response})
        .catch(error => {
            return error
        });
}

const getOrderProductsAxios = (order_id) =>{
    return axios.get(`${URLServer}/order/products/${order_id}`)
        .then(response => {
            return response.data;
        })
        .catch(e => {return e})
}

const addOrderUser = (total_cost, products, adress, phone) =>{
    return axios.post(`${URLServer}/order`, {"total_cost": total_cost, "products": products, "adress": adress, "phone": phone})
        .then(response => { return response.data})
        .catch(error => {
            return error
        });
}


//Корзина
const deleteItemByCartAxios = (id) =>{
    return axios.delete(`${URLServer}/cart/${id}`)
        .then(res => {return res})
        .catch(e => {return e})
}

const addItemByCartAxios = (token, productId, quantity) =>{
    return axios.post(
        `${URLServer}/cart`,
        { "productId": productId, "quantity": quantity },
        { headers: { "Authorization": `Bearer ${token}` } }
        ).then(res => {return res})
        .catch(e => {return e})
}

const updateQuantityCartAxios = (id, quantity) =>{
    return axios.post(
        `${URLServer}/cart/quantity/${id}`,
        { "quantity": quantity },
    ).then(res => {return res})
        .catch(e => {return e})
}

const deleteCartUser = () =>{
    return axios.delete(`${URLServer}/delete/cart`)
        .then(res => {return res})
        .catch(e => {return e})
}



//Избранные
const addedCardInFavoritesAxios = (token, productId) =>{
    return axios.post(
        `${URLServer}/favorites`,
        { "productId": productId},
        ).then(res => {return res})
        .catch(e => {return e})
}

const deleteItemByFavoritesAxios = (token, id) =>{
    return axios.delete(`${URLServer}/favorites`, {
        data: { "favoritesItemId": `${id}` }
    })
        .then(res => {return res})
        .catch(e => {return e})
}



//Продукты
const getProductByIDAxios = async (id) =>{
    try {
        const res = await axios.get(`${URLServer}/product/${id}`);
        const response = await getProductImageAxios(id);
        if (response.code) {
            return 'error';
        } else {
            const resReviews = await getReviewsProductByID(id);
            res.data.result[0].reviews = resReviews.data.response;
            res.data.result[0].image_url = response;
            return res.data.result[0];
        }
    } catch (error) {
        return error;
    }
}

const getProductImageAxios = (id) =>{
    return axios.get(`${URLServer}/product/image/${id}`, {responseType: 'blob'})
        .then(response => {
            return URL.createObjectURL(response.data);
        })
        .catch(e => {return e})
}

const getReviewsProductByID = (id) =>{
    return axios.get(`${URLServer}/product/reviews/${id}`)
        .then(res => {return res})
        .catch(e => {return e})
}

const submitReviewsProduct = (id, reviews) =>{
    return axios.post(
        `${URLServer}/product/reviews/${id}`,
        {
            "author": reviews.author,
            "rating": reviews.rating,
            "text": reviews.text
        },
    ).then(res => {return res})
        .catch(e => {return e})
}





export {
    loginUserAxios,
    deleteItemByCartAxios,
    addItemByCartAxios,
    addedCardInFavoritesAxios,
    deleteItemByFavoritesAxios,
    getProductByIDAxios,
    updateQuantityCartAxios,
    submitReviewsProduct,
    getReviewsProductByID,
    changeEmailUserAxios,
    changeUsernameUserAxios,
    getOrderProductsAxios,
    addOrderUser,
    deleteCartUser,
    changePhoneUserAxios,
    registrationNewUserAxios
}