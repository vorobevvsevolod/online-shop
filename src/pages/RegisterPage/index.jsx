import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../LoginPage/loginRegister.scss'
import {registrationNewUserAxios} from "../../Axios";
const RegisterPage = () => {
    const navigate = useNavigate();
    const [registrationState, setRegistrationState] = React.useState({email: '', username: '', password: ''});
   const registrationNewUser = () =>{
       registrationNewUserAxios(registrationState).then(response =>{
           if(!response.data.status) {
               alert('Произошла ошибка попробуйте позже');
               setRegistrationState({})
           }else navigate('/login')

       })

    }
    return (
        <div className="form">
            <div className="form-panel one">
                <div className="form-header">
                    <h1>Регистрация</h1>
                </div>
                <div className="form-content">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Почта</label>
                            <input type="text" id="username" name="username" required="required" value={registrationState.email}
                                   onChange={event => setRegistrationState(prev => ({...prev, email: event.target.value}))}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="уче">Имя</label>
                            <input type="text" id="password" name="text" required="required" value={registrationState.username}
                                   onChange={event => setRegistrationState(prev => ({...prev, username: event.target.value}))}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" id="password" name="password" required="required" value={registrationState.password}
                                   onChange={event => setRegistrationState(prev => ({...prev, password: event.target.value}))}
                            />
                        </div>
                        <div className="form-group" >
                            <button type="submit" onClick={registrationNewUser}>Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;