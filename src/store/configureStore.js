import { configureStore } from '@reduxjs/toolkit';
import socketsReducer from './sliceSockets';
import tokensReducer from './sliceTokens';

const store = configureStore({ 
    reducer: {
       sockets: socketsReducer,
       tokens: tokensReducer
    }
});

export default store;