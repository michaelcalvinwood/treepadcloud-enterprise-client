import { add } from "ionicons/icons";
import store from "../store/configureStore";
import { addSubscription } from "../store/sliceSubscriptions";
import socketIOClient from "socket.io-client";
import { addTrees, deleteTree } from "../store/sliceTrees";
import { clearActiveTree } from "../store/sliceActiveTree";

const sockets = {};

const getSocketResource = resourceId => {
    console.log('getSocketResource', resourceId);
    const parts = resourceId.split('--');
    switch (parts[0]) {
        case 'T':
            return parts[1];
        case 'B':
            return parts[3];
    }

}

const handleSocketEvents = (socket, resource) => {
  socket.on('msg', info => console.log('serverMsg: ',info));
  socket.on('addTrees', info => addTreesEvent(socket, info));

  socket.on('deleteTree', treeId => {
    console.log('socket-utils on deleteTree', treeId);
    store.dispatch(deleteTree({treeId}))
    store.dispatch(clearActiveTree({treeId}))
  });

  
}

function addTreesEvent (socket, {resource, trees}) {
    store.dispatch(addTrees({resource, trees}));
}

export const subscribe = (resource, token) => {
    console.log('subscribe', resource, token);
    if (sockets[resource]) return ('already subscribed!');
    const resourceParts = resource.split('--');

    switch(resourceParts[0]) {
        case 'u':
            const host = `https://${resourceParts[1]}.treepadcloud.com:6102`;
            sockets[resourceParts[1]] = socketIOClient(host);
            const socket = sockets[resourceParts[1]];
            
            socket.on('hello', () => socket.emit('subscribe', {resource, token}));
            socket.on('subscribe', status => {
                store.dispatch(addSubscription({resource, host, token, status}))
                if (status === 'success') handleSocketEvents(socket, resource);
                else socket.disconnect();
            })

            break;
    }
}

export const getBranchName = data => {
    
}

export const createTree = data => sockets[data.userName].emit('createTree', data);

export const emitDeleteTree = treeId => {
    const resource = getSocketResource(treeId);
    sockets[resource].emit('deleteTree', treeId);
}

export const emitAddBranch = data => {
    const { treeId, siblingBranchId } = data;
    const resource = getSocketResource(treeId);
    sockets[resource].emit('addBranch', data);
}

export const emitUpdateBranchName = data => {
    const { branchId, branchName } = data;
    const resource = getSocketResource(branchId);
}