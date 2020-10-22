import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import UserPage from "./UserPage";


function Navbar() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Áttekintés</Link>
        </li>
        <li>
          <Link to="/Andi">Andi</Link>
        </li>
        <li>
          <Link to="/Lori">Lóri</Link>
        </li>
        <li>
          <Link to="/Teszt">Teszt</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/:id" children={<UserPage />} />
      </Switch>
    </Router>
  );
}

export default Navbar;