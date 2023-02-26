import React from 'react';
import styles from './SelectSortirovka.module.scss';

const SelectSortirovka = ({ option, value, onChange }) => {
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

    return (
        <>
            <div>Сортировка по:</div>
            <select
                className={styles.select}
                value={value}
                onChange={handleSelectChange}
            >
                {option.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectSortirovka;
