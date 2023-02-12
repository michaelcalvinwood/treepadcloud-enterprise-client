import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import settingsIcon from '../assets/icons/settings.svg';
import cloudIcon from '../assets/icons/cloud.svg';
import closeIcon from '../assets/icons/close.svg';
import { IonSearchbar } from '@ionic/react';
//import Branch from '../desktopComponents/Branch';
// import * as socketIo from '../../../utils/resourceServerEmit';
// import * as monitor from '../../../utils/eventMonitor';
//import ModalContainer from '../../../components/ModalContainer';

let controlToggle = false;

const Branches = ({branchesState, treesState, controlsState, treeName, toggleSection}) => {

    
    const branchesClassName = () => {
        let cname = 'branches';

        if (!treesState) cname += ' branches--no-trees';
        if (!branchesState) cname += ' branches--no-branches';
        if (!controlsState) cname += ' branches--no-controls';
        
        return cname;
    }

    const nameHasBeenChecked = (branchId) => {
    
    }

    return (
        <div className={branchesClassName()}>
            <div className='trees__actions'>
                <img 
                    className='trees__cloud' 
                    src={cloudIcon} />
                <img
                    // onClick={e => { 
                    //     controlToggle = !controlToggle;
                    //     appCtx.setDesktopSections(prev => {
                    //         prev.controls = controlToggle;
                    //         return ({...prev})
                    //     });
                    //     e.preventDefault();
                    // }} 
                    className='trees__settings' 
                    src={settingsIcon} />
                <img
                    onClick={() => toggleSection('branches')} 
                    className='trees__close' 
                    src={closeIcon} />
            </div>
            <div className='branches__title-container'> 
                <p className='branches__title'>{treesState && treeName}</p>
            </div>

           <IonSearchbar 
                // onIonChange={e => setSearch(e.detail!.value || '')}
                className='branches__search' 
                placeholder=''/>
            <div className="branches__list">
                {/* {
                    appCtx.branches.map(branch => {
                        return <Branch 
                            key={branch.id+branch.name} 
                            curBranch={branch}
                            />
                    })
                } */}
                
            </div>

            
        </div>
    )
}

export default Branches;