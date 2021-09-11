import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Locations from "./components/screens/Locations";
import Location from "./components/screens/Location";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import React, { useEffect, useState } from "react";
import NotFound from "./components/screens/NotFound";

export const UserContext = React.createContext();
function App(props) {
  const [userData, setUserData] = useState({});
  const UpdateUserData = (action) => {
    switch (action.type) {
      case "LOGOUT":
        setUserData("");
        localStorage.clear();
        break;
      case "LOGIN":
        setUserData(action.payload);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userData, UpdateUserData }}>
        <Router>
          <Switch>
            <Route path="/" exact component={Locations} />
            <Route path="/location/:id" component={Location} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/create" exact component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
