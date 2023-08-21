//import { useState, useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Activities from "./components/Activites";
import NavBar from "./components/NavBar";
import Routines from "./components/routines";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userToken, setUserToken] = useState(null);

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
          <NavBar userToken={userToken} />
          <Routes>
            <Route
              path="/"
              element={
                <Login userToken={userToken} setUserToken={setUserToken} />
              }
            ></Route>
            <Route
              path="/routines"
              element={
                <Routines userToken={userToken} setUserToken={setUserToken} />
              }
            ></Route>
            <Route
              path="/activites"
              element={
                <Activities userToken={userToken} setUserToken={setUserToken} />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
