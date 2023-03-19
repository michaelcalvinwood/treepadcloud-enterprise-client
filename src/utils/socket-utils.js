import { add } from "ionicons/icons";
import store from "../store/configureStore";
import { addSubscription } from "../store/sliceSubscriptions";
import socketIOClient from "socket.io-client";
import { addTrees, deleteTree } from "../store/sliceTrees";
import { clearActiveTree } from "../store/sliceActiveTree";
import { setBranchName } from "../store/sliceBranchNames";

const sockets = {};
const dispatch = store.dispatch;

const getSocketResource = resourceId => {
    const parts = resourceId.split('--');
    switch (parts[0]) {
        case 'U':
        case 'T':
            return parts[1];
        case 'L':
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

  socket.on('updateBranchName', ({branchId, branchName}) => dispatch(setBranchName({branchId, branchName})))
}

function addTreesEvent (socket, {resource, trees}) {
    store.dispatch(addTrees({resource, trees}));
}

export const subscribe = (resource, token) => {
    if (sockets[resource]) return ('already subscribed!');
    const socketResource = getSocketResource(resource);
    const host = `https://${socketResource}.treepadcloud.com:6102`;
    sockets[socketResource] = socketIOClient(host);
    const socket = sockets[socketResource];
      
    socket.onAny((eventName, ...args) => {
        console.log(`Event: ${eventName} [${socketResource}]`);
        for (let i = 0; i < args.length; ++i) {
            console.log(`\t${JSON.stringify(args[i], null, 4)}`);
        }
    })

    /*
     * Initial Handshake
     */
    socket.on('hello', () => socket.emit('subscribe', {resource, token}));
    socket.on('subscribe', ({status, resource}) => {
        store.dispatch(addSubscription({resource, host, token, status}))
        if (status === 'success') handleSocketEvents(socket, resource);
        else socket.disconnect();
    })

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

export const emitUpdateBranchName = ({branchId, branchName}) => {
    const resource = getSocketResource(branchId);
    sockets[resource].emit('updateBranchName', {branchId, branchName});
}