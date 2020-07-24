const state = require("../services/state.js");
const authService = require('../services/auth-service.js');


export async function deleteAll() {
    state.deleted.gate = false;
    state.time.span = Date.now();
    state.eventstate.deleted = [];        
    const body = JSON.stringify({ event: state.eventstate.key, timestamp: state.time.stamp });
    const header = authService.nonAuthHeader('DELETE', body);
    const response = await fetch(`${state.domain.url}/api/deleted`, header);
    if(response.ok) { return true; }
    return false;
}

