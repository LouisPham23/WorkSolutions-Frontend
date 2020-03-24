import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Dashboard_Page from "./pages/dashboard_page";
import Calendar_page from "./pages/calendar_page";
import Settings_page from "./pages/setting_page";
import Team_page from "./pages/team_page";

import { Calendar } from "react-feather";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 w-screen flex">
      <Router>
        <div className="w-1/4 bg-white xl:w-1/5">
          <Dashboard />
        </div>
        <div className="w-3/4 min-h-screen bg-gray-100 xl:w-4/5">
          <Switch>
            <Route component={Dashboard_Page} path="/" exact />
            <Route component={Calendar_page} path="/calendar" exact />
            <Route component={Settings_page} path="/settings" exact />
            <Route component={Team_page} path="/team" exact />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
