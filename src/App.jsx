import React from 'react';
// import './App.css'
import { Box, useColorMode } from '@chakra-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { UserPage } from './Components/UserPage';
import { Login } from './Components/Login';

export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'black' };
  const color = { light: 'black', dark: 'white' };

  return (
    <Router>
      <Box bg={bgColor[colorMode]} color={color[colorMode]} display="flex" justifyContent="center" minHeight="100vh">
        <Box width={[
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
            />
          </header>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/:id">
              <UserPage />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};
