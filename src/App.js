import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Dashboard_Page from "./pages/dashboard_page";
import Users_page from "./pages/users_page";
import Settings_page from "./pages/setting_page";
import Team_page from "./pages/team_page";
import TicketDetails from "./pages/ticket_details_page";
import TeamDetails from "./pages/team_detail_page";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 w-screen flex">
      <Router>
        <div className="w-1/4 bg-white xl:w-1/5 ">
          <Dashboard />
        </div>
        <div className="w-3/4 min-h-screen bg-gray-100 xl:w-4/5">
          <Switch>
            <Route component={Dashboard_Page} path="/" exact />
            <Route component={Users_page} path="/users" exact />
            <Route component={Settings_page} path="/settings" exact />
            <Route component={Team_page} path="/teams" exact />
            <Route component={TicketDetails} path="/ticket/:id" exact />
            <Route component={TeamDetails} path="/team/:id" exact />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
