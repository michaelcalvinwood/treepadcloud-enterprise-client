import { createSlice } from '@reduxjs/toolkit';

const sliceBranchNames = createSlice({
    name: 'branchNames',
    initialState: {},
    reducers: {
        setBranchName: (state, action) => {
            const { treeId, branchId, branchName } = action.payload;
            if (state[treeId] === 'undefined') state[treeId] = {};
            state[treeId][branchId] = branchName;
            return state;
        }
    }
});

export const { setBranchName } = sliceBranchNames.actions;

export default sliceBranchNames.reducer;