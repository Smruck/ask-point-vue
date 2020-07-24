const state = require("../services/state.js");
const authService = require('../services/auth-service.js');

export async function login(data) {
    const body = JSON.stringify({ email: data.email, password: data.password });
    const header = await authService.nonAuthHeader('POST', body);
    const response = await fetch(`${state.domain.url}/api/login`,  header);
    if(response.ok) {   
       const body =  await response.json(); 
       await state.updateUserState(body);
       return true;
    }
    return false;
}