import React, { useEffect, useState } from 'react';
// import './App.css'
import { Box, useColorMode } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Navbar } from './Components/Navbar';
import { UserPage } from './Components/UserPage';
import { Login } from './Components/Login';
import { login, selectCurrentUser } from './store/user/userSlice';
import { LoadingPage } from './Components/LoadingPage';
import { useTypedSelector } from './store/store';

export const App: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useTypedSelector(selectCurrentUser);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userInfo) => {
      if (userInfo && !user) {
        dispatch(login(userInfo));
      }
      setIsLoading(false);
    });
  }, [auth, dispatch, user]);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'black' };
  const color = { light: 'black', dark: 'white' };
  if (isLoading) {
    return <LoadingPage />;
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
            <Navbar toggleColorMode={toggleColorMode} colorMode={colorMode} />
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
              <Route path="/:account">
                <UserPage />
              </Route>
            )}
          </Switch>
        </Box>
      </Box>
    </Router>
  );
};
