export const BASEURL = "http://localhost:8080/";

export function callApi(reqmethod, url, data, responseHandler) {
    var option;
    if(reqmethod === "GET" || reqmethod === "DELETE") {
        option = {
            method: reqmethod,
            headers: {'Content-Type': 'application/json'}
        };
    } else {
        option = {
            method: reqmethod,
            headers: {'Content-Type': 'application/json'},
            body: data
        };
    }
    
    fetch(url, option)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status + " " + response.statusText);
            }
            return response.text();
        })
        .then(data => responseHandler(data))
        .catch(error => {
            console.error('API Error:', error);
            alert('Error: ' + error.message);
        });
}

export function setSession(key, value, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

export function getSession(key) {
    let name = key + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
