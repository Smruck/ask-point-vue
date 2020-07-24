const userstate = { username: null, key: null, email: null, image: null,  token: null };
const eventstate = { name: null, key: null, admin: null, date: null, messages: [], deleted: [], token: null };
const eventNames = { names: [] };
const message = { mess: null };
const loop = { go: false };
const domain = { url: "http://localhost:8000" };
const time = { stamp: 1 };
const update = { gate: true };
const deleted = { gate: true };
const likes = { ids: [] };
const repo = { email: '' }

export { userstate as userstate };
export { loop as loop };
export { eventstate as eventstate };
export { eventNames as eventNames };
export { message as message };
export { domain as domain };
export { time as time };
export { update as update };
export { deleted as deleted };
export { likes as likes };
export { repo as repo };

export function clearEventState() { 
    eventstate.name = null; 
    eventstate.key = null, 
    eventstate.admin = null, 
    eventstate.date = null, 
    eventstate.messages = [] 
}
export function clearUserState() { 
    userstate.username = null; 
    userstate.key = null;
    userstate.email = null; 
    userstate.image = null; 
    userstate.token = null;
    update.gate = true;
    deleted.gate = true;
    message.mess = "You have successfully logged out";
}
export function updateUserState(body) { 
    userstate.username = body.username ? body.username : userstate.username; 
    userstate.image = body.image ? body.image : userstate.image; 
    userstate.key = body._id ? body._id : userstate.key; 
}
export function updateEventDeleted(array) { eventstate.deleted = array; }
export function updateEventMessages(array) { eventstate.messages = array; }