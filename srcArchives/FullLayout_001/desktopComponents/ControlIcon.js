import './ControlIcon.scss';
import React from "react";

const ControlIcon = (props) => {
    return (
        <div className="control-icon">
            <img className="control-icon__image" src={props.icon} />
        </div>
    )
}

export default ControlIcon;