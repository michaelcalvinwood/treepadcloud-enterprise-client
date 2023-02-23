console.log('socket-lib');

const setForrestEvents = name => {
    console.log('setForrestEvents');
    let socket = window.socket.connections[name];
    socket.on('message', data => {
        if (window.setToast) window.setToast(data.msg);
    })
    
    socket.emit('token', window.token);

}