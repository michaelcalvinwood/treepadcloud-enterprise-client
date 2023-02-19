import './Settings.scss';
import { useState } from "react";

const Settings = ({closeSettings}) => {

    return (
        <div className="modal-container">
            <div className="modal-content">
                <p>Hello Settings</p>
                <div className="modal-button" onClick={closeSettings}>Close</div>
            </div>
        </div>
    )
}

export default Settings;
