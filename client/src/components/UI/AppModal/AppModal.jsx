import React, { useEffect } from 'react';
import M from 'materialize-css';

export default function AppModal({ children, ...props }) {

    useEffect(() => {
        M.AutoInit()
    }, [])

    return (
        <div className="app-modal">
            <div id={props.modalId} className="modal">
                {children}
            </div>
        </div>
    )
}
