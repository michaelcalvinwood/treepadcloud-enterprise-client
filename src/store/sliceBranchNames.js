import { createSlice } from '@reduxjs/toolkit';

const timestamp = () => {
    const currentDate = new Date(); 
    return currentDate.getTime();
}

const sliceBranchNames = createSlice({
    name: 'branchNames',
    initialState: {},
    reducers: {
        setBranchName: (state, action) => {
            const { branchId, branchName } = action.payload;
            if (!state[branchId]) {
                state[branchId] = {
                    name: branchName ? branchName : '',
                    lastChanged: timestamp()
                }
                return state;
            }

            if (state[branchId].name !== branchName) {
                state[branchId].name = branchName;
                state[branchId].lastChanged = timestamp();
                return state;
            }
            
        },
        clearBranchNames: (state, action) => ({}),
        clearLastChanged: (state, action) => {
            const { branchId } = action.payload;
            state[branchId].lastChanged = null;
        }
    }
});

export const { setBranchName, clearBranchNames, clearLastChanged } = sliceBranchNames.actions;

export default sliceBranchNames.reducer;