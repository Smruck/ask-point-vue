const state = require("../services/state.js");
const authService = require('../services/auth-service.js');
const socketService = require('../services/socket-io-service.js');

export async function deleteAll() {
    if (state.eventstate.deleted.length > 0) {
        socketService.deleteAll();
        const body = JSON.stringify({id: state.eventstate.key});
        const header = await authService.getHeader('DELETE', body);
        await fetch(`${state.domain.url}/api/deleted`, header);
    }
}
const updateState =  function(component) {
    setInterval(function() {
        component.messages = state.eventstate.deleted; 
        component.messagesCount = state.eventstate.deleted.length; 
    }, 100); 
}
export { updateState as updateState };

export async function checkCredentials(component) {
    if(!state.userstate.key) { component.$router.push('login'); return; }
    if(state.userstate.key === state.eventstate.admin) { return; }
    component.$router.push('messages'); 
}

