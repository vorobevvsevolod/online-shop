import React, {useContext} from "react";
import {CartContext, TokenUserContext, LoginRegisterContext} from "../../App";
import {Link} from "react-router-dom";

function Header(){
    const {cartState, setCartState} = useContext(CartContext)
    const [totalPrice, setTotalPrice] = React.useState(0);
    const {tokenUser} = React.useContext(TokenUserContext)
    const {loginRegisterShow, setLoginRegisterShow} = React.useContext(LoginRegisterContext)
    React.useEffect(()=>{
        let count =0;
        cartState.cartArray.map(item =>(
            count += Number(item.product.price)
        ))
        if(count !== 0)count += 500;
        setTotalPrice(count)
    }, [cartState.cartArray])
    return(
            <header>
                <Link to='/'>
                    <div className='d-flex align-center'>
                        <img width={40} height={40} src="/img/logo.png" alt="sneakers"/>
                      <div className='ml-20'>
                        <h3 className='text-uppercase'>Добрый день</h3>
                        <p className='opacity-4'>Магазин лучших кроссовок</p>
                      </div>
                    </div>
                </Link>
                <div className='header_center'><Link to='/dostavka'>Доставка</Link> <Link to='/contacts'>Контакты</Link></div>
                <div className='header_right'>
                        <button className=' cartButton' onClick={() =>setCartState({...cartState, show: !cartState.show })}>
                            <div className='cartTextButton'>
                                <svg className='mr-10' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.54548 18.1818C7.99735 18.1818 8.36366 17.8155 8.36366 17.3636C8.36366 16.9118 7.99735 16.5455 7.54548 16.5455C7.09361 16.5455 6.72729 16.9118 6.72729 17.3636C6.72729 17.8155 7.09361 18.1818 7.54548 18.1818Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.5455 18.1818C16.9973 18.1818 17.3637 17.8155 17.3637 17.3636C17.3637 16.9118 16.9973 16.5455 16.5455 16.5455C16.0936 16.5455 15.7273 16.9118 15.7273 17.3636C15.7273 17.8155 16.0936 18.1818 16.5455 18.1818Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1 1H4.27273L6.46545 11.9555C6.54027 12.3321 6.7452 12.6705 7.04436 12.9113C7.34351 13.1522 7.71784 13.2801 8.10182 13.2727H16.0545C16.4385 13.2801 16.8129 13.1522 17.112 12.9113C17.4112 12.6705 17.6161 12.3321 17.6909 11.9555L19 5.09091H5.09091" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p className='rubles-card'>{totalPrice} <span>руб.</span></p>
                            </div>
                        </button>

                        {(tokenUser) ?
                                <Link to="/cabinet">
                                    <button className='kabinetButton'>
                                        <svg version="1.1" id="mdi-face" width="30" height="30" viewBox="0 0 24 24" >
                                            <path d="M9,11.75A1.25,1.25 0 0,0 7.75,13A1.25,1.25 0 0,0 9,14.25A1.25,1.25 0 0,0 10.25,13A1.25,1.25 0 0,0 9,11.75M15,11.75A1.25,1.25 0 0,0 13.75,13A1.25,1.25 0 0,0 15,14.25A1.25,1.25 0 0,0 16.25,13A1.25,1.25 0 0,0 15,11.75M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,11.71 4,11.42 4.05,11.14C6.41,10.09 8.28,8.16 9.26,5.77C11.07,8.33 14.05,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20Z" />
                                        </svg>
                                        <span>Кабинет</span>
                                    </button>
                                </Link> :
                                <button className='kabinetLogin' onClick={()=> setLoginRegisterShow(!loginRegisterShow)}>
                                    Войти
                                </button>
                        }
                </div>

            </header>
);}

export default Header;