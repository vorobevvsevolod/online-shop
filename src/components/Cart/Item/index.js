import React from "react";
import styles from './item.module.scss'
import CounterProduct from "../../CounterProduct";
export default function Item (props){


return(

    <div className={styles.cartItem}>
        <div className={styles.container}>
            <img className='mr-20' width={80} height={70} src={props.product.image_url} alt="Sneakers"/>
            <div className='mr-20'>
                <p className='mb-5'>{props.product.name}</p>
                <b>{props.product.price} руб.</b>
            </div>
        </div>
        <CounterProduct quantity={props.quantity} id={props.product.id}/>
    </div>
);
}