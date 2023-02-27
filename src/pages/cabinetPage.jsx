import React from "react";
import OrangeButton from '../components/button/OrangeButton'
import {Link} from "react-router-dom";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {ClearTokenUser} from "../redux/Slices/TokenUserSlice";
import {clearCart} from "../redux/Slices/CartArraySlice";
import {clearFavoriteCartInCard} from "../redux/Slices/CardArraySlice";
import {clearFavorites} from "../redux/Slices/favoritesArraySlice";

function CabinetPage (){
    const favorites = useSelector((state) => state.favorites.favorites);
    const dispatch = useDispatch();
    const exitFromAccount = () => {
        dispatch(ClearTokenUser())
        dispatch(clearCart())
        dispatch(clearFavorites())
        dispatch(clearFavoriteCartInCard())
    }
    return(
        <>
            <h1 className='mb-25'>Кабинет</h1>
            <h2>Избранные</h2>
            <div className='CardCollection'>
                {
                    favorites.map(favorite =>
                        <Card key={favorite.id} {...favorite.product} favorited={true}/>
                    )
                }
            </div>
            <Link to='/' onClick={exitFromAccount}>
                <OrangeButton txt='Выйти из аккаунта'/>
            </Link>
        </>

    );
}

export default CabinetPage;