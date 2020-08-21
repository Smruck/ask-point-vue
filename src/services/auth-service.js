const state = require('../services/state.js');
const CryptoJs = require('crypto-js');
const btoa = require('btoa');
const { v4: uuidv4 } = require('uuid');

export async function getHeader(method, body) {
    if(body) { 
        return { 
            method: `${method}`, 
            mode:'cors',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Event': state.eventstate.token,
                'User': state.userstate.token,
                'App': await getAppKey()
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
            'Event': state.eventstate.token,
            'User': state.userstate.token,
            'App': await getAppKey()
        },
    }
}

export function generateUuid() { return uuidv4(); }

export function generateRandomNumber() {
    let number = '', index = 0;
    while(index++ < 10) { number += (Math.floor(Math.random() * 10)); }
    return number;
}

export async function hashData(data) { return await groundState(data); }
export async function deHashData(data) { return await deGroundState(data); }
async function groundState(data) { return await initialSetKeys(data); }
async function deGroundState(data) { return await deInitialSetKeys(data); }
async function initialSetKeys(data) { return await secondSet(atob(getText()), data); }
async function deInitialSetKeys(data) { return await deSecondSet(atob(getText()), data); }
async function secondSet(key, data) { return (CryptoJs.AES.encrypt(data, key)).toString(); }
async function deSecondSet(key, data) { 
    return (CryptoJs.AES.decrypt(data, key)).toString(CryptoJs.enc.Utf8); 
}
async function getAppKey() { return await hashData(btoa(getKey())); }
function getKey() { return state.appkey; }
function getText() { return state.apptext; }