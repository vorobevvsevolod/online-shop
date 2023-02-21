import React from "react";
import OrangeButton from '../button/OrangeButton'
import {Link} from "react-router-dom";
import {TokenUserContext} from "../../App";

function CabinetPage (){
    const {setTokenUser} = React.useContext(TokenUserContext)
    const exitFromAccount = () => {
        document.cookie = `token=; path=/`;
        setTokenUser('');
    }
    return(
        <div className='content p-40'>
            <h1>Кабинет</h1>
            <Link to='/' onClick={exitFromAccount}>
                <OrangeButton txt='Выйти из аккаунта'/>
            </Link>
        </div>
    );
}

export default CabinetPage;