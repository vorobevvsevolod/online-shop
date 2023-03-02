import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {ClearTokenUser} from "../../redux/Slices/TokenUserSlice";
import {clearCart} from "../../redux/Slices/CartArraySlice";
import {clearFavoriteCartInCard} from "../../redux/Slices/CardArraySlice";
import {clearFavorites} from "../../redux/Slices/favoritesArraySlice";

import styles from './cabinetPage.module.scss'
import Card from "../../components/Card";
import OrangeButton from '../../components/button/OrangeButton'
import InputCabinet from "../../components/inputCabinet";
import {changeEmailUser, changePhone, changeUsername, clearInfoUser} from "../../redux/Slices/userInfoSlice";
import {changeEmailUserAxios, changePhoneUserAxios, changeUsernameUserAxios} from "../../Axios";

function CabinetPage (){
    const favorites = useSelector((state) => state.favorites.favorites);
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email, username, phone, status} = useSelector(state => state.userInfo)

    const exitFromAccount = () => {
        dispatch(ClearTokenUser())
        dispatch(clearCart())
        dispatch(clearFavorites())
        dispatch(clearFavoriteCartInCard())
        dispatch(clearInfoUser())
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
    return(
        <>
            <h2 style={{marginTop: '0'}}>Личные данные</h2>
            {status === 'succeeded' &&
                <>
                    <InputCabinet typeInput='text' value={username} title='Имя' onChangeUserInfo={changeUserInfo}/>
                    <InputCabinet typeInput='email' value={email} title='Эл.почта'  onChangeUserInfo={changeUserInfo}/>
                    <InputCabinet typeInput='tel' value={phone} title='Номер телефона'  onChangeUserInfo={changeUserInfo}/>
                    {(phone === '') && <i> Нужно указать номер телефона</i>}
                </>
            }

            <h2 className='mt-35'>Избранные</h2>
            <div className={styles.CardCollection}>
                {
                    (favorites.length)
                        ?
                    favorites.map(favorite =>
                        <Card key={favorite.id} {...favorite.product} favorited={true}/>
                    )
                        :
                        <div className={styles.notHaveFavorites_Container}>
                            <img src="/img/emodji_grustno.png" alt=""/>
                            <p>Избранных нет :(</p>
                        </div>
                }
            </div>
            <h2 className='mt-35'>Заказы</h2>
            <div className='mb-35 d-flex'>
                {
                    (orders.length)
                        ?
                        <table className={styles.table}>
                            <thead className={styles.table_header}>
                            <tr className={styles.table_row}>
                                <th className={styles.table_col}>№</th>
                                <th className={styles.table_col}>Время заказа</th>
                                <th className={styles.table_col}>Сумма</th>
                                <th className={styles.table_col}>Статус</th>
                                <th className={styles.table_col}>Доставка</th>
                                <th className={styles.table_col}>Товары</th>
                            </tr>
                            </thead>
                            <tbody>
                                {orders.map(order =>(
                                    <tr className={styles.table_row} key={order.order_id}>
                                        <td className={styles.table_col} >{order.order_id}</td>
                                        <td className={styles.table_col} >{order.date}</td>
                                        <td className={styles.table_col} >{order.total_cost} ₽</td>
                                        <td className={styles.table_col} >{order.status}</td>
                                        <td style={{fontSize: '13px'}} className={styles.table_col} >{order.adress}</td>
                                        <td className={styles.table_col} ><span onClick={() => navigate(`/order/${order.order_id}`)}>Посмотреть</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <div className={styles.notHaveFavorites_Container} >
                            <img src="/img/emodji_pechal.png" alt=""/>
                            <p>У вас нет заказов :)</p>
                        </div>
                }
            </div>

            <Link to='/' onClick={exitFromAccount} >
                <OrangeButton txt='Выйти из аккаунта'/>
            </Link>
        </>

    );
}

export default CabinetPage;