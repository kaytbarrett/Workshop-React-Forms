import { useState } from 'react'

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const URL = 'https://fsa-jwt-practice.herokuapp.com/signup'
            const data = {
                username: username,
                password: password,
            };

            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
            setToken(result.token);

        } catch (error) {
            setError(error.message);
        }

    }

    return (
        <>
            <h2>Sign up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: {" "} <input
                        value={username}
                        onChange={(e) => {
                            const value = e.target.value
                            setUsername(value);
                            if (value.length < 8) {
                                setUsernameError('Username must be at least eight characters in length');
                            } else {
                                setUsernameError('');
                            }
                        }} />
                </label>
                <label>
                    Password: {" "}<input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)} />
                </label>
                {usernameError && <p className="error">{usernameError}</p>}
                <button id="button">Submit</button>
            </form>
        </>
    )
}