import './Title.scss';
import React, { useContext } from "react";
import treepadIcon from '../../../assets/icons/treepadcloud-icon.svg';
import AppContext from '../../../data/AppContext';
import IconTray from '../../../components/IconTray';

import treeIcon from '../../../assets/icons/tree.svg';
import branchIcon from '../../../assets/icons/branch.svg';
import controlsIcon from '../../../assets/icons/controls.svg';

const Title: React.FC = () => {
    const appCtx = useContext(AppContext);

    const titleClassName = () => {
        let cname = 'title';

        if (!appCtx.desktopSections.trees) cname += ' title--no-trees';

        return cname;
    }

    const openSection = (section: 'trees' | 'branches') => {
        const newVal = appCtx.desktopSections;
        newVal[section] = true;
        appCtx.setDesktopSections(prev => {
            return({...prev, [section]: true})
        });
    }

    return (
       <div className={titleClassName()}>
            <div className='title__icon-tray'>
                {!appCtx.desktopSections.trees && <IconTray sectionHandler={openSection} name="trees" icon={treeIcon} />}
                {!appCtx.desktopSections.branches && <IconTray sectionHandler={openSection} name="branches" icon={branchIcon} />}
                {/* {!appCtx.desktopSections.controls && <IconTray sectionHandler={openSection} name="controls" icon={controlsIcon} />} */}
            </div>
            <div className="title__logo-container">
                <img className='title__logo-image' src={treepadIcon} />
                <h1 className='title__logo-name'>TreePad Cloud</h1>
            </div>
       </div>
    )
}

export default Title;