import Header from './components/Header'
import Cart from './components/Cart'
import React from "react";
import Router from "./router";
import { useDispatch, useSelector } from 'react-redux';
import { GetTokenByCookie } from './redux/Slices/TokenUserSlice'
import {fetchCards, setFavoritesAndCart} from "./redux/Slices/CardArraySlice";
import {fetchCart} from "./redux/Slices/CartArraySlice";


function App() {
    const dispatch = useDispatch();
    const showCart = useSelector(state => state.cartFavorites.showCart);
    React.useEffect(() => {
        dispatch(GetTokenByCookie())
        dispatch(fetchCards()).then(resCard => {
            dispatch(fetchCart()).then(resCart =>{
                dispatch(setFavoritesAndCart(resCart.payload))
            })
        })
/*
        let token = GetToken();

        let intervalID = setInterval(() => {
            return getCardAxios().then(res => {
                if(res.message){
                    dispatch(ServerErrorTrue())
                } else {
                    if(token){
                        GetCartAndFavorites(token, res).then(res =>{
                            dispatch(ServerErrorFalse())
                            setCardArray(res.newCard);
                            setCartState(prev => ({...prev, cartArray: res.newCart}));
                        })
                    }else setCardArray(res)

                    clearInterval(intervalID);
                    clearTimeout(timeoutID);
                }
            })
        }, 1000)

        const timeoutID = setTimeout(() => {
            clearInterval(intervalID);
            dispatch(ServerErrorTrue())
        }, 10000);

        return () => {
            clearInterval(intervalID);
            clearTimeout(timeoutID);
        };*/
    }, []);

  return (
      <>
          {(showCart) && <Cart/>}
          <div className="wrapper clear">
              <Header/>
              <div className='content p-40'>
                  <Router/>
              </div>

          </div>
      </>
  );
}
export default App;
