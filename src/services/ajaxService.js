import { cookies } from "../components/Login";

export function ajaxService(url) {
    return fetch('http://127.0.0.1:8000/' + url, {
        headers: {'Authorization': 'Token ' + cookies.get('user_token')}
    }).then((data) => {
        return data.json();
    });
}