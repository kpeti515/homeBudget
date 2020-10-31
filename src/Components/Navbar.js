import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Box, IconButton, Heading, Flex, Text } from "@chakra-ui/core";
import UserPage from "./UserPage";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

function Navbar(props) {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  // const { colorMode, toggleColorMode } = useColorMode();
  // const bgColor = { light: "white.500", dark: "gray.900" };
  // const color = { light: "black", dark: "white" };
  return (
    <>
      <Router >
        <Box bg={props.bgColor[props.colorMode]} color={props.color[props.colorMode]} display="flex" justifyContent="center">
          <Box width={[
            "100%", // base
            "100%", // 480px upwards
            "100%", // 768px upwards
            "990px", // 992px upwards
          ]}>
            <Flex
              as="nav"
              align="center"
              justify="space-between"
              wrap="wrap"
              padding="1.5rem"
              bg="teal.500"
              color="white"
              {...props}
            >
              <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                  <Link to="/">Zsebpénz app</Link>
                  <IconButton bg="teal.500" mx={4} onClick={props.toggleColorMode} icon={props.colorMode === "light" ? "sun" : "moon"} />
                </Heading>
              </Flex>

              <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
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

              <Box
                display={{ sm: show ? "block" : "none", md: "flex" }}
                width={{ sm: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
              >
                <MenuItems><Link to="/Andi" onClick={handleToggle}>Andi</Link></MenuItems>
                <MenuItems><Link to="/Lóri" onClick={handleToggle}>Lóri</Link></MenuItems>
                <MenuItems><Link to="/Teszt" onClick={handleToggle}>Teszt</Link></MenuItems>
              </Box>


            </Flex>



            <Switch>
              <Route path="/:id" children={<UserPage />} />
            </Switch>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default Navbar;