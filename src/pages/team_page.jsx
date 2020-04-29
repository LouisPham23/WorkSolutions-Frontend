import React, { useEffect } from "react";
import { useState } from "react";
import Team from "../components/team";

const Team_page = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  const getTeams = () => {
    let url = "";
    if (process.env.NODE_ENV === "development") {
      url = `http://localhost:3030/team`;
    } else {
      url = `https://csc174proj.herokuapp.com/team/`;
    }
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setTeams(result[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div>
      <h1 className="font-bold px-4 my-8">Teams</h1>
      {err ? (
        <h1 className="px-4 rounded mx-4 py-4 bg-red-200 text-red-900">
          Error loading teams, please contact server
        </h1>
      ) : loading ? (
        <h1 className="px-2 rounded mx-4 py-4 bg-indigo-200 text-indigo-900">
          Loading teams...
        </h1>
      ) : (
        <div className="flex flex-col">
          {teams.map((team) => (
            <Team team={team} key={team.Team_Id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Team_page;
