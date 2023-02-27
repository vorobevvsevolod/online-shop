import React from 'react';
import styles from './Card.module.scss'
import {
    addItemByCartAxios,
    deleteItemByCartAxios,
    addedCardInFavoritesAxios,
    deleteItemByFavoritesAxios, submitReviewsProduct
} from "../../Axios";
import {useDispatch, useSelector} from "react-redux";
import {setAddedCartInCard, setFavoritedCard, updateReviewsRatingProduct} from "../../redux/Slices/CardArraySlice";
import {addItemInCart, deleteItemByCart} from "../../redux/Slices/CartArraySlice";
import {useNavigate} from 'react-router-dom'
import OrangeButton from "../button/OrangeButton";
import CounterProduct from "../CounterProduct";
import {addItemInFavorites, deleteItemByFavorites} from "../../redux/Slices/favoritesArraySlice";
export default function Card (props){
    const [addedInCart, setAddedInCart] = React.useState(props.addedCart);
    const [addedInFavorites, setAddedInFavorites] = React.useState(props.favorited);
    const [reviews, setReviews] = React.useState([])
    const [showWriteReviews, setShowWriteReviews] = React.useState(false)
    const [writeReviews, setWriteReviews] = React.useState({
        author: '',
        text: '',
        rating: 5
    })
    const dispatch = useDispatch();
    const tokenUser = useSelector(state => state.tokenUser.token)
    const navigate = useNavigate();
    const onClickAddCard = (productId) => {
        setAddedInCart(!addedInCart)
        if (!addedInCart) {
            dispatch(addItemInCart({product: props, quantity: 1}))
            dispatch(setAddedCartInCard({id: productId, flag: true}))
            if (tokenUser) {
                addItemByCartAxios(tokenUser, productId, 1).then(res => {
                    if (res.response) { console.log(res.response.data) }
                })
            }
        }else{
            dispatch(deleteItemByCart(productId))
            dispatch(setAddedCartInCard({id: productId, flag: false}))
            if(tokenUser){
                deleteItemByCartAxios(productId).then(res => {
                    if (res.response) { alert(res.response.data)  }})
            }
        }
    }
    const onClickFavorites = (productId)=>{
        if(tokenUser){
            setAddedInFavorites(!addedInFavorites);
            if(!addedInFavorites){
                dispatch(setFavoritedCard({id: productId, flag: true}))
                dispatch(addItemInFavorites({product: props}))
                    addedCardInFavoritesAxios(tokenUser, productId, 1).then(res =>{
                        if(res.response){
                            console.log(res.response.data)
                        }
                    })
            }else{
                dispatch(setFavoritedCard({id: productId, flag: false}))
                dispatch(deleteItemByFavorites(productId))
                deleteItemByFavoritesAxios(tokenUser, productId).then(res =>{
                    if(res.response){
                        alert(res.response.data)
                    }
                })
            }
        }

    }

    React.useEffect(() => {
        setAddedInCart(props.addedCart || false);
        setAddedInFavorites(props.favorited || false);
        setReviews(props.reviews || [])
    }, [props]);

    const ratingStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<img key={i} width={15} height={15} src="/img/star.svg" alt="" />);
        }
        return stars;
    };

    const submitReviews = () =>{
        if(writeReviews.text !== '' && writeReviews.author !== '' &&  writeReviews.rating !== ''){
            submitReviewsProduct(props.id, writeReviews).then(res =>{
                if(res.data.response){
                    setShowWriteReviews(false)
                    dispatch(updateReviewsRatingProduct({id: props.id, reviews: writeReviews}))
                }
            })
        }else alert("Заполните все поля")
    }

    {
        if(props.fullProduct)
        return (
            <div className={styles.fullProduct}>
                <h1>{props.name}</h1>
                <div className={styles.content}>
                    <img className='cu-p'  src={props.image_url} alt="skeakers" onClick={() => navigate(`/product/${props.id}`)}/>
                    <div className={styles.content_favorites}>
                        <button className={(addedInFavorites) ? styles.buttonFavorites : styles.buttonUnFavorites } onClick={() => onClickFavorites(props.id)}>
                            <svg fill="#b1b1b1" width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.37 2.56a3.92 3.92 0 0 0-3-1 4.1 4.1 0 0 0-1.82.52A9.18 9.18 0 0 0 8 3.06a9.35 9.35 0 0 0-1.49-1 3.85 3.85 0 0 0-1.77-.52A4.07 4.07 0 0 0 1.63 2.6 4 4 0 0 0 .35 5.52a3.83 3.83 0 0 0 .88 2.33 33.87 33.87 0 0 0 5.7 6.2l.39-.49-.38.49a1.67 1.67 0 0 0 1.06.42 1.71 1.71 0 0 0 1.08-.42 37.42 37.42 0 0 0 6.06-6.73 3.5 3.5 0 0 0 .47-1.74 4 4 0 0 0-1.24-3.02zm-.26 4.06a37.1 37.1 0 0 1-5.81 6.46.56.56 0 0 1-.28.13.51.51 0 0 1-.29-.14 32.77 32.77 0 0 1-5.49-5.94 2.74 2.74 0 0 1-.64-1.61 2.75 2.75 0 0 1 .88-2 2.79 2.79 0 0 1 2.16-.72h.1a2.73 2.73 0 0 1 1.19.38A10.23 10.23 0 0 1 7.24 4l.76.63.76-.63a9 9 0 0 1 1.34-.86 2.91 2.91 0 0 1 1.26-.39h.1a2.68 2.68 0 0 1 2.07.68 2.78 2.78 0 0 1 .87 2 2.18 2.18 0 0 1-.29 1.19z"/></svg>
                        </button>
                    </div>
                    <div className={styles.content_priceContainer}>
                        <div className={styles.container}>
                            <div className={styles.price}><span>Цена: </span>{props.price}</div>
                            {
                                (addedInCart)
                                    ?
                                    <div className={styles.counter}>
                                        <CounterProduct id={props.id}/>
                                    </div>
                                    :
                                    <button className={ (addedInCart) ? styles.buttonCardAdded : styles.buttonCard } onClick={() => onClickAddCard(props.id)} />
                            }
                        </div>
                        <p className={styles.count}>В наличие: <b>{props.count}</b></p>
                        <div className='mt-40'>
                            <h3>Описание</h3>
                            {props.description}
                        </div>
                    </div>


                </div>


                <h3 className='mt-25'>Отзывы</h3>
                {
                    (showWriteReviews)
                    ?
                        <div className={styles.reviewsWriteWrapper}>
                            <div className={styles.GeneralContent}><span>Ваше имя:</span><input type="text" required="required" value={writeReviews.author} onChange={event => setWriteReviews(prev => ({...prev, author: event.target.value}))}/></div>
                            <div className={styles.GeneralContent}><span>Оценка:</span><input type="text" required="required" value={writeReviews.rating} onChange={event => setWriteReviews(prev => ({...prev, rating: event.target.value}))}/></div>
                            <div className={styles.textarea}>
                                <span>Ваш отзыв:</span>
                                <textarea required="required" cols="30" rows="10" onChange={event => setWriteReviews(prev => ({...prev, text: event.target.value}))}></textarea>
                            </div>
                            <div onClick={submitReviews}>
                                <OrangeButton txt='Отправить'/>
                            </div>
                        </div>
                        : <OrangeButton key={1} txt='Написать отзыв' onClick={() => setShowWriteReviews(!showWriteReviews)}/>
                }


                {
                    (reviews.length) ?
                    <>

                        <div className={styles.reviewsWrapper}>
                            {
                            reviews.map(item => (
                                <div className={styles.reviewsItem} key={item.text}>
                                <div className={styles.avtor}> <span>Автор:</span>{item.author}</div>
                                <div className='d-flex justify-between'>
                                    <div className={styles.rating}>{ratingStars(item.rating)}</div>
                                    <div className={styles.time}>{item.time.split('T')[0]}</div>
                                </div>
                                <i>{item.text}</i>
                                </div>
                            ))
                            }
                        </div>

                    </> : <p>На данный товар нет отзывов</p>
                }

            </div>
        )

    }
        return(
            <div className={styles.wrapperCard}>
                <div className={styles.card}>
                    <div className={styles.favorite}>
                        <button className={(addedInFavorites) ? styles.buttonFavorites : styles.buttonUnFavorites } onClick={() => onClickFavorites(props.id)}>
                            <svg fill="#b1b1b1" width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.37 2.56a3.92 3.92 0 0 0-3-1 4.1 4.1 0 0 0-1.82.52A9.18 9.18 0 0 0 8 3.06a9.35 9.35 0 0 0-1.49-1 3.85 3.85 0 0 0-1.77-.52A4.07 4.07 0 0 0 1.63 2.6 4 4 0 0 0 .35 5.52a3.83 3.83 0 0 0 .88 2.33 33.87 33.87 0 0 0 5.7 6.2l.39-.49-.38.49a1.67 1.67 0 0 0 1.06.42 1.71 1.71 0 0 0 1.08-.42 37.42 37.42 0 0 0 6.06-6.73 3.5 3.5 0 0 0 .47-1.74 4 4 0 0 0-1.24-3.02zm-.26 4.06a37.1 37.1 0 0 1-5.81 6.46.56.56 0 0 1-.28.13.51.51 0 0 1-.29-.14 32.77 32.77 0 0 1-5.49-5.94 2.74 2.74 0 0 1-.64-1.61 2.75 2.75 0 0 1 .88-2 2.79 2.79 0 0 1 2.16-.72h.1a2.73 2.73 0 0 1 1.19.38A10.23 10.23 0 0 1 7.24 4l.76.63.76-.63a9 9 0 0 1 1.34-.86 2.91 2.91 0 0 1 1.26-.39h.1a2.68 2.68 0 0 1 2.07.68 2.78 2.78 0 0 1 .87 2 2.18 2.18 0 0 1-.29 1.19z"/></svg>
                        </button>
                    </div>
                    <div className={styles.rating}>
                        {
                            (props.rating)
                                ?
                                <>
                                    <img className={styles.ratingTrue} width={18} height={18} src="/img/star.svg" alt=""/>
                                    <div className={styles.ratingCount}>{props.rating}</div>
                                </>
                                : <img className={styles.ratingFalse} width={18} height={18} src="/img/star.svg" alt=""/>
                        }
                    </div>
                    <img className='cu-p' width={155} height={160} src={props.image_url} alt="skeakers" onClick={() => navigate(`/product/${props.id}`)}/>
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
