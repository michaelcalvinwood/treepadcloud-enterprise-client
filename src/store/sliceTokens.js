import { createSlice } from '@reduxjs/toolkit';

const sliceTokens = createSlice({
    name: 'tokens',
    initialState: [],
    reducers: {
        addToken: (state, action) => {
            const { resource, token } = action.payload;
            state.push({resource, token});
        }
    }
});

export const { addToken} = sliceTokens.actions;

export default sliceTokens.reducer;