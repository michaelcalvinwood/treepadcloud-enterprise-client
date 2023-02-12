import './Controls.scss';
import React, { useContext, useEffect } from 'react';
import ControlIcon from '../../../components/ControlIcon';
import AppContext from '../../../data/AppContext';

import saveIcon from '../../../assets/icons/save.svg';
import insertSiblingIcon from '../../../assets/icons/insert-sibling.svg';
import insertChildIcon from '../../../assets/icons/insert-child.svg';
import insertParentIcon from '../../../assets/icons/insert-parent.svg';

import upIcon from '../../../assets/icons/up.svg';
import downIcon from '../../../assets/icons/down.svg';
import indentIcon from '../../../assets/icons/indent.svg';
import outdentIcon from '../../../assets/icons/outdent.svg';

import copyIcon from '../../../assets/icons/copy.svg';
import pasteIcon from '../../../assets/icons/paste.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import settingsIcon from '../../../assets/icons/settings.svg';
import closeIcon from '../../../assets/icons/close.svg';

const Controls: React.FC = () => {
    const appCtx = useContext(AppContext);

    const controlsClassName = () => {
        let cname = 'controls';

        if (!appCtx.desktopSections.trees) cname += ' controls--no-trees';
        if (!appCtx.desktopSections.controls) cname += ' controls--no-controls';

        return cname;
    }

    const handleControlsClose = () => {
        // appCtx.setDesktopSections(prev => {
        //     prev.controls = false;
        //     return ({...prev});
        // })
    }


    return (
        <div className={controlsClassName()}>
            <div className="controls__container">
                <div className='controls__group'>
                    <ControlIcon icon={saveIcon} />
                    <ControlIcon icon={insertSiblingIcon} />
                    <ControlIcon icon={insertChildIcon} />
                    <ControlIcon icon={insertParentIcon} />
                </div>
                <div className='controls__group'>
                    <ControlIcon icon={upIcon} />
                    <ControlIcon icon={downIcon} />
                    <ControlIcon icon={indentIcon} />
                    <ControlIcon icon={outdentIcon} />
                </div>
                <div className='controls__group'>
                    <ControlIcon icon={copyIcon} />
                    <ControlIcon icon={pasteIcon} />
                    <ControlIcon icon={deleteIcon} />
                    <ControlIcon icon={settingsIcon} />
                </div>
            </div>
            <img 
                onClick={handleControlsClose}
                className='controls__close' 
                src={closeIcon} />
        </div>
    )
}

export default Controls;

