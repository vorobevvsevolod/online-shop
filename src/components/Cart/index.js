import React, {useContext} from "react";
import { CartContext, TokenUserContext} from "../../App";
import Item from "./Item/";
import GreenButton from "../button/OrangeButton";
import styles from './cart.module.scss'
import {deleteItemByCartAxios} from "../Axios";

export default function Cart(){
    const {cartState, setCartState} = useContext(CartContext)
    const [totalPrice, setTotalPrice] = React.useState(0);
    const { tokenUser } = useContext(TokenUserContext)
    React.useEffect(()=>{
        let count =0;
        cartState.cartArray.map(item =>(
            count += Number(item.product.price)
        ))
        setTotalPrice(count)
    },[cartState.cartArray])
    const DeleteItem = (id) =>{
        if(tokenUser){
            deleteItemByCartAxios(tokenUser, id).then(res =>{
                if(res.response){
                    alert(res.response.data)
                }else{
                    let mass = [...cartState.cartArray];
                    for (let i in mass) {
                        if (mass[i].id === id) {
                            mass.splice(i, 1);
                            break;
                        }
                    }
                    setCartState({...cartState, cartArray: mass});
                }
            })
        }else cartState.cartArray.find(item => {
                if(item.id === id){
                    let mass = [...cartState.cartArray];
                    for (let i in mass) {
                        if (mass[i].id === item.id) {
                            mass.splice(i, 1);
                            break;
                        }
                    }
                    setCartState({...cartState, cartArray: mass});
                }
            })
    }

    return(
            <div className={styles.drawer}>
                <h2 className='d-flex justify-between'>Корзина
                    <img src="/img/close-x.svg" alt="close" onClick={() =>setCartState({...cartState, show: !cartState.show })}/>
                </h2>
                <div className={styles.items}>
                    {
                        cartState.cartArray.map(card =>(
                            <Item key={card.id} product={card.product} quantity={card.quantity} onDelete={() => DeleteItem(card.id)}/>
                        ))
                    }
                </div>
                {(totalPrice !== 0)
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
                    <GreenButton txt={"Оформить заказ"} direction={'right'}/>
                </div>
                    :
                    <div className={styles.cartEmpty}>
                        <img src="/img/cartEmpty.png" width={120} height={120} alt=""/>
                        <h2>Корзина пуста</h2>
                        <p>Добавьте хотя бы одни товар, чтобы сделать заказ.</p>
                        <GreenButton txt={'Вернуться назад'} direction={'left'} onClick={() =>setCartState({...cartState, show: !cartState.show })}/>
                    </div>
                }
            </div>
    );
}

