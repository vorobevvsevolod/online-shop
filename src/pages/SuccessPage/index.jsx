import React from 'react';
import {useParams} from "react-router-dom";

const SuccessPage = () => {
    const params = useParams();
    return (
        <>
            <h1>Ваш заказ № {params.id} уже обрабатывается </h1>
            <p>Мы с вами свяжемся как можно скорей. Информацию о статусе заказа вы можете узнать в личном кабинете</p>
        </>
    );
};

export default SuccessPage;