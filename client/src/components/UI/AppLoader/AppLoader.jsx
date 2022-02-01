import React from 'react';
import classes from "./AppLoader.module.css";

export default function AppLoader(props) {
    return (
        <div {...props} className={['preloader-wrapper small active', classes.AppLoader].join(' ')}>
            <div className="spinner-layer" style={{borderColor: props.color}}>
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}
