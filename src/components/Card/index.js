import React, {useContext} from 'react';
import styles from './Card.module.scss'
import {CartContext, TokenUserContext} from "../../App";
import {addItemByCartAxios, deleteItemByCartAxios} from "../Axios";
export default function Card (props){
    const { tokenUser } = useContext(TokenUserContext)
    const {cartState, setCartState} = useContext(CartContext)
    const [addedInFavorites, setAddedInFavorites] = React.useState(false);
    const [addedInCart, setAddedInCart] = React.useState(false);
    const onClickAddCard = (productId) =>{
        setAddedInCart(!addedInCart)
        if(!addedInCart){
            if(tokenUser){
                addItemByCartAxios(tokenUser, productId, 1).then(res =>{
                    if(res.response){
                        console.log(res.response.data)
                    }else{
                        const product = {
                            id: res.data,
                            product: props,
                            quantity: 1
                        }
                        setCartState({...cartState, cartArray: [...cartState.cartArray, product]});
                    }
                })
            }else setCartState({...cartState, cartArray: [...cartState.cartArray, {product: props, quantity: 1 }]});
        }else{
            if(tokenUser){
                cartState.cartArray.find(item => {
                    if(item.product.id === productId){
                        deleteItemByCartAxios(tokenUser, item.id).then(res =>{
                            if(res.response){
                                alert(res.response.data)
                            }else{
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
                })
            }else {
                cartState.cartArray.find(item => {
                    if(item.product.id === productId){
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
        }
    }
    const onClickFavorites = ()=>{
        setAddedInFavorites(!addedInFavorites)
    }
    React.useEffect(()=>{
        setAddedInCart(true)
        let check = false;
        for(let i in cartState.cartArray)
            if(props.name === cartState.cartArray[i].product.name )check = true;
        if(!check) setAddedInCart(false);
    },[cartState.cartArray])
    return(
        <div className={styles.wrapperCard}>
            <div className={styles.card}>
                <div className={styles.favorite}>
                    <button className={(addedInFavorites) ? styles.buttonFavorites : styles.buttonUnFavorites } onClick={() => onClickFavorites(props.id)}>
                        <svg fill="#b1b1b1" width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.37 2.56a3.92 3.92 0 0 0-3-1 4.1 4.1 0 0 0-1.82.52A9.18 9.18 0 0 0 8 3.06a9.35 9.35 0 0 0-1.49-1 3.85 3.85 0 0 0-1.77-.52A4.07 4.07 0 0 0 1.63 2.6 4 4 0 0 0 .35 5.52a3.83 3.83 0 0 0 .88 2.33 33.87 33.87 0 0 0 5.7 6.2l.39-.49-.38.49a1.67 1.67 0 0 0 1.06.42 1.71 1.71 0 0 0 1.08-.42 37.42 37.42 0 0 0 6.06-6.73 3.5 3.5 0 0 0 .47-1.74 4 4 0 0 0-1.24-3.02zm-.26 4.06a37.1 37.1 0 0 1-5.81 6.46.56.56 0 0 1-.28.13.51.51 0 0 1-.29-.14 32.77 32.77 0 0 1-5.49-5.94 2.74 2.74 0 0 1-.64-1.61 2.75 2.75 0 0 1 .88-2 2.79 2.79 0 0 1 2.16-.72h.1a2.73 2.73 0 0 1 1.19.38A10.23 10.23 0 0 1 7.24 4l.76.63.76-.63a9 9 0 0 1 1.34-.86 2.91 2.91 0 0 1 1.26-.39h.1a2.68 2.68 0 0 1 2.07.68 2.78 2.78 0 0 1 .87 2 2.18 2.18 0 0 1-.29 1.19z"/></svg>
                    </button>
                </div>
                <img width={155} height={130} src={props.image_url} alt="skeakers"/>
                <h5>{props.name}</h5>
                <div className='d-flex justify-between align-center'>
                    <div className='d-flex flex-column'>
                        <span>Цена:</span>
                        <b>{props.price} руб.</b>
                    </div>
                    <button className={ (addedInCart ) ? styles.buttonCardAdded : styles.buttonCard } onClick={() => onClickAddCard(props.id)} />
                </div>
            </div>
        </div>

    );
}
