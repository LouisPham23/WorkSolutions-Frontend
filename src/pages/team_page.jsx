import React, { useEffect } from "react";
import { useState } from "react";
import Team from "../components/team";

const Team_page = () => {
  // let url = "https://csc174proj.herokuapp.com/team";
  let url = "http://localhost:3030/team";

  const [teams, setTeams] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  const getTeams = async () =>
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setIsLoading(false);
      })
      .catch((err) => setErr(err));

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
            <div className="bg-white px-2 py-4 mx-2 my-4 shadow-sm">
              <Team Name={team.Team_name} key={team.Team_Id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team_page;
