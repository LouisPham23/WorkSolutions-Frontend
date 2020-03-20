import React from "react";
import { Home, Key, Calendar } from "react-feather";
import { Link } from "react-router-dom";
import "../tailwind/style.css";

const Dashboard = () => {
  return (
    <div>
      <div className="px-2 pt-8 pb-16 ">
        <h1 className="font-bold text-lg text-center">
          WorksSolutions
          <span className="border-2 border-indigo-300 ml-2 rounded">
            <Key className="inline-block fill-current text-indigo-600 self-center h-8 w-8 px-1" />
          </span>
        </h1>
      </div>
      <div className="flex px-8 mt-2 py-2 hover:text-gray-800 text-gray-600 dashboard_table lg:px-16 xl:px-18 ">
        <div className="">
          <Link to="/" className="flex justify-between">
            <Home className="h-6 w-6 text-indigo-200" />
            <h1 className="font-bold pl-4 text-sm">Dashboard</h1>
          </Link>
        </div>
      </div>
      <div className="flex px-8 mt-2 py-2 hover:text-gray-800 text-gray-600 dashboard_table lg:px-16 xl:px-18">
        <div className="">
          <Link to="/calendar" className="flex justify-between">
            <Calendar className="h-6 w-6 text-indigo-200" />
            <h1 className="font-bold pl-4 text-sm">Calendar</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
