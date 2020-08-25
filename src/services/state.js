const userstate = { username: null, key: null, email: null, image: null,  token: null };
const eventstate = { name: null, key: null, admin: null, date: null, messages: [], deleted: [], token: null };
const eventNames = { names: [] };
const message = { mess: null };
const domain = { url: "http://localhost:8800" };
const likes = { ids: [] };
const repo = { email: '' }
const voted = { messages: [] }
const appkey = "Àì|¨ÍwÐWvO.7";
const apptext = 'bG9jYWxob3N0';
const currentEvent = null;

export { userstate as userstate };
export { eventstate as eventstate };
export { eventNames as eventNames };
export { message as message };
export { domain as domain };
export { likes as likes };
export { repo as repo };
export { voted as voted };
export { appkey as appkey };
export { apptext as apptext };
export { currentEvent as currentEvent };

export function clearEventState() { 
    eventstate.name = null; 
    eventstate.key = null;
    eventstate.admin = null; 
    eventstate.date = null; 
    eventstate.messages = [];
    eventstate.deleted = [];
    eventstate.token = null;
}
export function clearUserState() { 
    userstate.username = null; 
    userstate.key = null;
    userstate.email = null; 
    userstate.image = null; 
    userstate.token = null;
    message.mess = "You have successfully logged out";
}
export function updateUserState(body) { 
    userstate.username = body.username ? body.username : userstate.username; 
    userstate.image = body.image ? body.image : userstate.image; 
    userstate.key = body._id ? body._id : userstate.key; 
    userstate.token = body.token ? body.token : userstate.token;
}