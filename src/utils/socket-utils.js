import { add } from "ionicons/icons";
import store from "../store/configureStore";
import { addConnection } from "../store/sliceSockets";
import socketIOClient from "socket.io-client";


export const subscribe = (resource, token) => {
    const curState = store.getState();
    const resourceParts = resource.split('_');

    switch(resourceParts[0]) {
        case 'u':
            const test = curState.sockets.find(socket => socket.resource === resource);
            if (test) return ('already subscribed!');
            const host = `https://${resourceParts[1]}.treepadcloud.com:6102`;
            const connection = socketIOClient(host);
            //console.log('connection', connection);
            store.dispatch(addConnection({resource, host, connection}));
            break;
    }


    // const test = curState.sockets.find(socket => socket.connection === 'yoyo');
    // if (!test) store.dispatch(addConnection({connection: 'yoyo'}));
    // else console.log('already connected');
}