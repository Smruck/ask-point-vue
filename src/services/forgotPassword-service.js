const state = require("../services/state");
const authService = require('../services/auth-service.js');

export async function send(email) {
    const password = newPass();
    const updateRes = await updateUser(email, password);
    if(updateRes) { return true; }
    return false
}
export function newPass() {
    let password = '';
    for (let index = 0; index < 10; index++) { password = password + (Math.floor(Math.random() * 10)); }
    return password;
}
async function updateUser(email, password) {
    const body = JSON.stringify({ email: email, password: password });
    const header = await authService.nonAuthHeader("PUT", body);
    const response = await fetch(`${state.domain.url}/api/forgotpass`, header);
    if(response.ok) { return true }
    return false
}