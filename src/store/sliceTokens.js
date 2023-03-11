import { createSlice } from '@reduxjs/toolkit';

const sliceTokens = createSlice({
    name: 'tokens',
    initialState: [],
    reducers: {
        addToken: (state, action) => {
            const { resource, token } = action.payload;
            state.push({resource, token});
        },
        clearTokens: (state, action) => []
    }
});

export const { addToken, clearTokens} = sliceTokens.actions;

export default sliceTokens.reducer;