import { createSlice } from '@reduxjs/toolkit';
import * as branchUtils from '../utils/branch-utils';

const sliceActiveTree = createSlice({
    name: 'activeTree',
    initialState: null,
    reducers: {
        setActiveTree: (state, action) => {
            const {activeTree} = action.payload;
            const branches = activeTree.branches;
            const result = [];

            for (let i = 0; i < branches.length; ++i) {
                let obj = {};
                obj._id = branches[i]._id;
                obj.level = branches[i].level;
                obj.name='';
                obj.isOpen=false;
                
                // set isParent
                if (i === branches.length - 1) obj.isParent = false;
                else if (branches[i].level < branches[i+1].level) obj.isParent = true;
                else obj.isParent = false;

                // set isShown
                obj.isShown = branches[i].level === 0 ? true : false;
                //window.socket.forrestEmit('getBranchName', {id: branches[i].branchId})
                result.push(obj);
            }
            return {
                _id: activeTree._id,
                sIndex: activeTree.sIndex,
                icon: activeTree.icon,
                name: activeTree.name,
                desc: activeTree.desc,
                namesFetched: false,
                branches: result
            }
        },
        addBranchToActiveTree: (state, action) => {
            const { treeId, siblingBranchId, newBranch } = action.payload;
            
            if (state._id === treeId) branchUtils.insertBranch(newBranch, siblingBranchId, state.branches);

            return state;
        },
        setNamesFetched: (state, action) => {
            if (!state) return state;
            const {namesFetched} = action.payload;
            state.namesFetched = namesFetched;            
        },
        clearActiveTree: (state, action) => {
            const { treeId } = action.payload;
            if (!treeId) state = null;
            else if (treeId === state._id) state = null;
            return state;
        }
    }
});

export const { setActiveTree, setNamesFetched, clearActiveTree, addBranchToActiveTree } = sliceActiveTree.actions;

export default sliceActiveTree.reducer;