import Header from './components/Header'
import Cart from './components/Cart'
import React from "react";
import axios from "axios";
import {getCartAxios} from "./components/Axios";
import Router from "./router";
import LoginRegister from "./components/LoginRegister/LoginRegister";

const URLServer = 'http://192.168.31.11:3500';
export const CartContext = React.createContext(null);
export const CardArrayContext = React.createContext(null);
export const TokenUserContext = React.createContext(null);
export const ServerErrorContext = React.createContext(null)
export const LoginRegisterContext = React.createContext(null)


function App() {
    //Корзина
    const [cartState, setCartState] = React.useState({show: false, cartArray: []})
    //Продукты
    const [cardArray, setCardArray] = React.useState([])
    const [loginRegisterShow, setLoginRegisterShow] = React.useState(false);
    //Состояние сервера
    const [serverError, setServerError] = React.useState(false);
    const [tokenUser, setTokenUser] = React.useState('');

    React.useEffect(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if(token) setTokenUser(token);
        const intervalId = setInterval(() => {
            axios.get(`${URLServer}/products`)
                .then(response => {
                    const products = response.data.result;
                    const promises = products.map(product => {
                        return axios.get(`${URLServer}/product/image/${product.id}`, { responseType: 'blob' })
                            .then(response => {
                                product.image_url = URL.createObjectURL(response.data);
                                product.addedCart = false;

                            });
                    });
                    Promise.all(promises).then(() => {
                        setServerError(false);
                        if(token){
                            getCartAxios(token).then(res =>{
                                const cart = res.data;
                                const newCart = cart.map(item => {
                                    products.map(pr => {
                                        if(pr.id === item.product_id)  pr.addedCart = true;
                                    })
                                    const product = products.find(p => p.id === item.product_id);
                                    return {
                                        id: item.id,
                                        product: product,
                                        quantity: item.quantity
                                    };

                                });
                                setCardArray(products);
                                setCartState({...cartState, cartArray: newCart});
                            })
                        }
                        setCardArray(products);
                        clearInterval(intervalId);
                        clearTimeout(timeoutId);
                    });
                })
                .catch(error => {
                    console.log(error);
                    setServerError(true);
                });

        }, 1000);

        const timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setServerError(true);
        }, 60000);


        /*
        */

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

  return (
      <LoginRegisterContext.Provider value={{loginRegisterShow, setLoginRegisterShow}}>
          <TokenUserContext.Provider value={{tokenUser, setTokenUser}}>
              <CartContext.Provider value={{cartState, setCartState}}>
                  <CardArrayContext.Provider value={{cardArray}}>
                      <ServerErrorContext.Provider value={{serverError, setServerError}}>
                          { ((cartState.show || loginRegisterShow)) && <div className="overlay cu-p" onClick={()=>{
                                if(loginRegisterShow) setLoginRegisterShow(false);
                                if(cartState.show) setCartState({...cartState, show: false})
                          }
                          }></div>}
                          {(cartState.show) && <Cart/>}
                          {(loginRegisterShow) && <LoginRegister />}
                            <div className="wrapper clear">
                                <Header/>




                                <Router/>

                             </div>
                      </ServerErrorContext.Provider>
                  </CardArrayContext.Provider>
              </CartContext.Provider>
          </TokenUserContext.Provider>
      </LoginRegisterContext.Provider>
  );
}
export default App;
