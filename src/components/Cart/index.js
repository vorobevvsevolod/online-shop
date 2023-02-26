import React from "react";
import Item from "./Item/";
import OrangeButton from "../button/OrangeButton";
import styles from './cart.module.scss'
import { setShowCart} from "../../redux/Slices/CartArraySlice";
import {useDispatch, useSelector} from "react-redux";

export default function Cart(){
    const [totalPrice, setTotalPrice] = React.useState(0);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartFavorites.cart)
    const card = useSelector(state => state.card.products)
    React.useEffect(()=>{
        let count = 0;
        cart.map(item =>{
            const product = card.find(product => product.id === item.product_id)
            count += (Number(product.price) * item.quantity)
        })
        setTotalPrice(count)
    },[cart])


    return(
        <div className="overlay">
            <div className={styles.drawer}>
                <h2 className='d-flex justify-between'>Корзина
                    <img src="/img/close-x.svg" alt="close" onClick={() =>dispatch(setShowCart())}/>
                </h2>
                <div className={styles.items}>
                    {
                        cart.map(item =>(
                            <Item key={item.product_id} product={card.find(product => product.id === item.product_id)} quantity={item.quantity}/>
                        ))
                    }
                </div>
                {(cart.length)
                    ?
                    <div className={styles.CardTotalBlock}>
                        <div className={styles.TotalCartSum}>
                            <span>Итого:</span>
                            <div></div>
                            <b>{totalPrice} руб.</b>
                        </div>
                        <div className={styles.TotalCartSum}>
                            <span>Доставка:</span>
                            <div></div>
                            <b>500 руб.</b>
                        </div>
                        <OrangeButton txt={"Оформить заказ"} direction={'right'}/>
                    </div>
                    :
                    <div className={styles.cartEmpty}>
                        <img src="/img/cartEmpty.png" width={120} height={120} alt=""/>
                        <h2>Корзина пуста</h2>
                        <p>Добавьте хотя бы одни товар, чтобы сделать заказ.</p>
                        <OrangeButton txt={'Вернуться назад'} direction={'left'} onClick={() =>dispatch(setShowCart())}/>
                    </div>
                }
            </div>
        </div>
    );
}

