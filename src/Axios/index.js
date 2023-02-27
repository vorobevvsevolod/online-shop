import axios from "axios";
export const URLServer = 'http://192.168.31.241:3500';
const loginUserAxios = (email, password) =>{
    return axios.post(`${URLServer}/auth`, {"email": email, "password": password})
        .then(response => { return response})
        .catch(error => {
            return error
        });
}

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

const addedCardInFavoritesAxios = (token, productId) =>{
    return axios.post(
        `${URLServer}/favorites`,
        { "productId": productId},
        { headers: { "Authorization": `Bearer ${token}` } }
        ).then(res => {return res})
        .catch(e => {return e})
}

const deleteItemByFavoritesAxios = (token, id) =>{
    return axios.delete(`${URLServer}/favorites`, {
        headers: { 'Authorization': `Bearer ${token}` },
        data: { "favoritesItemId": `${id}` }
    })
        .then(res => {return res})
        .catch(e => {return e})
}

const getProductByIDAxios = async (id) =>{
    try {
        const res = await axios.get(`${URLServer}/product/${id}`);
        const response = await getProductImageAxios(id);
        if (response.code) {
            return 'error';
        } else {
            const resReviews = await getReviewsProductByID(id);
            const rating = await getReviewsProductAVGById(id)
            res.data.result[0].reviews = resReviews.data.response;
            res.data.result[0].image_url = response;

            res.data.result[0].rating = Number(rating.data.response).toFixed(1);
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

const getReviewsProductAVGById = (id) =>{
    return axios.get(`${URLServer}/product/reviews/avg/${id}`)
        .then(res => {return res})
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
    getReviewsProductAVGById,
    getReviewsProductByID
}