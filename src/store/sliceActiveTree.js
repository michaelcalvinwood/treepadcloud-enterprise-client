import { createSlice } from '@reduxjs/toolkit';

const sliceActiveTree = createSlice({
    name: 'activeTree',
    initialState: null,
    reducers: {
        setActiveTree: (state, action) => action.payload.activeTree
    }
});

export const { setActiveTree } = sliceActiveTree.actions;

export default sliceActiveTree.reducer;