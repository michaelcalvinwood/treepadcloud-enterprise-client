import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from './sliceSubscriptions';
import tokensReducer from './sliceTokens';
import treesReducer from './sliceTrees';
import activeTreeReducer from './sliceActiveTree';

const store = configureStore({ 
    reducer: {
       subscriptions: subscriptionsReducer,
       tokens: tokensReducer,
       trees: treesReducer,
       activeTree: activeTreeReducer
    }
});

export default store;