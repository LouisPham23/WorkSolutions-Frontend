import React, { useState, useEffect } from "react";
import { Home, Key, Calendar, Settings, User } from "react-feather";
import { Link } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import { Users } from "react-feather";
const Dashboard = () => {
  const [selectDash, setIsSelectedDash] = useState(false);
  const [selectCalendar, setIsSelectedCalendar] = useState(false);
  const [selectSetting, setIsSelectedSetting] = useState(false);
  const [selectTeam, setIsSelectedTeam] = useState(false);

  useEffect(() => {
    setIsSelectedDash(true);
  }, []);

  return (
    <div className="">
      <div className="px-2 pt-8 pb-16 ">
        <h1 className="font-bold text-lg text-center">
          WorksSolutions
          <span className="border-2 border-indigo-300 ml-2 rounded">
            <Key className="inline-block fill-current text-indigo-600 self-center h-8 w-8 px-1" />
          </span>
        </h1>
      </div>
      <div className="flex flex-col justify-between ">
        <div
          className={`flex sm:px-2 md:px-8 mt-8 hover:text-gray-800 text-gray-600 lg:px-16 xl:px-18 ${
            selectDash ? "border-r-4 border-indigo-500 text-gray-800" : ""
          }`}
          onClick={() => {
            setIsSelectedDash(true);
            setIsSelectedCalendar(false);
            setIsSelectedSetting(false);
            setIsSelectedTeam(false);
          }}
        >
          <div className="">
            <Link to="/" className="flex justify-between">
              <Home
                className={`h-6 w-6 text-indigo-200 ${
                  selectDash ? "text-indigo-500" : ""
                }`}
              />
              <h1 className="font-bold pl-4 text-sm">Dashboard</h1>
            </Link>
          </div>
        </div>
        <div
          className={`flex sm:px-2 md:px-8 mt-8 hover:text-gray-800 text-gray-600 lg:px-16 xl:px-18 ${
            selectCalendar ? "border-r-4 border-indigo-500 text-gray-800" : ""
          }`}
          onClick={() => {
            setIsSelectedCalendar(true);
            setIsSelectedDash(false);
            setIsSelectedSetting(false);
            setIsSelectedTeam(false);
          }}
        >
          <div className="">
            <Link to="/users" className="flex justify-between">
              <Users
                className={`h-6 w-6 text-indigo-200 ${
                  selectCalendar ? "text-indigo-500" : ""
                }`}
              />
              <h1 className="font-bold pl-4 text-sm">Employees</h1>
            </Link>
          </div>
        </div>
        <div
          className={`flex sm:px-2 md:px-8 mt-8 hover:text-gray-800 text-gray-600 lg:px-16 xl:px-18 ${
            selectTeam ? "border-r-4 border-indigo-500 text-gray-800" : ""
          }`}
          onClick={() => {
            setIsSelectedSetting(false);
            setIsSelectedCalendar(false);
            setIsSelectedDash(false);
            setIsSelectedTeam(true);
          }}
        >
          <div className="">
            <Link to="/teams" className="flex justify-between">
              <TiGroup
                className={`h-6 w-6 text-indigo-200 ${
                  selectTeam ? "text-indigo-500" : ""
                }`}
              />
              <h1 className="font-bold pl-4 text-sm">Teams</h1>
            </Link>
          </div>
        </div>
        {/* <div
          className={`flex sm:px-2 md:px-8 mt-8 hover:text-gray-800 text-gray-600 lg:px-16 xl:px-18 ${
            selectSetting ? "border-r-4 border-indigo-500 text-gray-800" : ""
          }`}
          onClick={() => {
            setIsSelectedSetting(true);
            setIsSelectedCalendar(false);
            setIsSelectedDash(false);
            setIsSelectedTeam(false);
          }}
        >
          <div className="">
            <Link to="/settings" className="flex justify-between">
              <Settings
                className={`h-6 w-6 text-indigo-200 ${
                  selectSetting ? "text-indigo-500" : ""
                }`}
              />
              <h1 className="font-bold pl-4 text-sm">Settings</h1>
            </Link>
          </div>
        </div> */}
        {/* <div className="flex justify-center pt-96">
          <button className="btn bg-red-200 md:px-8 hover:bg-red-400 lg:px-16">
            Sign Out
          </button>
        </div> */}
        <span className="text-xs text-center block text-gray-600 absolute lg:p-16 md:p-8 p-3 xl:p-24 bottom-0 left-0">
          Built by Louis, Dat, Jared
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
