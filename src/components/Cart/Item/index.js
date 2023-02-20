import React from "react";
import styles from './item.module.scss'
export default function Item (props){
return(
    <div className={styles.cartItem}>
        <img className='mr-20' width={70} height={70} src={props.product.image_url} alt="Sneakers"/>
        <div className='mr-20'>
            <p className='mb-5'>{props.product.name}</p>
            <b>{props.product.price} руб.</b>
        </div>
        <button className={styles.removeBtn} alt="Remove" onClick={() => {props.onDelete(props.title)}}/>
    </div>
);
}