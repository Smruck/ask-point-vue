const state = require("../services/state");
const authService = require('../services/auth-service.js');

export async function loadMessages() {
    const header = await authService.nonAuthHeader("GET");
    const response = await fetch(`${state.domain.url}/api/messages/${state.eventstate.key}`, header);
    if(response.ok) { 
        const body = await response.json();
        if(state.time.stamp === body.timestamp) { state.update.gate = true; }
        if(state.update.gate) { state.eventstate.messages = [].concat(body.messages); }
        return true; 
    }
    return false;
}
export async function loadDeleted() {
    const header = await authService.nonAuthHeader("GET");
    const response = await fetch(`${state.domain.url}/api/deleted/${state.eventstate.key}`, header);
    if(response.ok) { 
        const body = await response.json();
        if(state.time.stamp === body.timestamp) { state.deleted.gate = true; }
        if(state.deleted.gate) { state.eventstate.deleted = [].concat(body.deleted); }
      return true;
    }
    return false;
}      
export async function removeMessage(index) { 
    state.update.gate = false;
    state.deleted.gate = false;
    state.time.stamp = Date.now();
    const message = state.eventstate.messages[index];
    state.eventstate.deleted.push(message);
    state.eventstate.messages.splice(index, 1);
    const header = await authService.nonAuthHeader('DELETE', JSON.stringify({ timestamp: state.time.stamp }));
    const response = await fetch(`${state.domain.url}/api/messages/${message._id}`, header);
    if(response.ok) { return true; }
    return false;
}
export async function removeDeletedMessage(index, _id) { 
    state.deleted.gate = false;
    state.time.stamp = Date.now();
    state.eventstate.deleted.splice(index, 1); 
    const header = await authService.nonAuthHeader('DELETE', JSON.stringify({ timestamp: state.time.stamp }));
    const response = await fetch(`${state.domain.url}/api/deleted/${_id}`, header);
    if(response.ok) { return true; }
    return false;
}
export async function changeLikes(index, updown) {
    state.update.gate = false;
    state.time.stamp = Date.now();
    state.eventstate.messages[index].likes = updown > 0 ? 
    state.eventstate.messages[index].likes + 1 : 
    state.eventstate.messages[index].likes - 1 ;
    const body = JSON.stringify({ updown: updown, timestamp: state.time.stamp });
    const header = await authService.nonAuthHeader('PUT', body);
    await fetch(`${state.domain.url}/api/messages/${state.eventstate.messages[index]._id}`, header);
}
export async function updateMessages() {
    const resultDeleted = await loadDeleted();
    const resulMessages = await loadMessages();
    if(resulMessages && resultDeleted) {
        if(!state.loop.go) { state.loop.go = true; loop(); } 
        return true;
    }
    return false;
}
export async function sendMessage(content) {
    state.update.gate = false;
    state.time.stamp = Date.now();
    const username = state.userstate.username ? state.userstate.username : 'anonymous';
    const newMessage = { content: content, event_id: state.eventstate.key, user_id: state.userstate.key, username: username, date: getDateAsString(), image: state.userstate.image, likes: 0 };
    const body = await JSON.stringify({ message: newMessage, timestamp: state.time.stamp });
    const header = await authService.nonAuthHeader('POST', body);
    const response = await fetch(`${state.domain.url}/api/messages`, header);
    if(response.ok) { 
        newMessage._id = await response.json();
        state.eventstate.messages.push(newMessage);
        return true; 
    }
    return false;
}

function loop() { setInterval(() => { loadMessages(); loadDeleted(); }, 1000); }
function getDateAsString() { return new Date().toString().substring(0, 24); }
