import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

function App() {
    const [token, setToken] = useState();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
      <div>
          <Router>
              <Routes>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/" element={<Login />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;