import React from "react";

const Team = ({ Name, Members }) => {
  return (
    <div className="text-gray-800 px-2">
      <h1>Team Name: {Name}</h1>
      <h1 className="text-sm">Members: {Members}</h1>
    </div>
  );
};

export default Team;
