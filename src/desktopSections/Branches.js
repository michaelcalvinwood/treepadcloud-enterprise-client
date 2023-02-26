import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import settingsIcon from '../assets/icons/link.svg';
import cloudIcon from '../assets/icons/cloud.svg';
import closeIcon from '../assets/icons/close.svg';
import { IonSearchbar } from '@ionic/react';
import Branch from '../desktopComponents/Branch';
//import Branch from '../desktopComponents/Branch';
// import * as socketIo from '../../../utils/resourceServerEmit';
// import * as monitor from '../../../utils/eventMonitor';
//import ModalContainer from '../../../components/ModalContainer';

let controlToggle = false;

const Branches = ({sections, treeName, toggleSection, activeTree, activeBranch, setActiveBranch}) => {
    const debug = true;
    const { branches: branchesState, trees: treesState, controls: controlsState} = sections; 
    const [branches, setBranches] = useState([]);
    const [curTree, setCurTree] = useState(null);

    if (debug) console.log('Branches', branches);

    
    const branchesClassName = () => {
        let cname = 'branches';

        if (!treesState) cname += ' branches--no-trees';
        if (!branchesState) cname += ' branches--no-branches';
        if (!controlsState) cname += ' branches--no-controls';
        
        return cname;
    }

    const nameHasBeenChecked = (branchId) => {
    
    }

    useEffect(() => {
        if (curTree !== activeTree) {
            setCurTree(activeTree);
            setBranches(activeTree.branches);
        }
    })

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
                <p className='branches__title'>{treesState && activeTree && activeTree.name}</p>
            </div>

           <IonSearchbar 
                // onIonChange={e => setSearch(e.detail!.value || '')}
                className='branches__search' 
                placeholder=''/>
            <div className="branches__list">
                {
                    branches.map(branch => {
                        return (
                            <Branch 
                                key={branch.branchId} 
                                branch={branch}
                                activeBranch={activeBranch}
                            />
                        )
                    })
                }
                
            </div>

            
        </div>
    )
}

export default Branches;