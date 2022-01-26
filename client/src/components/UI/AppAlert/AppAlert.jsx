import React from 'react';
import classes from "./AppAlert.module.css";

export default function AppAlert({ children, ...props }) {
    return (
        <div {...props} className={classes.AppAlert}>
            {children}
        </div>
    )
}
