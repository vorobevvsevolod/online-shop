import React from "react";
import './loginRegister.scss'
import {Link, useNavigate} from "react-router-dom";
import {loginUserAxios} from "../../Axios";
import {SetTokenUser} from "../../redux/Slices/TokenUserSlice";
import {setCart, setFavorites} from "../../redux/Slices/CardArraySlice";
import {fetchCart} from "../../redux/Slices/CartArraySlice";
import {useDispatch} from "react-redux";
import {fetchFavorites} from "../../redux/Slices/favoritesArraySlice";
import {fetchUserInfo} from "../../redux/Slices/userInfoSlice";
import {fetchOrders} from "../../redux/Slices/OrdersSlice";

function Index () {
    const [loginState, setLoginState] = React.useState({email: '', password: ''});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Autorization = (event) =>{
        event.preventDefault()
        loginUserAxios(loginState.email, loginState.password).then(res =>{
            if(res.response){
                alert(res.response.data[0].msg)
            } else if(res.data.token){
                dispatch(SetTokenUser(res.data.token))
                localStorage.setItem('token', res.data.token);

                dispatch(fetchCart()).then(responseCart =>{
                    dispatch(setCart(responseCart.payload))
                })
                dispatch(fetchFavorites()).then(responseFavorites =>{
                    dispatch(setFavorites(responseFavorites.payload))
                })
                dispatch(fetchUserInfo())
                dispatch(fetchOrders())

                navigate("/");
            } else alert("Что-то не так... Попробуйте еще раз")
        })
    }
    return(
        <>
            <div className="form">
                <div className="form-panel one">
                    <div className="form-header">
                        <h1>Вход</h1>
                    </div>
                    <div className="form-content">
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Почта</label>
                                <input type="email" id="email" name="email" required="required" onChange={(event) => setLoginState({...loginState, email: event.target.value})} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль</label>
                                <input type="password" id="password" name="password" required="required" onChange={(event) => setLoginState({...loginState, password: event.target.value}) }/>
                            </div>
                            <div className="form-group">
                                <Link to='/register'>
                                        Создать аккаунт
                                </Link>

                            </div>
                            <div className="form-group" >
                                <button type="submit" onClick={Autorization}>Войти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index;