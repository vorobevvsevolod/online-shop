import React from "react";
import styles from './GreenButton.module.scss'
export default function GreenButton(props){
    return(
        <button className={`${styles.GreenButton} ${props.direction === 'right' ? styles.ArrowRight : styles.ArrowLeft}`} onClick={props.onClick}>
            {props.txt}
            <img src="/img/arrow.svg" alt="arrow"/>
        </button>
    );
}