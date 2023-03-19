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
                    name: branchName ? branchName : null,
                    lastChanged: timestamp(),
                    fetched: false
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
        },
        setFetchedTrue: (state, action) => {
            const { branchId } = action.payload;
            if (state[branchId]) state[branchId].fetched = true;
        }
    }
});

export const { setBranchName, clearBranchNames, clearLastChanged, setFetchedTrue } = sliceBranchNames.actions;

export default sliceBranchNames.reducer;