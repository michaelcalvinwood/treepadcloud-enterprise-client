import './Title.scss';
import React, { useContext } from "react";
import treepadIcon from '../assets/icons/treepadcloud-icon.svg';
import IconTray from '../desktopComponents/IconTray';

import treeIcon from '../assets/icons/tree.svg';
import branchIcon from '../assets/icons/branch.svg';
import controlsIcon from '../assets/icons/controls.svg';

const Title = ({treesState, controlsState, toggleSection}) => {
  
    const titleClassName = () => {
        let cname = 'title';
        
        if (!treesState) cname += ' title--no-trees';

        return cname;
    }

    return (
       <div className={titleClassName()}>
            <div className='title__icon-tray'>
                {!treesState && <IconTray sectionHandler={toggleSection} name="trees" icon={treeIcon} />}
                {/* {!appCtx.desktopSections.branches && <IconTray sectionHandler={openSection} name="branches" icon={branchIcon} />} */}
                {!controlsState && <IconTray sectionHandler={toggleSection} name="controls" icon={controlsIcon} />}
            </div>
            <div className="title__logo-container">
                <img className='title__logo-image' src={treepadIcon} />
                <h1 className='title__logo-name'>TreePad Cloud</h1>
            </div>
       </div>
    )
}

export default Title;