import { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  return (
    <>
      <p>Email</p>
      <input type="text" name="email" onChange={handleEmailChange} value={email} />
      <p>Jelszó</p>
      <input type="password" name="password" onChange={handlePasswordChange} value={password} />
      <div>
        <button type="submit">Bejelentkezés</button>
      </div>
      <div>
        <button type="button">Bejelentkezés Google fikókkal</button>
      </div>
      <div>
        <button type="button">Bejelentkezés Facebook fikókkal</button>
      </div>
    </>
  );
};
