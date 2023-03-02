import React from 'react';
import {
    addOrderUser,
    changeEmailUserAxios,
    changePhoneUserAxios,
    changeUsernameUserAxios,
    deleteCartUser
} from "../../Axios";
import {fetchOrders} from "../../redux/Slices/OrdersSlice";
import {clearCart} from "../../redux/Slices/CartArraySlice";
import {clearCartInCard, updateCountProduct} from "../../redux/Slices/CardArraySlice";
import {useDispatch, useSelector} from "react-redux";
import Item from "../../components/Cart/Item";
import InputCabinet from "../../components/inputCabinet";
import InputDostavka from "../../components/InputDostavka";
import OrangeButton from "../../components/button/OrangeButton";
import {changeEmailUser, changePhone, changeUsername} from "../../redux/Slices/userInfoSlice";
import {useNavigate} from "react-router-dom";

const OrderPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    const {email, username, phone} = useSelector(state => state.userInfo)
    const [phoneNoAuth, setPhoneNoAuth] = React.useState('')
    const [dostavka, setDostavka] = React.useState({
        streets:'',
        house: '',
        corpus:'',
        flat:''
    })
    const navigate = useNavigate()
    const tokenUser = useSelector(state => state.tokenUser.token)
    const submitOrder = () =>{
        if(dostavka.streets !== '' && dostavka.house !== '' && dostavka.corpus !== '' && dostavka.flat !== ''){
            //if(phoneNoAuth !== '' && email === '') alert(); else alert('Необходимо указать номер телефона иначе мы не сможем с вами связаться!!!')
            if(phone !== '' || phoneNoAuth !== ''){
                let products = [];
                let total_cost = 0;
                let adress = `ул. ${dostavka.streets}, дом ${dostavka.house}, к${dostavka.corpus}, кв. ${dostavka.flat}`;
                cart.map(item =>{
                    products.push({
                        id: item.product.id,
                        quantity: item.quantity
                    })
                    total_cost += (Number(item.quantity) * Number(item.product.price))
                })

                addOrderUser(total_cost, products, adress, (email === '' && phoneNoAuth !== '') ? phoneNoAuth.substring(2) : '').then(res =>{
                    if(res.result) {
                        if(tokenUser){
                            dispatch(fetchOrders())
                            deleteCartUser().then(response =>{})
                        }
                        dispatch(updateCountProduct(products))
                        dispatch(clearCart())
                        dispatch(clearCartInCard())
                        if(phoneNoAuth) navigate(`/success/${res.id}-${phoneNoAuth.substring(2)}`); else navigate(`/success/${res.id}`)
                    }
                })
            }else alert('Необходимо указать номер телефона иначе мы не сможем с вами связаться!!!')

        }else alert('Вы не заполнили адрес доставки')
    }
    const changeValueDostavka = (value, type) =>{
        switch (type){
            case 'streets':
                setDostavka(prev => ({...prev, streets: value}))
                break;
            case 'house':
                setDostavka(prev => ({...prev, house: value}))
                break;
            case 'corpus':
                setDostavka(prev => ({...prev, corpus: value}))
                break;
            case 'flat':
                setDostavka(prev => ({...prev, flat: value}))
                break;
        }
    }
    const changeUserInfo = (value, type) =>{
        switch (type){
            case 'Имя':
                dispatch(changeUsername(value))
                changeUsernameUserAxios(value).then(res =>{
                    if(!res.data.result)
                        alert('Ошибка! Не удалось изменить имя')
                })
                break;

            case 'Эл.почта':
                dispatch(changeEmailUser(value))
                changeEmailUserAxios(value).then(res =>{
                    if(!res.data.result)
                        alert('Ошибка! Не удалось изменить имя')
                })
                break;

            case 'Номер телефона':
                dispatch(changePhone(value))
                changePhoneUserAxios(value).then(res =>{
                    if(!res.data.result)
                        alert('Ошибка! Не удалось изменить имя')
                })
                break;
        }
    }

    return (
        <div>
            <h1 className='mb-25'>Ваш заказ:</h1>
            {cart.map(item =>
                <Item key={item.product.id} {...item} order/>
            )}
            <div style={{fontWeight: 'bold'}}><span style={{color: '#323232', fontSize: '18px', marginRight: '10px', fontWeight: 'normal'}}>Количество товаров:</span>{cart.reduce((sum, obj) => obj.quantity + sum, 0)}</div>
            <h2 className='mt-40'>Контакты</h2>
            {   (email && username) ?
                <>
                    <InputCabinet typeInput='text' value={username} title='Имя' onChangeUserInfo={changeUserInfo}/>
                    <InputCabinet typeInput='email' value={email} title='Эл.почта'  onChangeUserInfo={changeUserInfo}/>
                    <InputCabinet typeInput='tel' value={phone} title='Номер телефона'  onChangeUserInfo={changeUserInfo}/>
                    {(phone === '') && <i> Нужно указать номер телефона</i>}
                </> : <InputDostavka title='Номер телефона' onChange={value => setPhoneNoAuth(value)}/>
            }

            <h2 className='mt-40'>Доставка</h2>
            <div className='d-flex mb-25'>
                <InputDostavka width='300px' title='Улица' type='streets' onChange={changeValueDostavka}/>
                <InputDostavka textAlign='center' width='60px' title='Дом' type='house' onChange={changeValueDostavka}/>
                <InputDostavka textAlign='center' width='60px' title='Корпус' type='corpus' onChange={changeValueDostavka}/>
                <InputDostavka textAlign='center' width='70px' title='Квартира' type='flat' onChange={changeValueDostavka}/>
            </div>
            <p>Стоимость доставки уточняется у оператора</p>
            <h2>Итого: <span>{cart.reduce((sum, obj) => (Number(obj.quantity * obj.product.price)) + sum, 0)}₽ + доставка</span></h2>
            <OrangeButton txt='Оформит заказ' onClick={submitOrder}/>

        </div>
    );
};

export default OrderPage;