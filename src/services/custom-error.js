export function setError(error, elementId) {
    const button = document.getElementById('btn');
    const element = document.getElementById(elementId);
    if(element && button) { 
        element.setCustomValidity(error);
        setTimeout(() => { button.click(); }, 3); 
        setTimeout(() => { element.setCustomValidity(''); }, 1600);
    }
}