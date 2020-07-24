const state = require("../services/state");
const authService = require("../services/auth-service.js");
const errorService = require("../services/custom-error.js");

export async function register(data) {
    const body = JSON.stringify({ email: data.email, username: data.username });
    const header = await authService.nonAuthHeader("POST", body);
    const response = await fetch(`${state.domain.url}/api/register`, header);
    if(response.status === 401) { errorService.setError('Please provide existing email address', 'email'); return false; }
    if(response.status === 409) { errorService.setError('User with this email is already registered', 'email'); return false; }
    if(response.ok) { return true; }
    return false;
}