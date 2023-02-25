import './IconTray.scss';
import React from "react";

const IconTray = props => {
    const debug = false;

    if (debug) console.log('IconTray', props);
    
    return (
        
        <div className="icon-tray" onClick={() => props.sectionHandler(props.name)}>
            <img className="icon-tray__image" src={props.icon} />
        </div>
    )
    
}

export default IconTray;