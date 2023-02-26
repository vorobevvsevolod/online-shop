import React from "react";
import './loginRegister.scss'
import {Link, useNavigate} from "react-router-dom";
import {loginUserAxios} from "../Axios";
import {SetTokenUser} from "../redux/Slices/TokenUserSlice";
import {fetchCards, setFavoritesAndCart} from "../redux/Slices/CardArraySlice";
import {fetchCart} from "../redux/Slices/CartArraySlice";
import {useDispatch} from "react-redux";

function LoginRegisterPage () {
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
                dispatch(fetchCards()).then(resCard => {
                    dispatch(fetchCart()).then(resCart =>{
                        dispatch(setFavoritesAndCart(resCart.payload))
                    })
                })
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
                                <label htmlFor="username">Почта</label>
                                <input type="text" id="username" name="username" required="required" onChange={(event) => setLoginState({...loginState, email: event.target.value})} />
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
                            <div className="form-group" onClick={Autorization}>
                                <button type="submit">Войти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginRegisterPage;