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
        if (debug) console.log('Branches addBranch', activeTree, activeBranch);
        if (!activeTree || !activeBranch) return;

        window.socket.forrestEmit('addBranch', {treeId: activeTree._id, branchId: activeBranch.branchId});
    }

    const deleteBranch = () => {
        if (debug) console.log('Branches deleteBranch', activeTree, activeBranch);
        if (!activeTree || !activeBranch) return;

        window.socket.forrestEmit('deleteBranch', {treeId: activeTree._id, branchId: activeBranch.branchId});
    }

    const nameHasBeenChecked = (branchId) => {
    
    }
    const focusPrevBranch = () => {
        if (debug) console.log('Branches focusPrevBranch', activeBranch, branches);

        let index = -1;
        for (let i = 0; i < branches.length; ++i) {
            console.log('Branches focusPrevBranch compare', branches[i].branchId, activeBranch.branchId);
            if (branches[i].branchId === activeBranch.branchId) {
                index = i;
                break;
            }
        }
            
        if (debug) console.log('Branches focusPrevBranch index', index);
        if (index === -1) return;

        if (index === 0) return;

        setActiveBranch(branches[index-1]);
    }

    const focusNextBranch = () => {
        if (debug) console.log('Branches focusNextBranch', activeBranch, branches);

        let index = -1;
        for (let i = 0; i < branches.length; ++i) {
            console.log('Branches focusNextBranch compare', branches[i].branchId, activeBranch.branchId);
            if (branches[i].branchId === activeBranch.branchId) {
                index = i;
                break;
            }
        }
            
        if (debug) console.log('Branches focusNextBranch index', index);
        if (index === -1) return;

        if (index >= branches.length - 1) return;

        setActiveBranch(branches[index+1]);
    }

    const handleKeys = e => {
        const { key, keyCode, ctrlKey, shiftKey } = e;
        if (debug) console.log('Branches handleKeys', key, ctrlKey);

        switch(key) {
            case 'Enter':
                addBranch();
                break;
            case 'ArrowRight':
                break;
            case 'ArrowLeft':
                break;
            case 'ArrowDown':
                if (ctrlKey) {

                } else focusNextBranch();
                
                break;
            case 'ArrowUp':
                if (ctrlKey) {

                } else focusPrevBranch();
                break;
            case 'Backspace':
                if (ctrlKey) deleteBranch();
                break;    
        }
    }

    useEffect(() => {
        if (debug) console.log("Branches useEffect", activeTree);
        if (activeTree && curTree !== activeTree) {
            setCurTree(activeTree);
            setBranches(activeTree.branches);
        }
        if (debug) console.log('Branches useEffect')
        document.addEventListener('keyup', handleKeys);

        return () => {
            if (debug) console.log('Branches useEffect return');
            document.removeEventListener('keyup', handleKeys);
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
                    activeTree && branches.map(branch => {
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