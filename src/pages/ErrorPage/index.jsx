import React from 'react';
import styles from './ErrorPage.module.scss'
import OrangeButton from "../../components/button/OrangeButton";
import {Link} from "react-router-dom";
const ErrorPage = () => {
    return (
            <div className={styles.wrapper}>
                <div className={styles.Center}>
                    <img width={300} height={300} src="/img/error-icon.svg" alt=""/>
                    <h1>Ой.... </h1>
                    <p>Данной страницы не существует</p>
                    <Link to='/'>
                        <OrangeButton txt="Вернуться на главную" direction='left'/>
                    </Link>
                </div>
            </div>
    );
};

export default ErrorPage;