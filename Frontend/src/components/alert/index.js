import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './alert.module.css';

export const CustomAlert = (props) => {
    return (
        <div>
            <Alert key={props.keyCode} variant={'light'} className={props.cssClassType === 'errorAlert' ? styles.errorAlert : props.cssClassType === 'successAlert' ? styles.successAlert:''}>
                {props.alertLabel}
            </Alert>
        </div>
    )
}
