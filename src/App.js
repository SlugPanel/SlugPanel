import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import useToken from "./useToken";

function App() {
    const {token, setToken} = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
      <div>
          <Router>
              <Routes>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/" element={<Dashboard />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;