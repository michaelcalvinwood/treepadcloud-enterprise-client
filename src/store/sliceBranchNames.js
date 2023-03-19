import { createSlice } from '@reduxjs/toolkit';

const sliceBranchNames = createSlice({
    name: 'branchNames',
    initialState: {},
    reducers: {
        setBranchName: (state, action) => {
            const { branchId, branchName } = action.payload;
            state[branchId] = branchName;
            return state;
        },
        clearBranchNames: (state, action) => ({})
    }
});

export const { setBranchName, clearBranchNames } = sliceBranchNames.actions;

export default sliceBranchNames.reducer;