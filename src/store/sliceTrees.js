import { createSlice } from '@reduxjs/toolkit';
import * as branchUtils from '../utils/branch-utils';

const sliceTrees = createSlice({
    name: 'trees',
    initialState: [],
    reducers: {
        addTrees: (state, action) => {
            const { resource, trees } = action.payload;
            for (let i = 0; i < trees.length; ++i) {
                let test = state.find(tree => tree._id === trees[i]._id);
                if (!test) {
                    trees[i].resource = resource;
                    state.push(trees[i]);
                }
            }
        },
        clearTrees: (state, action) => [],
        deleteTree: (state, action) => {
            const { treeId } = action.payload;
            state = state.filter(tree => {
                return tree._id !== treeId
            });
            return state;
        },
        setBranches: (state, action) => {
            const { treeId, branches } = action.payload;
            const tree = state.find(tree => tree._id === treeId);
            if (!tree) return state;
            tree.branches = branches;
            return state;
        },
    }
});

export const { addTrees, clearTrees, deleteTree } = sliceTrees.actions;

export default sliceTrees.reducer;