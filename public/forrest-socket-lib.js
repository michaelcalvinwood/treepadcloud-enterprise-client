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

const getBranchName = ({id, name}) => {
  const debug = true;
  if (debug) console.log('forrest-socket-lib getBranchName', id, name);
  if ( window.eywa.setBranchName[id]) window.eywa.setBranchName[id](name);
}

const setForrestSocketEvents = socket => {
  console.log('setForrestEvents', socket);
  
  socket.on('message', data => showMessage(data.msg))
  socket.on('connect_error', (err) => showMessage(`connect_error due to ${err.message}`)) 
  socket.on('getBranchName', data => getBranchName(data));
  
  socket.emit('token', window.token);

}

window.socket.connectToForrest = () => {
    if (!window.socket.isUser()) return;
    const name = window.token.info.userName;
    if (window.socket.connections[name]) return;
    
    console.log('connectToForrest', name);
    window.socket.connections[name] = io.connect(`https://${name}.treepadcloud.com:6102`);
    let socket = window.socket.connections[name];
    setForrestSocketEvents(socket);
  }

window.socket.forrestEmit = (msg, data) => {  
    if (!window.socket.isUser()) return;
    const { userName } = window.token.info;
    data.userName = userName;
  
    console.log('forrestEvent emit', msg, data);
    window.socket.connections[userName].emit(msg, data);
}

window.socket.forrestSetEventHandler = async (msg, callback) => {
  const debug = true;

  if (!window.socket.isUser()) return;
  const { userName } = window.token.info;

  if (debug) console.log('forrestSetEventHandler', msg);

  const socket = window.socket.connections[userName];

  if (!window.socket.callbacks[msg]) {
    window.socket.callbacks[msg] = callback;
    if (debug) console.log('forrestSetEventHandler: creating socket event', msg);
    await socket.on(msg, data => {
      console.log('forrestEvent on', msg, data);
      window.socket.callbacks[msg](data)
    });
    return;
  } 

  window.socket.callbacks[msg] = callback;
} 

