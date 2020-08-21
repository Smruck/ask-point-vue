const state = require("../services/state");
const authService = require('../services/auth-service.js');
const errorService = require("../services/custom-error.js");

async function send(email) {
    const password = authService.generateRandomNumber();
    return await updateUser(email, password);
}
async function updateUser(email, password) {
    const body = JSON.stringify({ email: email, password: password });
    const header = await authService.nonAuthHeader("PUT", body);
    const response = await fetch(`${state.domain.url}/api/forgotpass`, header);
    if(response.ok) { return true }
    return false
}
export async function processSend(that) {
    that.showLoader = true;
    if(!that.email) { 
      that.showLoader = false; 
      errorService.setError("Type your email and we will send you a new password", "email"); 
      return; 
    }
    const result = await send(that.email); 
    if(result) { this.$router.push('checkemail'); }
    errorService.setError("Provided email address doesn't exist in the system", "email"); 
    that.showLoader = false;
}