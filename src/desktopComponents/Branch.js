import './Branch.scss';
import React, { useContext, useEffect, useState } from 'react';


const Branch = ({branch}) => {
    const debug = true;
    const [name, setName] = useState('');

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

    return (
        <div 
            className={focused ? "branch branch--focused" : 'branch'} 
            key={id}>
            <input
                //ref={inputRef}
                onChange={handleBranchNameChange}
                //onFocus={() => setFocus(id)}
                //onBlur={() => handleBlur(id)}
                //onKeyUp={(e) => handleKeyUp(e, id)}
                className={inputClassName()}
                type='text' 
                value={name}
                placeholder={'Enter branch name'} 
            />
        </div>
    )
}

export default Branch;