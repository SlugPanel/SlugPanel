import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import './App.css'
import AccountGenerator from "./Admin/AccountGenerator/AccountGenerator";
import Register from "./Register/Register";
import Landing from "./Landing";

//todo figure out how to return to root component on login

function App() {
    useEffect(() => {
        document.title="Usar Panel v1.0"
    }, [])

    if(!token) {
        return <Landing />
    }

    return (
      <div className={"App"}>
          <Router>
              <Routes>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/generate" element={<AccountGenerator />} />
                  <Route exact path='/register' element={<Register />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;