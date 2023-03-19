import './Branch.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';
import branchOpenIcon from '../assets/icons/branch-open.svg';
import branchClosedIcon from '../assets/icons/branch-closed.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveBranch, blur } from '../store/sliceActiveBranch';
import { setBranchName, clearLastChanged } from '../store/sliceBranchNames';
import * as socketUtils from '../utils/socket-utils';

const Branch = ({search, branch, toggleBranch, branchName}) => {
    console.log('Branch', search, branch, toggleBranch, branchName);
    const debug = true;
    const inputRef = useRef();
    const dispatch = useDispatch();

    const activeBranch = useSelector(state => state.activeBranch);

    const active = activeBranch && branch._id === activeBranch._id ? true : false;

    const id = branch._id;

    let lastChanged = null;

    const timestamp = () => {
        const currentDate = new Date(); 
        return currentDate. getTime();
    }
  
    const inputClassName = () => {
        let className = 'branch__input';
        className += ` branch__input--level-${branch.level}`;
        if (focused) className += ' branch__input--focused';
        return className;
    }
    let focused = false;
    
    const handleNameChange = (branch, e) => {
        const branchId = branch._id;
        const branchName = e.target.value;
        dispatch(setBranchName({branchId, branchName}));
        lastChanged = timestamp();

        console.log('lastChanged', lastChanged);
    }

    const handleBlur = e => {
        const branchId = branch._id;
        const branchName = e.target.value;

        dispatch(blur({curBranchId: branchId}))
        if (branchName.lastChanged) {
            dispatch(clearLastChanged({branchId: branch._id}));
            socketUtils.emitUpdateBranchName({branchId, branchName});
        }
    }

    const handleKeyUp = e => {
        if (debug) console.log('Branch handleKeyUp', e);

    }

    useEffect(() => {
        if (active) inputRef.current.focus();

        let intervalId = setInterval(() => {
           
            if (branchName.lastChanged) {
                const curTime = timestamp();
                if (curTime - branchName.lastChanged >= 2500) {
                    dispatch(clearLastChanged({branchId: branch._id}));
                    socketUtils.emitUpdateBranchName({branchId: branch._id, branchName: branchName.name});
                }
            }
        }, 500);

        // let secondInterval = setInterval(() => {
        //     console.log('here');
        // }, 2000)

        return (
            () => clearInterval(intervalId)
        );
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
                onChange={(e) => handleNameChange(branch, e)}
                onFocus={() => dispatch(setActiveBranch({branch}))}
                onBlur={handleBlur}
                //onKeyUp={handleKeyUp}
                placeholder='New Branch'
                className={inputClassName()}
                type='text' 
                value={branchName.name ? branchName.name : ''}
                
            />
        </div> 
    )
}

export default Branch;