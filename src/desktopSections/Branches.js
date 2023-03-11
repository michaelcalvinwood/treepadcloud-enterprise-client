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

const Branches = ({sections, treeName, toggleSection, activeTree, activeBranch, changeActiveBranch}) => {
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

        changeActiveBranch(branches[index-1]);
        return true;
    }

    const focusNextBranch = () => {
        if (debug) console.log('Branches focusNextBranch', activeBranch, branches);

        const index = getActiveBranchIndex();

        if (debug) console.log('Branches focusNextBranch index', index);
        if (index === -1) return false;

        if (index >= branches.length - 1) return false;

        changeActiveBranch(branches[index+1]);
        return true;
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
        if (!activeTree || !activeBranch) return;

        switch(key) {
            case 'Enter':
                addBranch();
                break;
            case 'ArrowRight':
                if (shiftKey) window.socket.forrestEmit('moveBranchRight', {treeId: activeTree._id, branchId: activeBranch.branchId});
                break;
            case 'ArrowLeft':
                if (shiftKey) window.socket.forrestEmit('moveBranchLeft', {treeId: activeTree._id, branchId: activeBranch.branchId});
                break;
            case 'ArrowDown':
                if (shiftKey)  window.socket.forrestEmit('moveBranchDown', {treeId: activeTree._id, branchId: activeBranch.branchId}); 
                else focusNextBranch();
                break;
            case 'ArrowUp':
                if (shiftKey) window.socket.forrestEmit('moveBranchUp', {treeId: activeTree._id, branchId: activeBranch.branchId});
                else focusPrevBranch();
                break;
            case 'Backspace':
                if (shiftKey) deleteBranch();
                break;    
        }
    }

    const getBranchesIndex = (id, array = branches) => {
        let index = -1;
    
        for (let i = 0; i < array.length; ++i) {
           if (array[i].branchId === id) {
            index = i;
            break;
           }
        }
        return index;
    }

    const setBranchName = ({branchId, branchName}) => {
        const branchesCopy = _.cloneDeep(branches);
        const branch = branchesCopy.find(branch => branch.branchId === branchId);
        if (!branch) return;
        if (branch.name !== branchName) {
            branch.name = branchName;
            setBranches(branchesCopy);
        }
    }

    const toggleBranch = branchId => {
        if (debug) console.log('Branches toggleBranch', branchId);
        const branchesCopy = _.cloneDeep(branches);
        const index = getBranchesIndex(branchId, branchesCopy);
        if (index === -1) return false;
        if (!branchesCopy[index].isParent) return false;
        
        if (!branchesCopy[index].isOpen) {
            branchesCopy[index].isOpen = true;
            const targetLevel = branchesCopy[index].level + 1;
            if (debug) console.log('Branches toggleBranch targetLevel', targetLevel, index);
            for (let i = index + 1; i < branchesCopy.length; ++i) {
                if (branchesCopy[i].level === targetLevel) branchesCopy[i].isShown = true;
                else break;
            }
            if (debug) console.log('Branches toggleBranch targetLevel', targetLevel, index,  branchesCopy);
            setBranches(branchesCopy);
        } else {
            branchesCopy[index].isOpen = false;
            const currentLevel = branchesCopy[index].level;
            if (debug) console.log('Branches toggleBranch currentLevel', currentLevel, index);
            for (let i = index + 1; i < branchesCopy.length; ++i) {
                if (branchesCopy[i].level > currentLevel) branchesCopy[i].isShown = false;
                else break;
            }
            if (debug) console.log('Branches toggleBranch currentLevel', currentLevel, index,  branchesCopy);
            setBranches(branchesCopy);
        }

    }

    /*
     * Branch utility functions
     */

    function insertIntoArray(arr, pos, el) {
        for (let i = 0; i < el.length; ++i) arr.splice(pos + i, 0, el[i]);
    }

    const prevSiblingIndex = (branches, index) => {
        if (index <= 0) return false;
        if (index >= branches.length) return false;
      
        const level = branches[index].level;
        for (let i = index - 1; i >= 0; --i) {
          if (branches[i].level === level) return i;
        }
      
        return false;
      }

      const numChildren = (branches, index) => {
        if (index === branches.length - 1) return 0;
        const level = branches[index].level;
        let count = 0;
        for (let i = index + 1; i < branches.length; ++i) {
          if (branches[i].level > level) ++count;
          else return count;
        }
      }

    /*
     * set and handle branch events
     */

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

    const moveBranchRight = ({ treeId, branchId }) => {
        if (debug) console.log('Branches moveBranchRight', treeId, branchId);

        let branchesCopy = _.cloneDeep(branches);
        const index = getBranchesIndex(branchId, branchesCopy);

        if (debug) console.log('Branches moveBranchRightEvent index', index);

        // if (index === -1) return false;
        // if (index === 0) return false;
        // if (branchesCopy[index].level >= 5) return false;
        // if (branchesCopy[index].level > branchesCopy[index-1].level) return false;

        const num = numChildren(branchesCopy, index);

        for (let i = 0; i < num + 1; ++i) ++branchesCopy[index+i].level;
        
        ++branchesCopy[index].level;
        setBranches(branchesCopy);
    }

    const moveBranchLeft = ({ treeId, branchId }) => {
        if (debug) console.log('Branches moveBranchLeft', treeId, branchId);

        let branchesCopy = _.cloneDeep(branches);
        const index = getBranchesIndex(branchId, branchesCopy);

        // Move branch and its children left
        const curChildren = numChildren(branchesCopy, index);
        for (let i = index; i <= index + curChildren; ++i) --branchesCopy[i].level;

        // Find previous sibling of branch
        const prevSibling = prevSiblingIndex(branchesCopy, index);

        if (prevSibling) {
            // Remove branch and its children
            const removed = branchesCopy.splice(index, curChildren + 1);
    
            // Insert the removed branchesCopy after the prevSibling and its children
            const prevSiblingChildren = numChildren(branchesCopy, prevSibling);
            insertIntoArray(branchesCopy, prevSibling + prevSiblingChildren + 1, removed);
    
            if (prevSiblingChildren === 0) {
                branchesCopy[prevSibling].isParent = false;
                branchesCopy[prevSibling].isOpen = false;
            }
        }

        setBranches(branchesCopy);
    }

    const myAsyncFunction = async () => {
        await window.socket.forrestSetEventHandler('setBranchName', setBranchName);
        await window.socket.forrestSetEventHandler('deleteBranch', deleteBranchEvent);
        await window.socket.forrestSetEventHandler('moveBranchUp', moveBranchUpEvent);
        await window.socket.forrestSetEventHandler('moveBranchDown', moveBranchDownEvent);
        await window.socket.forrestSetEventHandler('moveBranchRight', moveBranchRight);
        await window.socket.forrestSetEventHandler('moveBranchLeft', moveBranchLeft);
        
        
    }

    myAsyncFunction();

    const handleSearch = e => {
        changeActiveBranch(null); 
        setSearch((e.detail && e.detail.value) || '')
    }

    useEffect(() => {
        if (debug) console.log("Branches useEffect", curTree, activeTree);
        if (activeTree && curTree !== activeTree) {
            if (curTree !== activeTree) {
                setCurTree(activeTree);
                let branches = activeTree.branches;
                for (let i = 0; i < branches.length; ++i) {
                    branches[i].name=null;
                    branches[i].isOpen=false;
                    
                    // set isParent
                    if (i === branches.length - 1) branches[i].isParent = false;
                    else if (branches[i].level < branches[i+1].level) branches[i].isParent = true;
                    else branches[i].isParent = false;

                    // set isShown
                    branches[i].isShown = branches[i].level === 0 ? true : false;
                    window.socket.forrestEmit('getBranchName', {id: branches[i].branchId})
                }

                setBranches(branches);
            }
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
                                changeActiveBranch={changeActiveBranch}
                                setBranchName={setBranchName}
                                toggleBranch={toggleBranch}
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