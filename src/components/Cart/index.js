import React from "react";
import Item from "./Item/";
import OrangeButton from "../button/OrangeButton";
import styles from './cart.module.scss'
import { setShowCart} from "../../redux/Slices/CartArraySlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function Cart(){
    const [totalPrice, setTotalPrice] = React.useState(0);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    const showCart = useSelector(state => state.cart.showCart);const navigate = useNavigate();

    React.useEffect(()=>{
        setTotalPrice(cart.reduce((sum, obj) => (Number(obj.product.price) * obj.quantity) + sum, 0))
    },[cart])

    const redirectOrder = () =>{
        dispatch(setShowCart())
        navigate('/order')
    }


    return(
        <div className={`${styles.overlay} ${ showCart ? styles.overlay_hidden : ''}`}>
            <div className={styles.drawer}>
                <h2 className='d-flex justify-between'>Корзина
                    <img src="/img/close-x.svg" alt="close" onClick={() =>dispatch(setShowCart())}/>
                </h2>
                <div className={styles.items}>
                    {
                        cart.map(item =>(
                            <Item key={item.product.id} product={item.product}/>
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

                        <OrangeButton txt={"Оформить заказ"} width='100%' direction={'right'} onClick={redirectOrder}/>
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

