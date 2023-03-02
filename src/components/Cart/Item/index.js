import React from "react";
import styles from './item.module.scss'
import CounterProduct from "../../CounterProduct";
import {useNavigate} from "react-router-dom";
import {deleteItemByCart, setShowCart} from "../../../redux/Slices/CartArraySlice";
import {useDispatch, useSelector} from "react-redux";
import {deleteItemByCartAxios} from "../../../Axios";
import {setAddedCartInCard} from "../../../redux/Slices/CardArraySlice";
export default function Item (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenUser = useSelector(state => state.tokenUser.token)
    const clickItem = () =>{
        navigate(`/product/${props.product.id}`)
        dispatch(setShowCart())
    }
    const DeleteItem = () =>{
        if(tokenUser){
            deleteItemByCartAxios(props.product.id).then(res =>{
                if(res.response){
                    alert(res.response.data)
                }
            })
        }
        dispatch(deleteItemByCart(props.product.id))
        dispatch(setAddedCartInCard({id: props.product.id, flag: false}))
    }
    if(props.orderProducts)
        return (
        <div className={styles.cartItem}>
            <div className={styles.container}>
                <img  className='mr-20 cu-p' width={80} height={80} src={props.product.image_url} alt="Sneakers" onClick={() => navigate(`/product/${props.product.id}`)}/>
                <div >
                    <p style={{width: '100%'}}>{props.product.name}</p>
                    <p className={styles.artical}><span>артикул:</span>{props.product.id}</p>
                </div>
            </div>
            <div className={styles.orderTotalProducts}>
                <div className={styles.orderTotalProducts_price}>{props.product.price} ₽</div>
                <div className={styles.priceTotal}><span>Кол-во:</span>{props.quantity}</div>
                <div className={styles.priceTotal}><span>Итого:</span>{props.product.price * props.quantity} ₽</div>
            </div>
        </div>
        )

    if(props.order)
        return (
            <div className={styles.cartItem}>
                <div className={styles.container}>
                    <img  className='mr-20 cu-p' width={80} height={80} src={props.product.image_url} alt="Sneakers" onClick={() => navigate(`/product/${props.product.id}`)}/>
                    <div >
                        <p style={{width: '100%'}}>{props.product.name}</p>
                        <p className={styles.artical}><span>артикул:</span>{props.product.id}</p>
                    </div>
                    <div className={styles.order_counter}>
                        <CounterProduct id={props.product.id}/>
                    </div>

                </div>
                <div className={styles.orderTotalProducts}>
                    <div className={styles.orderTotalProducts_price}>{props.product.price} ₽</div>
                    <div className={styles.priceTotal}><span>Итого:</span>{props.product.price * props.quantity} ₽</div>


                </div>
                <img className={styles.order_close} width={12} height={12} src="/img/close-x.svg" alt="close" onClick={DeleteItem}/>
            </div>
        )
return(
    <div className={styles.cartItem}>
        <div className={styles.container}>
            <img  className='mr-20 cu-p' width={80} height={80} src={props.product.image_url} alt="Sneakers" onClick={clickItem}/>
            <div className='mr-20'>
                <p className='mb-5'>{props.product.name}</p>
                <p className={styles.artical}><span>артикул:</span>{props.product.id}</p>
            </div>
        </div>
        <div className={styles.containerCounter}>
            <b className={styles.price}>{props.product.price} ₽</b>
            <CounterProduct id={props.product.id}/>
        </div>
        <img className={styles.close} width={12} height={12} src="/img/close-x.svg" alt="close" onClick={DeleteItem}/>
    </div>
);
}