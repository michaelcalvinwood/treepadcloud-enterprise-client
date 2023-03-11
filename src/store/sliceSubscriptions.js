import { createSlice } from '@reduxjs/toolkit';

const sliceSubscriptions = createSlice({
    name: 'subscriptions',
    initialState: [],
    reducers: {
        addSubscription: (state, action) => {
            const { resource, host, token, status } = action.payload;
            state.push({resource, host, token, status});
        }
    }
});

export const { addSubscription } = sliceSubscriptions.actions;

export default sliceSubscriptions.reducer;