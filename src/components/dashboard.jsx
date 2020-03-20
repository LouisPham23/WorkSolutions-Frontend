import React, { useState } from "react";
import { Home, Key, Calendar, Settings } from "react-feather";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectDash, setIsSelectedDash] = useState(false);
  const [selectCalendar, setIsSelectedCalendar] = useState(false);
  const [selectSetting, setIsSelectedSetting] = useState(false);

  return (
    <>
      <div className="px-2 pt-8 pb-16 ">
        <h1 className="font-bold text-lg text-center">
          WorksSolutions
          <span className="border-2 border-indigo-300 ml-2 rounded">
            <Key className="inline-block fill-current text-indigo-600 self-center h-8 w-8 px-1" />
          </span>
        </h1>
      </div>
      <div className="flex flex-col justify-between">
        <div
          className={`flex sm:px-2 md:px-8 mt-8 hover:text-gray-800 text-gray-600 lg:px-16 xl:px-18 ${
            selectDash ? "border-r-4 border-indigo-500 text-gray-800" : ""
          }`}
          onClick={() => {
            setIsSelectedDash(true);
            setIsSelectedCalendar(false);
            setIsSelectedSetting(false);
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
          }}
        >
          <div className="">
            <Link to="/calendar" className="flex justify-between">
              <Calendar
                className={`h-6 w-6 text-indigo-200 ${
                  selectCalendar ? "text-indigo-500" : ""
                }`}
              />
              <h1 className="font-bold pl-4 text-sm">Calendar</h1>
            </Link>
          </div>
        </div>
        <div
          className={`flex sm:px-2 md:px-8 my-8 hover:text-gray-800 text-gray-600 lg:px-16 xl:px-18 ${
            selectSetting ? "border-r-4 border-indigo-500 text-gray-800" : ""
          }`}
          onClick={() => {
            setIsSelectedSetting(true);
            setIsSelectedCalendar(false);
            setIsSelectedDash(false);
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
        </div>
        <div className="flex justify-center pt-96">
          <button className="btn bg-red-200 md:px-8 hover:bg-red-400 lg:px-16">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
