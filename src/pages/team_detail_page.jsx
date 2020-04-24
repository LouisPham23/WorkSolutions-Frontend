import React, { useState, useEffect } from "react";
import { ArrowLeft } from "react-feather";

const Team_detail_page = (props) => {
  const [members, setMembers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  let team_path = props.match.params.id;
  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:3030/team/${team_path}`;
  } else {
    url = `https://csc174proj.herokuapp.com/team/${team_path}`;
  }

  const getTeam = async () =>
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((err) => setErr(err));

  useEffect(() => {
    getTeam();
  }, [team_path]);

  return (
    <div>
      <button
        className="bg-gray-300 hover:bg-gray-500 py-1 rounded px-3 mt-20 ml-4 outline-none"
        onClick={() => {
          props.history.goBack();
        }}
      >
        <ArrowLeft className="inline-block mr-2" />
        Back
      </button>
      {err ? (
        <h1 className="px-4 rounded mx-4 py-4 mt-4 bg-red-200 text-red-900">
          Error loading team, please contact server
        </h1>
      ) : loading ? (
        <h1 className="px-2 rounded mx-4 py-4 bg-indigo-200 text-indigo-900">
          Loading team...
        </h1>
      ) : (
        <div className="mt-8">
          {members.map((member) => {
            return (
              <div
                className="px-4 py-4 bg-white mx-4 rounded flex justify-between mt-4 mb-4"
                key={member.First_name}
              >
                <h1>{member.First_name + " " + member.Last_name}</h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Team_detail_page;
