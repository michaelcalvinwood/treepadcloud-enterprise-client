import './Settings.scss';
import { useState } from "react";
import { IonButton } from '@ionic/react';

const Settings = ({closeSettings, clearToken}) => {

  
    const logout = () => {
        localStorage.removeItem('token');
        clearToken();
        window.location.reload();
    }
    return (
        <div className="modal-container">
            <div className="modal-content">
                <p>Hello Settings</p>
                <div style={{textAlign: 'center'}}><IonButton className="modal-button" onClick={logout}>Logout</IonButton></div>
                <div style={{textAlign: 'center'}}><IonButton className="modal-button" onClick={closeSettings}>Close</IonButton></div>
            </div>
        </div>
    )
}

export default Settings;
