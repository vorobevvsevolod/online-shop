import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from './OrderPage.module.scss'
import {getOrderProductsAxios, getProductByIDAxios} from "../../Axios";
import Item from "../../components/Cart/Item";
import {useSelector} from "react-redux";
const OrderPageProducts = () => {
    const params = useParams();
    const [products, setProducts] = React.useState([]);
    const tokenUser = useSelector(state => state.tokenUser.token)
    const navigate = useNavigate()
    React.useEffect(() =>{
        if(tokenUser){
            getOrderProductsAxios(params.id).then(response =>{
                const promises = response.map(product =>{
                    return getProductByIDAxios(product.product_id).then(res =>{
                        return {product: res, quantity: product.quantity}
                    })
                })
                Promise.all(promises).then(res =>{
                    setProducts(res)
                    console.log(res)
                })
            })
        } else navigate('/error')

    }, [tokenUser])
    return (
        <>
            {
                (products.length) ? <>
                    <h1 className='mb-25'>Заказ №{params.id}</h1>
                    <div>
                        {products.map(item =>
                            <Item key={item.product.id} {...item} orderProducts/>
                        )}
                    </div>
                    <div className={styles.totalContainer}>
                        <div className={styles.totalContainer_title}>Итого:</div>
                        <div className={styles.totalContainer_value}>{products.reduce((sum, obj) => (Number(obj.quantity * obj.product.price)) + sum, 0)}₽</div>
                    </div>
                </> : ''
            }
        </>
    );
};

export default OrderPageProducts;