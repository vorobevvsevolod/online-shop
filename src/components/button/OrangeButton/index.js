import React from "react";
import styles from './OrangeButton.module.scss'
export default function OrangeButton(props){
    return(
        <button style={{width: props.width}} className={`${styles.GreenButton} ${props.direction === 'right' ? styles.ArrowRight : styles.ArrowLeft} `} onClick={props.onClick}>
            {props.txt}
            { (props.direction) && <img src="/img/arrow.svg" alt="arrow"/>}
        </button>
    );
}