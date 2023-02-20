import './App.css';
import Card from './components/Card'
import Header from './components/Header'
import Cart from './components/Cart'
import React from "react";
import axios from "axios";
import CardLoad from "./components/Card/CardLoad";
import {getCartAxios, loginUserAxios} from "./components/axios";

const URLServer = 'http://192.168.31.11:3500';
export const CartContext = React.createContext(null);
export const TokenUserContext = React.createContext(null);


function App() {
    //Корзина
    const [cartState, setCartState] = React.useState({show: false, cartArray: []})

    //Продукты
    const [cardMass, setCardMass] = React.useState([])
    const [searchValue,  setSearchValue] = React.useState('');

    //Состояние сервера
    const [serverError, setServerError] = React.useState(false);
    const [tokenUser, setTokenUser] = React.useState('');

    React.useEffect(() => {
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
                        getCartAxios(token).then(res =>{
                            const cart = res.data;
                            let newProducts;
                            const newCart = cart.map(item => {
                               products.map(pr => {
                                    if(pr.id === item.product_id)  pr.addedCart = true;
                                })
                                console.log(newProducts)
                                const product = products.find(p => p.id === item.product_id);
                                return {
                                    id: item.id,
                                    product: product,
                                    quantity: item.quantity
                                };
                            });
                            setCardMass(products);
                            setCartState({...cartState, cartArray: newCart});
                        })
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

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if(token) {
            setTokenUser(token);
        } else console.log('Нужно авторизоваться')

        loginUserAxios('seva@mail.ru', '12345').then(res =>{
            if(res.response){
                console.log(res.response.data)
            }else {
                document.cookie = `token=${res.data.token}; path=/`;
                setTokenUser(res.data.token)
            }
        })




        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

  return (
      <TokenUserContext.Provider value={{tokenUser, setTokenUser}}>
          <CartContext.Provider value={{cartState, setCartState}}>
          <div className="wrapper clear">
                        <Header/>
                    {(cartState.show) && <Cart/>}
                    <div className='content p-40'>
                      <div className='d-flex align-center mb-40 justify-between'>
                          <h1>{(serverError) ?`Ошибка сервера...` : (!cardMass.length) ? `Загрузка...` : (searchValue) ? `Поиск...` : "Все кроссовки"}</h1>
                          {
                              (cardMass.length)
                                  ?
                                  <div className="search-block d-flex align-center">
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
                                      </svg>
                                      <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} type="text" placeholder='Поиск...'/>
                                      {(searchValue) && <img className='clearSearch' src="/img/close-x.svg" alt="close" onClick={() => setSearchValue('')}/>}
                                </div>
                                  : ''
                          }
                      </div>
                        <div className='CardCollection'>
                            {
                                (cardMass.length) ?
                                    cardMass.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                                        .map(item => (
                                            <Card key={item.id} {...item}/>
                                        ))
                                    : Array.from({length: 16}, (v, i) => <CardLoad key={i}/>)
                            }
                        </div>
                  </div>
                </div>
          </CartContext.Provider>
      </TokenUserContext.Provider>
  );
}
export default App;
