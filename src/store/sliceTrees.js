import { createSlice } from '@reduxjs/toolkit';

const sliceTrees = createSlice({
    name: 'trees',
    initialState: [],
    reducers: {
        addTrees: (state, action) => {
            const { trees } = action.payload;
            for (let i = 0; i < trees.length; ++i) {
                let test = state.find(tree => tree._id === trees[i]._id);
                if (!test) state.push(trees[i]);
            }
        },
        clearTrees: (state, action) => []
    }
});

export const { addTrees, clearTreeds} = sliceTrees.actions;

export default sliceTrees.reducer;