const state = require('../services/state.js');
const authService = require('../services/auth-service.js');

export async function change(component) {
    const body = getBody(component);
    const data = await authService.hashData(body);
    const header =  await authService.getHeader("PUT", JSON.stringify({ data: data })); 
    const response = await fetch(`${state.domain.url}/api/users/${state.userstate.key}`, header);
    if(response.ok) { 
        state.updateUserState(await JSON.parse(body));
        state.message.mess = "Your profile was sucessfully updated";
        return true;
    }
    return false;
}
function getBody(component) {
    const username = component.username ? component.username : state.userstate.username;
    return component.password ?
    JSON.stringify({ password: component.password, username: username, _id: state.userstate.key }) :
    JSON.stringify({ username: username, _id: state.userstate.key }); 
}