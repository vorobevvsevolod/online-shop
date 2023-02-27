import React from 'react';
import  styles from './LoadingAnimation.module.scss'

const LoadingAnimation = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    );
};

export default LoadingAnimation;