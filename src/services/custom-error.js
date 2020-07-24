export function setError(error, elementId) {
    const element = document.getElementById(elementId);
    const button = document.getElementById("btn");
    if(element && button) { element.setCustomValidity(error); setTimeout(() => { button.click(); }, 10); }
}