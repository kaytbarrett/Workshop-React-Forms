import { useState } from 'react'

export default function SignUpForm({setToken}) {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

async function handleSubmit (event) {
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
                    onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: {" "}<input 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button>Submit</button>
            </form>
        </>
    )
}