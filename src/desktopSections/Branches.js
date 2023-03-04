import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import settingsIcon from '../assets/icons/link.svg';
import cloudIcon from '../assets/icons/cloud.svg';
import closeIcon from '../assets/icons/close.svg';
import { IonPage, IonContent, IonSearchbar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import Branch from '../desktopComponents/Branch';
import { addOutline } from 'ionicons/icons';
import _ from 'lodash';

let controlToggle = false;

const Branches = ({sections, treeName, toggleSection, activeTree, activeBranch, setActiveBranch}) => {
    const debug = true;
    const { branches: branchesState, trees: treesState, controls: controlsState} = sections; 
    const [branches, setBranches] = useState([]);
    const [curTree, setCurTree] = useState(null);
    const [search, setSearch] = useState('');

    if (debug) console.log('Branches', branches, activeTree);
    
    const branchesClassName = () => {
        let cname = 'branches';

        if (!treesState) cname += ' branches--no-trees';
        if (!branchesState) cname += ' branches--no-branches';
        if (!controlsState) cname += ' branches--no-controls';
        
        return cname;
    }

    const getActiveBranchIndex = () => {
        let index = -1;
        for (let i = 0; i < branches.length; ++i) {
            console.log('Branches focusNextBranch compare', branches[i].branchId, activeBranch.branchId);
            if (branches[i].branchId === activeBranch.branchId) {
                index = i;
                break;
            }
        }
        
        return index;
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
        if (index === -1) return false;

        if (index === 0) return false;

        setActiveBranch(branches[index-1]);
        return true;
    }

    const focusNextBranch = () => {
        if (debug) console.log('Branches focusNextBranch', activeBranch, branches);

        const index = getActiveBranchIndex();

        if (debug) console.log('Branches focusNextBranch index', index);
        if (index === -1) return false;

        if (index >= branches.length - 1) return false;

        setActiveBranch(branches[index+1]);
        return true;
    }

    const moveBranchUp = () => {
        if (debug) console.log("Branches moveBranchUp", activeBranch, branches);

        const index = getActiveBranchIndex();

        if (index === -1 || index === 0) return false;
        
        window.socket.forrestEmit('moveBranchUp', {treeId: activeTree._id, branchId: activeBranch.branchId});

    }

    const moveBranchDown = () => {
        if (debug) console.log("Branches moveBranchDown", activeBranch, branches);

        const index = getActiveBranchIndex();

        if (index === -1 || index >= branches.length) return false;
        
        window.socket.forrestEmit('moveBranchDown', {treeId: activeTree._id, branchId: activeBranch.branchId});

    }

    const addBranch = () => {
        if (debug) console.log('Branches addBranch', activeTree, activeBranch);
        if (!activeTree || !activeBranch) return;

        window.socket.forrestEmit('addBranch', {treeId: activeTree._id, branchId: activeBranch.branchId});
    }

    const deleteBranch = () => {
        if (debug) console.log('Branches deleteBranch', activeTree, activeBranch);
        if (!activeTree || !activeBranch) return;
        let result = focusNextBranch();
        if (!result) result = focusPrevBranch();

        window.socket.forrestEmit('deleteBranch', {treeId: activeTree._id, branchId: activeBranch.branchId});
    }

    const handleKeys = e => {
        const { key, keyCode, ctrlKey, shiftKey } = e;
        if (debug) console.log('Branches handleKeys', key, shiftKey);

        switch(key) {
            case 'Enter':
                addBranch();
                break;
            case 'ArrowRight':
                break;
            case 'ArrowLeft':
                break;
            case 'ArrowDown':
                if (shiftKey) moveBranchDown() 
                else focusNextBranch();
                break;
            case 'ArrowUp':
                if (shiftKey) moveBranchUp()
                else focusPrevBranch();
                break;
            case 'Backspace':
                if (shiftKey) deleteBranch();
                break;    
        }
    }

    const getBranchesIndex = id => {
        let index = -1;
        for (let i = 0; i < branches.length; ++i) {
           if (branches[i].branchId === id) {
            index = i;
            break;
           }
        }
        return index;
    }

    const deleteBranchEvent = info => {
        if (debug) console.log('Branches deleteBranchEvent', info, branches);

        const { treeId, branchId } = info;

        const index = getBranchesIndex(branchId);

        if (debug) console.log('Branches deleteBranchEvent index', index);
        // IMPORTANT TODO: REMOVE CHILDREN WHEN HIERARCHY EXISTS

        if (index > -1) {
            const branchesCopy = _.cloneDeep(branches);
            branchesCopy.splice(index, 1);
            setBranches(branchesCopy);
        }
    }

    const moveBranchUpEvent = info => {
        if (debug) console.log('branches moveBranchUpEvent', info);

        const { treeId, branchId } = info;

        const index = getBranchesIndex(branchId);

        if (debug) console.log('Branches moveBranchUpEvent index', index);

        // IMPORTANT TODO: MOVE CHILDREN WHEN HIERARCHY EXISTS

        if (index > 0) {
            let branchesCopy = _.cloneDeep(branches);
            const branch = branchesCopy.splice(index, 1)[0];
            branchesCopy.splice(index-1, 0, branch);
            setBranches(branchesCopy);
        }
    }

    const moveBranchDownEvent = info => {
        if (debug) console.log('Branches moveBranchDownEvent', info);

        const { treeId, branchId } = info;

        const index = getBranchesIndex(branchId);

        if (debug) console.log('Branches moveBranchDownEvent index', index);

        // IMPORTANT TODO: MOVE CHILDREN WHEN HIERARCHY EXISTS

        if (index !== -1 && index < branches.length - 1) {
            let branchesCopy = _.cloneDeep(branches);
            const branch = branchesCopy.splice(index, 1)[0];
            branchesCopy.splice(index+1, 0, branch);
            setBranches(branchesCopy);
        }
    }


    const myAsyncFunction = async () => {
        await window.socket.forrestSetEventHandler('deleteBranch', deleteBranchEvent);
        await window.socket.forrestSetEventHandler('moveBranchUp', moveBranchUpEvent);
        await window.socket.forrestSetEventHandler('moveBranchDown', moveBranchDownEvent);
    }

    myAsyncFunction();

    const handleSearch = e => {
        setActiveBranch(null); 
        setSearch((e.detail && e.detail.value) || '')
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
                onIonChange={handleSearch}
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
                                search={search}
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