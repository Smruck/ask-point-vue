const state = require('../services/state.js');
const authService = require('../services/auth-service.js');

export async function getSuggestions(name) {
    if(state.eventNames.names.length > 0) { return state.eventNames.names.filter(x => x.toLowerCase().includes(name)).slice(0, 10); }
    return [];
}
export async function getAllEvents() {
    const header = await authService.nonAuthHeader('GET');
    const result = await fetch(`${state.domain.url}/api/events`, header);
    if (result.ok) {
        const names = await result.json();
        state.eventNames.names = names;
    }
}
export async function saveNewEvent(name, password) {
    const body = JSON.stringify({ name: name, password: password, admin: state.userstate.key, date: new Date() })
    const header = await authService.nonAuthHeader('POST', body);
    const response = await fetch(`${state.domain.url}/api/events`, header);
    if (response.ok) {
        const event = await response.json();
        await setCurrentEvent(event);
        return true;
    }
    return false;
}
export async function checkEventPassword(data) {
    const body = JSON.stringify(data);
    const header = await authService.nonAuthHeader('POST', body);
    const response = await fetch(`${state.domain.url}/api/signevent`, header);
    if (response.ok) {
        const event = await response.json();
        setCurrentEvent(event);
        return true;
    }
    else { return false; }
}
export async function setCurrentEvent(event) {
    state.eventstate.key = event._id;
    state.eventstate.name = event.name;
    state.eventstate.date = event.date;
    state.eventstate.admin = event.admin;
    return true;
}