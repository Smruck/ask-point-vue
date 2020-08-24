export function navigate(route, component) {
    if(component.$router.history.current.name !== route) { component.$router.push(route); }
}