import React, { useState, useEffect } from "react";
import { ArrowLeft } from "react-feather";
import { useForm } from "react-hook-form";

const Team_detail_page = (props) => {
  const [loading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [emps, setEmps] = useState([]);
  const [allEmps, setAllEmps] = useState([]);

  let team_path = props.match.params.id;
  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:3030`;
  } else {
    url = `https://csc174proj.herokuapp.com`;
  }

  const getMembers = async () =>
    await fetch(`${url}/team/${team_path}`)
      .then((res) => res.json())
      .then((data) => {
        setEmps(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((err) => setErr(err));

  const getAllEmployees = async () => {
    await fetch(`${url}/employee`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllEmps(data);
        setIsLoading(false);
      })
      .catch((err) => setErr(err));
  };

  const [addMemberError, setAddMemberError] = useState("");

  const addMember = async (data) => {
    let actual_data = { ...data, Team_Id: team_path };
    console.log(actual_data);
    await fetch(`${url}/team_employee`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actual_data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sqlState == "45000") {
          setAddMemberError(data.sqlMessage);
          console.log("Input error:", data);
        } else {
          setAddMemberError("");
          getMembers();
          console.log("Success:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getMembers();
    getAllEmployees();
  }, [team_path]);

  const [menu, setMenu] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    addMember(data);
  };
  return (
    <div>
      <div className="flex justify-between">
        <button
          className="bg-gray-300 hover:bg-gray-500 py-1 rounded px-3 mt-20 ml-4 outline-none"
          onClick={() => {
            props.history.goBack();
          }}
        >
          <ArrowLeft className="inline-block mr-2" />
          Back
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-500 py-1 rounded px-3 mt-20 mr-4 outline-none"
          onClick={() => setMenu(!menu)}
        >
          Add Member
        </button>
        {menu ? (
          <div className="absolute top-0 right-0 mt-32 mr-2">
            <div className="mr-2 py-2 w-48 bg-white rounded-lg shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4">
                  <div className="mt-1 mb-2">
                    <label
                      htmlFor="Title"
                      className="block text-gray-900 leading-tight text-center"
                    >
                      Member Name
                    </label>
                    <select
                      ref={register({ require: true })}
                      name="Employee_Id"
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 mt-2 rounded leading-tight focus:outline-none focus:bg-white"
                    >
                      {allEmps.map((emp) => {
                        return (
                          <option value={emp.Employee_Id} key={emp.Employee_Id}>
                            {emp.First_name + " " + emp.Last_name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.Title && (
                      <h1 className="pt-1 text-red-600">Name is required*</h1>
                    )}
                  </div>
                </div>
                <button
                  className="bg-gray-300 hover:bg-gray-500 py-1 px-2 rounded outline-none ml-32"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
      {err ? (
        <h1 className="px-4 rounded mx-4 py-4 mt-4 bg-red-200 text-red-900">
          Error loading team, please contact server
        </h1>
      ) : loading ? (
        <h1 className="px-2 rounded mx-4 py-4 mt-8 bg-indigo-200 text-indigo-900">
          Loading team...
        </h1>
      ) : (
        <div className="mt-8">
          {addMemberError ? (
            <div className="px-2 py-2 my-2 text-semibold text-red-700 text-center bg-red-200 mx-4 rounded">
              {addMemberError}
            </div>
          ) : null}
          <h1 className="font-bold text-2xl text-center pt-4">
            {emps[0].Team_name}
          </h1>
          {emps.map((member) => {
            return (
              <div
                className="px-4 py-4 bg-white mx-4 rounded flex justify-between mt-4 mb-4"
                key={member.Employee_Id}
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
