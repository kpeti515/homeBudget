import React, { useState } from 'react';
// import './App.css'
import { Box, useColorMode } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { Navbar } from './Components/Navbar';
import { UserPage } from './Components/UserPage';
import { Login } from './Components/Login';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  auth.onAuthStateChanged((userInfo) => {
    if (userInfo) {
      setUser(userInfo);
    }
    setIsLoading(false);
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'black' };
  const color = { light: 'black', dark: 'white' };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Router>
      <Box
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        display="flex"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box
          width={[
            '100%', // base
            '100%', // 480px upwards
            '100%', // 768px upwards
            '990px', // 992px upwards
          ]}
        >
          <header className="App-header">
            <Navbar
              toggleColorMode={toggleColorMode}
              colorMode={colorMode}
              setUser={setUser}
              user={user}
            />
          </header>
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            {!user ? (
              <Redirect to="/login" />
            ) : (
              <Route path="/:id">
                <UserPage />
              </Route>
            )}
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};
