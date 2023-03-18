import { createSlice } from '@reduxjs/toolkit';

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
            const test = state.filter(tree => tree._id !== treeId);
        }
    }
});

export const { addTrees, clearTrees, deleteTree } = sliceTrees.actions;

export default sliceTrees.reducer;