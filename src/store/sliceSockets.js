import { createSlice } from '@reduxjs/toolkit';

const sliceSockets = createSlice({
    name: 'sockets',
    initialState: [],
    reducers: {
        addConnection: (state, action) => {
            const { resource, host, connection } = action.payload;
            state.push({resource, host, connection});
        }
    }
});

export const { addConnection } = sliceSockets.actions;

export default sliceSockets.reducer;