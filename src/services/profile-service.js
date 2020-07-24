const state = require('../services/state.js');
const authService = require('../services/auth-service.js');

export async function change(data) {
    const body = getBody(data);
    const header =  await authService.nonAuthHeader("PUT", body); 
    const response = await fetch(`${state.domain.url}/api/users/${state.userstate.key}`, header);
    if(response.ok) { 
        state.updateUserState(await JSON.parse(body));
        state.message.mess = "Your profile was sucessfully updated";
        return true;
    }
    return false;
}
function getBody(data) {
    const username = data.username ? data.username : state.userstate.username;
    return data.password ?
    JSON.stringify({ password: data.password, username: username, _id: state.userstate.key }) :
    JSON.stringify({ username: username, _id: state.userstate.key }); 
}