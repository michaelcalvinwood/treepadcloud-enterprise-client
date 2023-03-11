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

}

const setForrestSocketEvents = socket => {
}

window.socket.connectToForrest = () => {
  }

window.socket.forrestEmit = (msg, data) => {  
}

window.socket.forrestSetEventHandler = async (msg, callback) => {
} 

