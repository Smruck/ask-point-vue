const state = require("../services/state");
const authService = require("../services/auth-service.js");
const errorService = require("../services/custom-error.js");

export async function register(component) {
    const body = JSON.stringify({ email: component.email, username: component.username });
    const hashedData = await authService.hashData(body);
    const header = await authService.getHeader("POST", JSON.stringify({ data: hashedData }));
    const response = await fetch(`${state.domain.url}/api/register`, header);
    if(response.status === 401) { errorService.setError('Please provide existing email address', 'email'); return false; }
    if(response.status === 409) { errorService.setError('User with this email is already registered', 'email'); return false; }
    if(response.ok) { 
        const data = JSON.parse(await response.json());
        const token = await authService.deHashData(data.data);
        state.userstate.token = token; 
        return true;  
    }
    return false;
}