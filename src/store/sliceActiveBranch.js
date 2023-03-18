import { createSlice } from '@reduxjs/toolkit';

const sliceActiveBranch = createSlice({
    name: 'activeBranch',
    initialState: null,
    reducers: {
        setActiveBranch: (state, action) => {
            const { branch } = action.payload;
            return branch;
        },
        blur: (state, action) => {
            const { curBranchId } = action.payload;
            if (!state) return null;
            if (state._id === curBranchId) return null;
        }
    }
});

export const { setActiveBranch, blur } = sliceActiveBranch.actions;

export default sliceActiveBranch.reducer;