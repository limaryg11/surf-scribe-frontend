import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // need to implement registration operation using email and password
    // also need to use axios to make registration API request to backend if I can do it!!
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='registerEmail'>Email:</label>
          <input
            id='registerEmail'
            name='registerEmail'
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='registerPass'>Password:</label>
          <input
            id='registerPass'
            name='registerPass'
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPass'>Confirm Password:</label>
          <input
            id='form-group'
            name='form-group'
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}

export default Register;
