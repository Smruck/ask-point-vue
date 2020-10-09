const authService = require('./auth-service.js');
const state = require('./state.js');

export async function sendMail(from_id, to_id, content) {
  const body = JSON.stringify({ from_id: from_id, to_id: to_id, content: content });
  const options = await authService.getHeader('POST', body);
  const response = await fetch(`${state.domain.url}/api/email`, options);
  if(response.ok) { return true; }
  return false;
}