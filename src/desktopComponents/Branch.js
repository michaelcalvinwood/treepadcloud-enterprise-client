import './Branch.scss';
import React, { useContext, useEffect, useState, useRef } from 'react';


const Branch = ({branch, activeBranch, setActiveBranch}) => {
    const debug = true;
    const [name, setName] = useState('');
    const inputRef = useRef();

    if (debug) console.log('Branch', branch, activeBranch)

    const active = activeBranch && branch.branchId === activeBranch.branchId ? true : false;

    if (debug) console.log('Branch active', branch.branchId, active);

    const id = branch.branchId;

    window.eywa.setBranchName[id] = setName;
    window.socket.forrestEmit('getBranchName', {id});
  
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
        setName(branchName)
    }

    const handleFocus = () => {
        if (debug) console.log('Branch handleFocus', branch);
        setActiveBranch(branch);
    }

    const handleBlur = () => {
        if (activeBranch === branch) setActiveBranch(null);
    }

    const handleKeyUp = e => {
        if (debug) console.log('Branch handleKeyUp', e);

    }

    useEffect(() => {
        if (active) inputRef.current.focus();
    })

    return (
        <div 
            className={active ? "branch branch--focused" : 'branch'} 
            key={id}>
            <input
                ref={inputRef}
                onChange={handleBranchNameChange}
                onFocus={() => handleFocus()}
                //onBlur={() => handleBlur()}
                //onKeyUp={handleKeyUp}
                placeholder='New Branch'
                className={inputClassName()}
                type='text' 
                value={name}
                
            />
        </div>
    )
}

export default Branch;