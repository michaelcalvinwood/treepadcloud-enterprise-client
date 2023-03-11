import { configureStore } from '@reduxjs/toolkit';
import socketsReducer from './sliceSockets';

const store = configureStore({ 
    reducer: {
       sockets: socketsReducer
    }
});

export default store;