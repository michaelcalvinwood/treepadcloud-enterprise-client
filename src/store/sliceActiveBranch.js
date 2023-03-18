import { createSlice } from '@reduxjs/toolkit';

const sliceActiveBranch = createSlice({
    name: 'activeBranch',
    initialState: null,
    reducers: {
        setActiveBranch: (state, action) => {
            const { branch } = action.payload;
            return branch;
        }
    }
});

export const { addSubscription } = sliceActiveBranch.actions;

export default sliceActiveBranch.reducer;