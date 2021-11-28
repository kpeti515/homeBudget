/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  getAuth, signOut,
} from 'firebase/auth';

import {
  Box, IconButton, Heading, Flex, Text,
} from '@chakra-ui/core';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export const Navbar = ({
  user, setUser, colorMode, toggleColorMode,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    setUser(false);
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing="-.1rem">
          <Link to="/">Zsebpénz app</Link>
          <IconButton bg="teal.500" mx={4} onClick={toggleColorMode} icon={colorMode === 'light' ? 'sun' : 'moon'} />
        </Heading>
      </Flex>

      {user && <p>{user.displayName}</p>}
      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>

        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      {user
      && (
      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        flexGrow={1}
        justifyContent="flex-end"
      >
        <MenuItems>Fiókok:</MenuItems>
        <MenuItems><Link to="/Andi" onClick={handleToggle}>Andi</Link></MenuItems>
        <MenuItems><Link to="/Lóri" onClick={handleToggle}>Lóri</Link></MenuItems>
        <MenuItems><Link to="/Teszt" onClick={handleToggle}>Teszt</Link></MenuItems>
        <MenuItems><button type="button" onClick={handleLogout}>Kijelentkezés</button></MenuItems>

      </Box>
      )}
      {user && <img src={user.photoURL} width="40px" style={{ borderRadius: '50%' }} alt="avatar" />}
    </Flex>
  );
};

MenuItems.propTypes = {
  children: PropTypes.node.isRequired,
};

Navbar.propTypes = {
  colorMode: PropTypes.string.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};
Navbar.defaultProps = {
  user: null,
};