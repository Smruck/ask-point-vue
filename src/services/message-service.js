const state = require("./state");
const authService = require('../services/auth-service.js');
const socketService = require('../services/socket-io-service.js');

export async function loadMessages() {
    const header = await authService.getHeader("GET");
    const response = await fetch(`${state.domain.url}/api/messages/${state.eventstate.key}`, header);
    if(response.ok) { 
        const messages = await response.json();
        if(messages) { state.eventstate.messages = [].concat(messages); }
        return true; 
    }
    return false;
}
export async function loadDeleted() {
    const header = await authService.getHeader("GET");
    const response = await fetch(`${state.domain.url}/api/deleted/${state.eventstate.key}`, header);
    if(response.ok) { 
        const messages = await response.json();
        if(messages) { state.eventstate.deleted = [].concat(messages); }
        return true; 
    }
    return false;
}      
export async function removeMessage(index) { 
 
    const message_id = state.eventstate.messages[index]._id;
    cleanVoted(message_id);
    socketService.deleteMessage(index);
    const header = await authService.getHeader('DELETE');
    const response = await fetch(`${state.domain.url}/api/messages/${message_id}`, header);
    if(response.ok) { return true; }
    return false;
}
export async function removeDeletedMessage(index) { 

    const message_id = state.eventstate.deleted[index]._id;
    socketService.removeDeleted(index);
    const header = await authService.getHeader('DELETE');
    const response = await fetch(`${state.domain.url}/api/deleted/${message_id}`, header);
    if(response.ok) { return true; }
    return false;
}
export async function changeLikes(index, updown) {

    const message_id = state.eventstate.messages[index]._id;
    state.voted.messages.push(message_id);
    socketService.changeLikes({ index, updown });
    const body = JSON.stringify({ updown: updown });
    const header = await authService.getHeader('PUT', body);
    await fetch(`${state.domain.url}/api/messages/${message_id}`, header);
}
export async function sendMessage(content) {
   
    const username = state.userstate.username ? state.userstate.username : 'anonymous';
    const _id = authService.generateUuid();
    const newMessage = { _id: _id, content: content, event_id: state.eventstate.key, user_id: state.userstate.key, username: username, date: getDateAsString(), image: state.userstate.image, likes: 0 };
    socketService.sendMessage(newMessage);
    const body = JSON.stringify(newMessage);
    const header = await authService.getHeader('POST', body);
    const response = await fetch(`${state.domain.url}/api/messages`, header);
    if(response.ok) { return true; }
    return false;
}
export function updateState(component) {
    setInterval(() => { 
        component.messages = state.eventstate.messages; 
        component.messNumber = state.eventstate.messages.length;
    }, 100);
}
export function handleModal() {
    setTimeout(() => {
        const element = document.getElementById("modal");
        if (element) { element.style.display = "none"; }
        state.message.mess = null;
    }, 3000);
}

function getDateAsString() { 
    return new Date().toString().substring(0, 24); 
}
function cleanVoted(_id) { 
    const index = state.voted.messages.indexOf(_id); state.voted.messages.splice(index, 1); 
}