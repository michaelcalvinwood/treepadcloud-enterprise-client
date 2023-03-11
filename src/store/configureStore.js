import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from './sliceSubscriptions';
import tokensReducer from './sliceTokens';

const store = configureStore({ 
    reducer: {
       subscriptions: subscriptionsReducer,
       tokens: tokensReducer
    }
});

export default store;