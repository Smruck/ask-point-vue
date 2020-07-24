const state = require("../services/state.js");


export function nonAuthHeader(method, body) { 
    if(body) { 
        return {
            method: `${method}`, 
            mode:'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            }, 
            body: body 
        }
    }
    return {
        method: `${method}`, 
        mode:'cors',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
        },
    }
}

export async function authHeader(method, body) {
    if(body) { 
        return { 
            method: `${method}`, 
            mode:'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Askpoint': state.userstate.token
            }, 
            body: body 
        }
    }
    return { 
        method: `${method}`, 
        mode:'cors',
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Askpoint': state.userstate.token
        },
    }
}