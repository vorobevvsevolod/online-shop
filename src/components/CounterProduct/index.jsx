import React from 'react';
import  styles from './CounterProduct.module.scss'
import {deleteItemByCartAxios, updateQuantityCartAxios} from "../../Axios";
import {deleteItemByCart, updateQuantityCart} from "../../redux/Slices/CartArraySlice";
import {useDispatch, useSelector} from "react-redux";
import {setAddedCartInCard} from "../../redux/Slices/CardArraySlice";
const CounterProduct = (props) => {
    const tokenUser = useSelector(state => state.tokenUser.token)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = React.useState(props.quantity)

    const plusQuantity = () =>{
        setQuantity(prev => prev + 1)
    }
    React.useEffect(() =>{
        if(quantity)
            if(tokenUser){
                updateQuantityCartAxios(props.id, quantity).then(res =>{
                    if(res.data){
                    }else alert("Ошибка изменения количества товаров")
                })
            }
        dispatch(updateQuantityCart({product_id: props.id, quantity: quantity}))
    }, [quantity])

    const MinusQuantity = () =>{
        if(quantity !== 1)
            setQuantity(prev => prev - 1)
        else DeleteItem()
    }
    const DeleteItem = () =>{
        if(tokenUser){
            deleteItemByCartAxios(props.id).then(res =>{
                if(res.response){
                    alert(res.response.data)
                }
            })
        }
        dispatch(deleteItemByCart(props.id))
        dispatch(setAddedCartInCard({id: props.id, flag: false}))
    }
    return (
        <div className={styles.containerBtn}>
            <button className={styles.removeBtn} alt="Remove" onClick={MinusQuantity}/>
            <span><input type="text" value={quantity} onChange={event => setQuantity(event.target.value)}/></span>
            <button className={styles.addBtn} alt="Remove" onClick={plusQuantity}/>
        </div>
    );
};

export default CounterProduct;