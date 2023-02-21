import React, {useContext} from "react";
import './LoginRegister.scss'
import {loginUserAxios} from "../Axios";
import {LoginRegisterContext, TokenUserContext} from "../../App";
function LoginRegister (){
    const [toggleCard, setTogglecard] = React.useState(false);
    const [emailLoginState, setEmailLoginState] = React.useState('');
    const [passwordLoginState, setPasswordLoginState] = React.useState('');
    const { setTokenUser } = useContext(TokenUserContext)
    const {setLoginRegisterShow } = React.useContext(LoginRegisterContext)
    const Autorization = (event) =>{
        event.preventDefault()
        loginUserAxios(emailLoginState, passwordLoginState).then(res =>{
            if(res.response){
                alert(res.response.data[0].msg)
            }else {
                document.cookie = `token=${res.data.token}; path=/`;
                if(res.data.token){
                    setTokenUser(res.data.token)
                    setLoginRegisterShow(false)
                }else{
                    alert("Что-то не так... Попробуйте еще раз")
                }

            }
        })
    }
    return (
        <div className={`container ${(toggleCard) ? 'active' : ''}`}>
                <div ></div>
                <div className="card">
                    <h1 className="title">Вход</h1>
                    <form>
                        <div className="input-container">
                            <input type="email" required="required" onChange={(event) => setEmailLoginState(event.target.value)}/>
                            <label htmlFor="#{label}">Почта</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input type="password" required="required" onChange={(event) => setPasswordLoginState(event.target.value)}/>
                            <label htmlFor="#{label}">Пароль</label>
                            <div className="bar"></div>
                        </div>
                        <div className="button-container">
                            <button onClick={(event) => Autorization(event)}><span>Войти</span></button>
                        </div>
                    </form>
                </div>
                <div className="card alt">
                    <div className="toggle" onClick={()=>setTogglecard(!toggleCard)}>
                        {(!toggleCard) && <img className="toggle_img" src="/img/pencil.png" alt=""/>}
                    </div>
                    <h1 className="title" onClick={()=>setTogglecard(!toggleCard)}>Создать
                        <div className="close" ></div>
                    </h1>
                    <form>
                        <div className="input-container">
                            <input type="text" required="required"/>
                            <label htmlFor="#{label}">Имя</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input type="email"  required="required"/>
                            <label htmlFor="#{label}">Почта</label>
                            <div className="bar"></div>
                        </div>
                        <div className="input-container">
                            <input type="password"  required="required"/>
                            <label htmlFor="#{label}">Пароль</label>
                            <div className="bar"></div>
                        </div>
                        <div className="button-container">
                            <button><span>создать</span></button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default LoginRegister;