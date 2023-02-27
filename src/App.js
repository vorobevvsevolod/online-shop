import Header from './components/Header'
import Cart from './components/Cart'
import React from "react";
import Router from "./router";
import { useDispatch, useSelector } from 'react-redux';
import { GetTokenByCookie } from './redux/Slices/TokenUserSlice'
import {fetchCards, setCart, setFavorites} from "./redux/Slices/CardArraySlice";
import {fetchCart} from "./redux/Slices/CartArraySlice";
import {fetchFavorites} from "./redux/Slices/favoritesArraySlice";



function App() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(GetTokenByCookie())
        dispatch(fetchCards(0)).then(res =>{
            dispatch(fetchCart()).then(responseCart =>{
                dispatch(setCart(responseCart.payload))
            })
            dispatch(fetchFavorites()).then(responseFavorites =>{
                dispatch(setFavorites(responseFavorites.payload))
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
          <Cart/>
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
