import React from "react";
import { Link } from "react-router-dom";

const Team = ({ team }) => {
  return (
    <Link to={`/team/${team.Team_Id}`}>
      <div className="rounded bg-white px-2 py-4 mx-2 my-4 shadow-sm hover:bg-gray-300">
        <div className="text-gray-800 px-2 ">
          <h1 className="font-semibold">
            {team.Team_name} ({team.Team_Id})
          </h1>
          <h1 className="text-sm text-gray-700">Members: {team.Members}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Team;
