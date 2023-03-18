import './Branch.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';
import branchOpenIcon from '../assets/icons/branch-open.svg';
import branchClosedIcon from '../assets/icons/branch-closed.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveBranch } from '../store/sliceActiveBranch';

const Branch = ({search, branch, setBranchName, toggleBranch}) => {
    const debug = true;
    const inputRef = useRef();
    const dispatch = useDispatch();


    const activeBranch = useSelector(state => state.activeBranch);

    const active = activeBranch && branch.branchId === activeBranch.branchId ? true : false;

    if (debug) console.log('Branch active', branch.branchId, active);

    const id = branch.branchId;
  
    const inputClassName = () => {
        let className = 'branch__input';
        className += ` branch__input--level-${branch.level}`;
        if (focused) className += ' branch__input--focused';
        return className;
    }
    let focused = false;

    const handleBranchNameChange = e => {
        const branchName = e.target.value;
        if (debug) console.log("Branch handleBranchNameChange", branchName);
        // update database and all subscribers
        window.socket.forrestEmit('setBranchName', {id, name: branchName})
        setBranchName({branchId: branch.branchId, branchName})
    }

    const handleFocus = () => {
        if (debug) console.log('Branch handleFocus', branch);
        dispatch(setActiveBranch({branch}));
    }

    const handleBlur = () => {
        if (activeBranch === branch) dispatch(setActiveBranch({branch: null}));;
    }

    const handleKeyUp = e => {
        if (debug) console.log('Branch handleKeyUp', e);

    }


    useEffect(() => {
        if (active) inputRef.current.focus();
    })

    if (search && branch.name.toLowerCase().indexOf(search.toLowerCase()) === -1) return;


    if (!branch.isShown) return <div></div>;

    return (
          <div 
            className={active ? "branch branch--focused" : 'branch'} 
            key={id}>
            <div className='branch--image-container'>
                <img 
                    onClick={() => toggleBranch(branch.branchId)}
                    src={branch.isOpen ? branchOpenIcon : branchClosedIcon} 
                    className={branch.isParent ? "branch--image" : "branch--image__hidden"}
                />
            </div>
            <input
                ref={inputRef}
                onChange={handleBranchNameChange}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                //onKeyUp={handleKeyUp}
                placeholder='New Branch'
                className={inputClassName()}
                type='text' 
                value={branch.name}
                
            />
        </div> 
    )
}

export default Branch;