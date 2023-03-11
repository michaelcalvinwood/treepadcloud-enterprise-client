import store from "../store/configureStore";
import { addConnection } from "../store/sliceSockets";

export const subscribe = resource => {
    const curState = store.getState();
    
    const test = curState.sockets.find(socket => socket.connection === 'yoyo');
    if (!test) store.dispatch(addConnection({connection: 'yoyo'}));
    else console.log('already connected');
}