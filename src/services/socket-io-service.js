const state = require("./state");
var socketConnectionInstance;

export function initializeConnection() { 
    if(socketConnectionInstance) { 
        dropSocketConnection(); 
        socketConnectionInstance = undefined 
    }
    socketConnectionInstance = new socketConnection();
}
export function sendMessage(message) { 
    const data = { message: message, room: state.eventstate.name, token: state.eventstate.token };
    socketConnectionInstance.sendMessage(data); 
}
export function deleteMessage(index) { 
    const data = { index: index, room: state.eventstate.name, token: state.eventstate.token };
    socketConnectionInstance.deleteMessage(data); 
}
export function changeLikes(dataobj) { 
    const data = { index: dataobj.index, updown: dataobj.updown, room: state.eventstate.name, token: state.eventstate.token }
    socketConnectionInstance.changeLikes(data); 
}
export function removeDeleted(index) { 
    const data = { index: index, room: state.eventstate.name, token: state.eventstate.token };
    socketConnectionInstance.removeDeleted(data); 
}
export function updateEventNames(event) { 
    const data = { event: event, room: state.eventstate.name, token: state.eventstate.token }
    socketConnectionInstance.updateEventNames(data); 
}
export function deleteAll() { 
    const data = { room: state.eventstate.name, token: state.eventstate.token };
    socketConnectionInstance.deleteAll(data); 
}
export function dropSocketConnection() { 
    socketConnectionInstance.dropSocketConnection();
}

export class socketConnection {

    constructor() {

        this.state = require('../services/state');
        this.token = this.state.eventstate.token;
        this.room = this.state.eventstate.name;
        this.socket = (require('socket.io-client')).connect(state.domain.url); 
        
        this.socket.on('connect', () => { 
            const data = { room: this.room, token: this.token };
            this.socket.emit('join', data); 
        });

        this.socket.on('message', (data) => { 
            this.state.eventstate.messages.push(data.message); 
        });

        this.socket.on('deleteall', (data) => { 
            console.log(data);
            if(this.state.userstate.key === this.state.eventstate.admin) { 
                this.state.eventstate.deleted = []; 
            }
        });

        this.socket.on('delete', (data) => { 
            const message = this.state.eventstate.messages[data.index];
            this.state.eventstate.deleted.push(message);
            this.state.eventstate.messages.splice(data.index, 1); 
        });

        this.socket.on('likes', (data) => { 
            this.state.eventstate.messages[data.index].likes += data.updown; 
        });

        this.socket.on('deleted', (data) => { 
            if(this.state.userstate.key === this.state.eventstate.admin) { 
                this.state.eventstate.deleted.splice(data.index, 1); 
            }
        });

        this.socket.on('event', (data) => { 
            this.state.eventstate.eventNames.names.push(data.event);
        });
    }

    sendMessage(data) { this.socket.emit('message', data); }
    removeDeleted(data) { this.socket.emit('deleted', data); }
    deleteMessage(data) { this.socket.emit('delete', data); }
    changeLikes(data) { this.socket.emit('likes', data); }
    dropSocketConnection() { this.socket.disconnect(true); }
    deleteAll(data) { this.socket.emit('deleteall', data); }
    updateEventNames(event) { this.socket.emit('event', event); }
}