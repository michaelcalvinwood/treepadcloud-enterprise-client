import { add } from "ionicons/icons";
import store from "../store/configureStore";
import { addSubscription } from "../store/sliceSubscriptions";
import socketIOClient from "socket.io-client";
import { addTrees } from "../store/sliceTrees";

const sockets = {};

const handleSocketEvents = (socket, resource) => {
  socket.on('msg', info => console.log('serverMsg: ',info));
  socket.on('addTrees', info => eventAddTrees(socket, info));
}

function eventAddTrees (socket, {resource, trees}) {
    store.dispatch(addTrees({trees}));
}

export const subscribe = (resource, token) => {
    console.log('subscribe', resource, token);
    if (sockets[resource]) return ('already subscribed!');
    const resourceParts = resource.split('--');

    switch(resourceParts[0]) {
        case 'u':
            const host = `https://${resourceParts[1]}.treepadcloud.com:6102`;
            sockets[resource] = socketIOClient(host);
            const socket = sockets[resource];
            
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

export const createTree = data => sockets[`u--${data.ownerName}`].emit('createTree', data);

