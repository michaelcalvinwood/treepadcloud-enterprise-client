import './Title.scss';
import React, { useContext } from "react";
import treepadIcon from '../assets/icons/treepadcloud-icon.svg';
import IconTray from '../desktopComponents/IconTray';

import treeIcon from '../assets/icons/tree.svg';
import branchIcon from '../assets/icons/branch.svg';
import controlsIcon from '../assets/icons/controls.svg';
import logoutIcon from '../assets/icons/logout.svg';
import { useDispatch } from 'react-redux';
import { clearTokens } from '../store/sliceTokens';

const Title = ({sections, toggleSection, openSettings}) => {
    const dispatch = useDispatch();

    const { trees: treesState, controls: controlsState, branches: branchesState } = sections;
    const titleClassName = () => {
        let cname = 'title';
        
        if (!treesState) cname += ' title--no-trees';

        return cname;
    }
    
    const logout = () => {
        localStorage.removeItem('userToken');
        dispatch(clearTokens({}));
        window.location.reload();
    }
    return (
       <div className={titleClassName()}>
            <div className='title__icon-tray'>
                {!treesState && <IconTray sectionHandler={toggleSection} name="trees" icon={treeIcon} />}
                {!branchesState && <IconTray sectionHandler={toggleSection} name="branches" icon={branchIcon} />}
                {/* {!controlsState && <IconTray sectionHandler={toggleSection} name="controls" icon={controlsIcon} />} */}
            </div>
            <img className="title__logout" src={logoutIcon} onClick={logout}/>
            <div className="title__logo-container">
                <img className='title__logo-image' src={treepadIcon} />
                <h1 className='title__logo-name'>TreePad Cloud</h1>
            </div>
       </div>
    )
}

export default Title;