console.log('socket-lib');

const setForrestEvents = name => {
    console.log('setForrestEvents');
    socket = window.socket.connections[name];
    socket.emit('token', window.token);

    
}