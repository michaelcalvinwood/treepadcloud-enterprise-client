console.log('forrest-emits');

window.socket = {};
window.socket.connections = {};
window.socket.callbacks = {};

const showMessage = msg => window.setToast ? window.setToast(msg) : '';

window.socket.isUser = () => {
  if (!window.token) return false;
  if (!window.token.info) return false;
  if (!window.token.info.userName) return false;

  return true;
}
/*
 * SocketIO Error Events
 *
    error
    connect_error
    connect_timeout
    reconnect
    reconnecting
    reconnect_error
    reconnect_failed
  */

window.socket.connectToForrest = () => {
    if (!window.socket.isUser()) return;
    const name = window.token.info.userName;
    if (window.socket.connections[name]) return;
    
    console.log('connectToForrest', name);
    window.socket.connections[name] = io.connect(`https://${name}.treepadcloud.com:6102`);
    let socket = window.socket.connections[name];
    socket.on('message', data => showMessage(data.msg))
    socket.on('connect_error', (err) => showMessage(`connect_error due to ${err.message}`)) 
    socket.emit('token', window.token);
  }

window.socket.forrestEmit = (msg, data) => {  
    if (!window.socket.isUser()) return;
    const { userName } = window.token.info;
    data.userName = userName;
  
    console.log('forrestEmit', msg, data);
    window.socket.connections[userName].emit(msg, data);
}

window.socket.forrestOn = async (msg, callback) => {
  if (!window.socket.isUser()) return;
  const { userName } = window.token.info;

  console.log('forrestOn', msg);

  const socket = window.socket.connections[userName];
  if (!window.socket.callbacks[msg]) {
    await socket.on(msg, data => window.socket.callbacks[msg](data));
  }
  window.socket.callbacks[msg] = callback;
} 

