//import { useState, useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Activities from "./components/Activities";
import NavBar from "./components/NavBar";
import Routines from "./components/routines";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState();
  const [userToken, setUserToken] = useState(null);
  const [activities, setActivities] = useState();
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:3000/api/routines");
  //     console.log(response);
  //     const jsonData = await response.json();
  //     console.log(jsonData);
  //     setData(jsonData);
  //   }
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <NavBar userToken={userToken} user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  userToken={userToken}
                  setUserToken={setUserToken}
                  user={user}
                  setUser={setUser}
                />
              }
            ></Route>
            <Route
              path="/routines"
              element={
                <Routines
                  userToken={userToken}
                  setUserToken={setUserToken}
                  activities={activities}
                  setActivities={setActivities}
                />
              }
            ></Route>
            <Route
              path="/activities"
              element={
                <Activities
                  userToken={userToken}
                  setUserToken={setUserToken}
                  activities={activities}
                  setActivities={setActivities}
                />
              }
            ></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
