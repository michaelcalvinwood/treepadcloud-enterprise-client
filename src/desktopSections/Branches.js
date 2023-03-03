import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import settingsIcon from '../assets/icons/link.svg';
import cloudIcon from '../assets/icons/cloud.svg';
import closeIcon from '../assets/icons/close.svg';
import { IonPage, IonContent, IonSearchbar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import Branch from '../desktopComponents/Branch';
import { addOutline } from 'ionicons/icons';


let controlToggle = false;

const Branches = ({sections, treeName, toggleSection, activeTree, activeBranch, setActiveBranch}) => {
    const debug = true;
    const { branches: branchesState, trees: treesState, controls: controlsState} = sections; 
    const [branches, setBranches] = useState([]);
    const [curTree, setCurTree] = useState(null);

    if (debug) console.log('Branches', branches, activeTree);
    
    const branchesClassName = () => {
        let cname = 'branches';

        if (!treesState) cname += ' branches--no-trees';
        if (!branchesState) cname += ' branches--no-branches';
        if (!controlsState) cname += ' branches--no-controls';
        
        return cname;
    }

    const addBranch = () => {
        if (debug) console.log('addBranch', activeTree, activeBranch);
        if (!activeTree || !activeBranch) return;

        window.socket.forrestEmit('addBranch', {treeId: activeTree._id, branchId: activeBranch.branchId});
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
        <IonPage className={branchesClassName()}>
        <IonContent>    
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
                                setActiveBranch={setActiveBranch}
                            />
                        )
                    })
                }
                
            </div>
            { activeTree && window.socket.isUser() && <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton 
                        onClick={addBranch}
                    >
                    <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab> 
                }
        </IonContent>    
        </IonPage>
    )
}

export default Branches;