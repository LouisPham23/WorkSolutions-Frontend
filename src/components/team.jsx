import React from "react";
import { Link } from "react-router-dom";

const Team = ({ team }) => {
  // let to = `/team/${team.Team_Id}`;

  return (
    <Link to={`/team/${team.Team_Id}`}>
      <div className="bg-white px-2 py-4 mx-2 my-4 shadow-sm hover:bg-gray-300">
        <div className="text-gray-800 px-2">
          <h1>Team Name: {team.Team_name}</h1>
          <h1 className="text-sm">Members: {team.Members}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Team;
