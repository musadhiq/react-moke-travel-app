import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { UserContext } from "../../App";

export default function Nav() {
  const { userData, UpdateUserData } = useContext(UserContext);

  const HandleLogout = () => {
    UpdateUserData({ type: "LOGOUT" });
  };

  return (
    <>
      <div className="wrapper">
        <header>
          <div className="left">
            <h1>
              <img
                src={require("../assets/images/logo.svg").default}
                alt="logo"
              />
            </h1>
          </div>
          <div className="right">
            {userData ? (
              <Link>
                <button onClick={HandleLogout}>Logout</button>
              </Link>
            ) : (
              <Link to="/auth/login">
                <button>Login</button>
              </Link>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
