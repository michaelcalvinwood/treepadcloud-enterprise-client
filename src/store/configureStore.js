import { configureStore } from '@reduxjs/toolkit';
import subscriptionsReducer from './sliceSubscriptions';
import tokensReducer from './archive--sliceTokens';
import treesReducer from './sliceTrees';
import activeTreeReducer from './sliceActiveTree';
import activeBranchReducer from './sliceActiveBranch';
import branchNamesReducer from './sliceBranchNames';

const store = configureStore({ 
    reducer: {
       subscriptions: subscriptionsReducer,
       trees: treesReducer,
       activeTree: activeTreeReducer,
       activeBranch: activeBranchReducer,
       branchNames: branchNamesReducer
    }
});

export default store;