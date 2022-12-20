import React, {useState} from 'react';
import Cookies from 'universal-cookie';


export const cookies = new Cookies();
export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();


        fetch('http://127.0.0.1:8000/auth/token/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to login');
                }
                return response.json();
            })
            .then((data) => {
                cookies.set('user_token', JSON.stringify(data.auth_token));
                window.location.href = '/';
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <aside className="main-aside">
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <label>
                    Username:
                    <input type="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <br/>
                <button type="submit">Log In</button>
            </form>
        </aside>
    );
}
