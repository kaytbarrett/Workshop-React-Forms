import { useState } from 'react'


export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
  
    async function handleClick() {
      try {
        const Url = 'https://fsa-jwt-practice.herokuapp.com/authenticate'

        const response = await fetch(Url,
            {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                }   
               }
            );
        const result = await response.json();
        setSuccessMessage(`${result.message} Username: ${result.data.username}`);
      } catch (error) {
        setError(error.message);
      }
    }
  
    return (
      <div>
        <h2>Authenticate</h2>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <button id="button" onClick={handleClick}>Authenticate Token!</button>
      </div>
    );
  }