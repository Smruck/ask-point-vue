const state = require('../services/state.js');
const socketService = require('../services/socket-io-service.js');
const FormData = require('form-data');

export async function saveImage(file) {


    const formData = new FormData();
    formData.append('file', file);
    const options = { method: 'POST',  mode:'cors', body: formData }
    const response = await fetch(`${state.domain.url}/api/avatars/${state.userstate.key}`, options);
    if(response.ok) {
        const body = await response.json();
        socketService.updateAvatar(body.link);
        const reader = new FileReader();
        const element = document.getElementById("input");
        state.message.mess = "Your profile was sucessfully updated";
        state.userstate.image = body.link;
        reader.onload = function(e) { document.getElementById("img").setAttribute("src", e.target.result); };
        reader.readAsDataURL(element.files[0]);
    }
}