import React from "react";
import styles from './item.module.scss'
import CounterProduct from "../../CounterProduct";
import {useNavigate} from "react-router-dom";
import {setShowCart} from "../../../redux/Slices/CartArraySlice";
import {useDispatch} from "react-redux";
export default function Item (props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickItem = () =>{
        navigate(`/product/${props.product.id}`)
        dispatch(setShowCart())
    }
return(
    <div className={styles.cartItem}>
        <div className={styles.container}>
            <img  className='mr-20 cu-p' width={80} height={70} src={props.product.image_url} alt="Sneakers" onClick={clickItem}/>
            <div className='mr-20'>
                <p className='mb-5'>{props.product.name}</p>
                <b>{props.product.price} руб.</b>
            </div>
        </div>
        <CounterProduct id={props.product.id}/>
    </div>
);
}