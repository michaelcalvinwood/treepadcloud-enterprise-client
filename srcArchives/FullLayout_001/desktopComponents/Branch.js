import './Branch.scss';
import React, { useContext, useEffect, useRef } from 'react';
import * as socketIo from '../utils/resourceServerEmit';
import AppContext from '../data/AppContext';
import * as branchUtil from '../utils/branch-util';
import * as monitor from '../utils/eventMonitor';

const Branch = props => {
    const { curBranch } = props;
    const {id, name, level} = curBranch;
    const appCtx = useContext(AppContext);
    const inputRef = useRef();

    const { curBranchId, branches, setBranches } = appCtx;

    const p = 'Branch.js '

    const isFocused = () => {
        const { curBranchId, activeSection } = appCtx;

        monitor.events(['inputBranchName', 'branchFocus'], {p: p + 'isFocused', curBranchId, activeSection, curBranch});

        if (!curBranchId) return false;

        if (curBranchId !== curBranch.id) return false;

        if (activeSection !== 'branches') return false;

        return true;
    }

    const focused = isFocused();

    monitor.events(['inputBranchName'], {p, curBranch, focused});

    const handleBranchNameChange = e => {
        const branchName = e.target.value;
        const branchId = id;

        const info = {
            socket: appCtx.userInfo.resourceSocket,
            branchId,
            branchName,
            treeId: appCtx.curTreeId,
            ancestors: [],
            token: appCtx.userInfo.token
        }

        appCtx.changeBranchName(branchId, branchName);

        socketIo.setBranchName(info);

    }

    const setFocus = branchId => {
        let focusBranch = appCtx.branches.find(branch => branch.id === branchId);
        if (focusBranch) { 
            appCtx.setCurBranchId(focusBranch.id);
                
            if (appCtx.activeSection !== 'branches') 
                appCtx.setActiveSection('branches');
        }
    }

    const handleBlur = branchId => {
        monitor.events(['blurBranch'], {branchId, appCtx});
    }

    const handleKeyUp = (e, branchId) => {
        const { altKey, code, ctrlKey, key, keyCode, shiftKey } = e;

        monitor.events(['keyUp'], {p: 'Branch.js handleKeyUp', branchId, altKey, code, ctrlKey, key, keyCode, shiftKey, e})
        

        switch (key.toLowerCase()) {
            case 'enter':
                if (!altKey && !ctrlKey && !shiftKey)
                    branchUtil.insertSibling(branchId, appCtx);

                if (shiftKey && !ctrlKey)
                    branchUtil.insertChild(branchId, appCtx);

                if (ctrlKey && !shiftKey)
                // branchUtil.insertParent(branchId, branch, setBranches, branches, setBranches);
                break;
            case 'arrowup':
                // if (!shiftKey) branchUtil.moveFocusUp(branchId, appCtx);
                // else branchUtil.moveBranchUp(branchId, branch, setBranches, branches, setBranches);
                break;
            case 'arrowdown':
                // if (!shiftKey) branchUtil.moveFocusDown(branchId, appCtx);
                // else branchUtil.moveBranchDown(branchId, appCtx);
                break;
            case 'arrowright':
                // if (shiftKey) branchUtil.indent(branchId, branch, setBranches, branches, setBranches);
                break;
            case 'arrowleft':
                // if (shiftKey) branchUtil.outdent(branchId, branch, setBranches, branches, setBranches);
                break;
            case 'c':
                // if (ctrlKey) branchUtil.copy(branchId, branch, setBranches, branches, setBranches);
                break;
            case 'p':
                // if (ctrlKey) branchUtil.paste(branchId, branch, setBranches, branches, setBranches);
                break;
            case 'backspace':
                if (shiftKey) branchUtil.deleteBranch(branchId, appCtx);

        }
    }

    useEffect(() => {
        if (focused) inputRef.current.focus();
    })

    const inputClassName = () => {
        let className = 'branch__input';
        className += ` branch__input--level-${curBranch.level}`;
        if (focused) className += ' branch__input--focused';
        return className;
    }

    return (
        <div 
            className={focused ? "branch branch--focused" : 'branch'} 
            key={id+name}>
            <input
                ref={inputRef}
                onChange={handleBranchNameChange}
                onFocus={() => setFocus(id)}
                onBlur={() => handleBlur(id)}
                onKeyUp={(e) => handleKeyUp(e, id)}
                className={inputClassName()}
                type='text' 
                value={name ? name : ''}
                placeholder={name ? '' : 'enter name'} />
        </div>
    )
}

export default Branch;