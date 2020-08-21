const state = require("../services/state.js");
const authService = require('../services/auth-service.js');
const messageService = require('../services/message-service.js');

export async function login(loginComponent) {
    const body = JSON.stringify({ email: loginComponent.email, password: loginComponent.password });
    const hashedData = await authService.hashData(body);
    const header = await authService.getHeader('POST', JSON.stringify({ data: hashedData }));
    const response = await fetch(`${state.domain.url}/api/login`,  header);
    if(response.ok) {   
       const body =  await response.json(); 
       state.updateUserState(body);
       if(state.userstate.key === state.eventstate.admin && state.eventstate.key) { await messageService.loadDeleted(); }
       return true;
    }
    return false;
}