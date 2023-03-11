import { createSlice } from '@reduxjs/toolkit';

const sliceSockets = createSlice({
    name: 'sockets',
    initialState: [],
    reducers: {
        addConnection: (state, action) => {
            state.push({connection: 'yoyo'});
        }
    }
});

export const { addConnection } = sliceSockets.actions;

export default sliceSockets.reducer;