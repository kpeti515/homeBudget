import React from 'react';
// import './App.css'
import { Box, useColorMode } from '@chakra-ui/core';
import Navbar from './Components/Navbar';

const App = function () {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: 'white.500', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };

  return (
    <Box height="100vh" className="App" bg={bgColor[colorMode]} color={color[colorMode]}>
      <header className="App-header">
        <Navbar
          color={color}
          bgColor={bgColor}
          toggleColorMode={toggleColorMode}
          colorMode={colorMode}
        />
      </header>
    </Box>
  );
};

export default App;
