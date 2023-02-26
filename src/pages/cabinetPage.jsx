import React from "react";
import OrangeButton from '../components/button/OrangeButton'
import {Link} from "react-router-dom";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {ClearTokenUser} from "../redux/Slices/TokenUserSlice";
import {clearCartAndFavorites} from "../redux/Slices/CartArraySlice";
import {clearFavoriteCartInCard} from "../redux/Slices/CardArraySlice";

function CabinetPage (){
    const products = useSelector((state) => state.card.products);
    const dispatch = useDispatch();
    const exitFromAccount = () => {
        dispatch(ClearTokenUser())
        dispatch(clearCartAndFavorites())
        dispatch(clearFavoriteCartInCard())
    }
    return(
        <>
            <h1 className='mb-25'>Кабинет</h1>
            <h2>Избранные</h2>
            <div className='CardCollection'>
                {products.filter(item => item.favorited === true).map(card => <Card key={card.id} {...card}/>)}
            </div>
            <Link to='/' onClick={exitFromAccount}>
                <OrangeButton txt='Выйти из аккаунта'/>
            </Link>
        </>

    );
}

export default CabinetPage;