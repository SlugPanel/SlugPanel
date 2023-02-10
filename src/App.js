import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import useToken from "./useToken";
import './App.css'
import AccountGenerator from "./Admin/AccountGenerator/AccountGenerator";
import Register from "./Register/Register";
import Landing from "./Landing";

function App() {
    const {token, setToken} = useToken();
    useEffect(() => {
        document.title="Usar Panel v1.0"
    }, [])

    if(!token) {
        return <Landing setToken={setToken}/>
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