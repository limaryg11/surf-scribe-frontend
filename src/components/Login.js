import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login operation using the provided email and password
    // You can use axios or fetch to make a login API request to your backend
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            name='email'
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
        />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            name='password'
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
