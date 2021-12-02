import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, IconButton, Heading, Flex, Text } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../store/user/userSlice';

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export const Navbar = ({ colorMode, toggleColorMode }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleLogout = async () => {
    dispatch(logout());
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
        <Heading as="h1" fontSize="24">
          <Link to="/">Zsebpénz app</Link>
          <IconButton
            bg="teal.500"
            mx={4}
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          />
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

      {user && (
        <Box
          display={{ sm: show ? 'block' : 'none', md: 'flex' }}
          width={{ sm: 'full', md: 'auto' }}
          flexGrow={1}
          justifyContent="flex-end"
        >
          <MenuItems>Fiókok:</MenuItems>
          <MenuItems>
            <Link to="/Andi" onClick={handleToggle}>
              Andi
            </Link>
          </MenuItems>
          <MenuItems>
            <Link to="/Lóri" onClick={handleToggle}>
              Lóri
            </Link>
          </MenuItems>
          <MenuItems>
            <Link to="/Teszt" onClick={handleToggle}>
              Teszt
            </Link>
          </MenuItems>
          <MenuItems>
            <button type="button" onClick={handleLogout}>
              Kijelentkezés
            </button>
          </MenuItems>
        </Box>
      )}
      {user && (
        <img
          src={user.photoURL}
          width="40px"
          style={{ borderRadius: '50%' }}
          alt="avatar"
        />
      )}
    </Flex>
  );
};

MenuItems.propTypes = {
  children: PropTypes.node.isRequired,
};

Navbar.propTypes = {
  colorMode: PropTypes.string.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};
