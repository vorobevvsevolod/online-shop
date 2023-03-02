import Card from "../components/Card";
import CardLoad from "../components/Card/CardLoad";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import SelectSortirovka from "../components/SelectSortirovka";
import {
    changeTotalCount,
    fetchCards,
    newCardArray,
    setCart,
    setFavorites,
    setSortMethod
} from "../redux/Slices/CardArraySlice";
import LoadingAnimation from "../components/LoadingAnimation";
import OrangeButton from "../components/button/OrangeButton";

function HomePage () {
    const [searchValue, setSearchValue] = React.useState({
        value: '',
        status: false
    });
    const {products, startLoading, status} = useSelector((state) => state.card);
    const cart = useSelector(state => state.cart.cart)
    const totalCount = useSelector(state => state.card.totalCount)

    const favorites = useSelector(state => state.favorites.favorites)
    const sort = useSelector(state => state.card.sortMethod)

    const dispatch = useDispatch();
    const option = [
        {value: 'priceIn', name: 'Сначала дорогие'},
        {value: 'priceBy', name: 'Сначала недорогие'},
        {value: 'rating', name: 'Сначала с высокой оценкой'},
        {value: 'reviews', name: 'Самые обсуждаемые'},
    ]
    const selectedSort = (sortMethod) => {
        dispatch(setSortMethod(sortMethod))
        dispatch(newCardArray([]))
        dispatch(fetchCards({offset: 0, sort: sortMethod, search: searchValue.value})).then(res =>{
            dispatch(setCart(cart))
            dispatch(setFavorites(favorites))
        })
    }

    const renderProductsCard = React.useMemo(() => {
            return products.map(item => (
                <Card key={item.id} {...item}/>
            ))

        }, [products, searchValue, sort]
    )

    React.useEffect(() => {
        let timeoutId;
        const searchProducts = () => {
            dispatch(newCardArray([]))
            dispatch(fetchCards({offset: 0, sort: sort, search: searchValue.value})).then(res => {
                dispatch(setCart(cart))
                dispatch(setFavorites(favorites))
            })
        };

        if (searchValue.value !== '' && searchValue.status) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(searchProducts, 1000);
        }

        if (searchValue.value === '' && searchValue.status) {
            dispatch(newCardArray([]))
            dispatch(fetchCards({offset: 0, sort: sort})).then(res => {
                dispatch(setCart(cart))
                dispatch(setFavorites(favorites))
            })
            setSearchValue(prevState => ({...prevState, status: false}))
        }

        return () => clearTimeout(timeoutId);
    }, [searchValue.value, searchValue.status]);

    const loadMoreProducts = () => {
        if (searchValue.status) {
            dispatch(fetchCards({offset: products.length, sort: sort, search: searchValue.value})).then(res => {
                dispatch(setCart(cart))
                dispatch(setFavorites(favorites))
            })
        } else {
            dispatch(fetchCards({offset: products.length, sort: sort})).then(res => {
                dispatch(setCart(cart))
                dispatch(setFavorites(favorites))
            })
        }
    }

    return(
        <>
            <div className='d-flex align-center mb-20 justify-between'>
                <h1>{((status === 'failed' && !products.length) || (status === 'failed' && products.length >= 4)) ? `Ошибка сервера...` : (!startLoading) ? `Загрузка...` : (searchValue.value) ? `Поиск...` : "Все кроссовки"}</h1>
                {
                    (startLoading)
                        ?
                        <div className="search-block d-flex align-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <input value={searchValue.value} onChange={(event) => setSearchValue({status: true, value: event.target.value})} type="text" placeholder='Поиск...'/>
                            {(searchValue.value) && <img className='clearSearch' src="/img/close-x.svg" alt="close" onClick={() => {
                                setSearchValue({status: false, value: ''})
                                dispatch(newCardArray([]))
                                dispatch(fetchCards({offset: 0, sort: sort})).then(res => {
                                    dispatch(setCart(cart))
                                    dispatch(setFavorites(favorites))
                                })
                            }}/>}
                        </div>
                        : ''
                }
            </div>
            { (startLoading) ? <div className='SortContainer'>
                    <SelectSortirovka option={option} value={sort} onChange={selectedSort} />
                </div> : ''}

            <div className='CardCollection'>
                {(!startLoading) && Array.from({length: 16}, (v, i) => <CardLoad key={i}/>)}
                {renderProductsCard}
                {((status === 'loading' && startLoading) && products.length >= 4) && <div className='loading_dots'><LoadingAnimation/></div>}
            </div>
            {((status !== 'loading' && status !== 'failed') && products.length !== totalCount) && <div className='loading_btn'>
                <OrangeButton txt='Загрузить еще' onClick={loadMoreProducts} />
            </div>}

        </>
    )
}

export default HomePage;