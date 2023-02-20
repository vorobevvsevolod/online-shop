import React from "react";
import styles from './CardLoad.module.scss'
function CardLoad (){
    return(
        <div className={styles.itemConteiner}>
            <div className={styles.item}>
                <div className={styles.image}></div>
                <div className={styles.price}>
                    <span></span>
                    <p></p>
                </div>
                <div className={styles.buy}>
                    <span></span>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default CardLoad;
