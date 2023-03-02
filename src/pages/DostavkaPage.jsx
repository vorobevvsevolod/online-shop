import React from "react";

function DostavkaPage (){
    return(
        <>
            <h1>Доставка</h1>
            <p>Мы находимся по адресу: Санкт-Петербург, проспект Авиаконструкторов, 28</p>
            <p>Доставка осуществляется по почте россии. Цена доставки рассчитывается индивидуально, после оформления заказа мы свяжемся с вами чтобы обсудить стоимость и сроки доставки</p>
            <iframe className='map'
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A9723bee1d10eca17e18fc5e61e615968bcdb8da85d40a8bb95c459c0361552f2&amp;source=constructor"
                width="90%" height="500" frameBorder="0"></iframe>
        </>
    );
}

export default DostavkaPage;