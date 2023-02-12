import './IconTray.scss';
import React from "react";

const IconTray = props => {
    console.log('IconTray', props);
    
    return (
        
        <div className="icon-tray" onClick={() => props.sectionHandler(props.name)}>
            <img className="icon-tray__image" src={props.icon} />
        </div>
    )
    
}

export default IconTray;