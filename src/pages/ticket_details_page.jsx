import React from "react";
import { useEffect, useState } from "react";
import { Edit, ArrowLeft, Trash } from "react-feather";
import Moment from "react-moment";
import Progress from "../components/top-loading-board/progress";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";

const TicketDetails = (props) => {
  let history = useHistory();

  function goHome() {
    history.push("/");
  }

  const [Ticket, setTicket] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [emps, setEmps] = useState([]);

  let ticket_number = props.match.params.id;

  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:3030`;
  } else {
    url = `https://csc174proj.herokuapp.com`;
  }

  const getTicket = async () => {
    await fetch(`${url}/ticket/${ticket_number}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data[0]);
        setIsLoading(false);
      })
      .catch((err) => setErr(err));
  };

  const getEmployees = async () => {
    await fetch(`${url}/employee/`)
      .then((res) => res.json())
      .then((data) => {
        setEmps(data);
      })
      .catch((err) => setErr(err));
  };
  const updateTicket = async (data) => {
    await fetch(`${url}/ticket/${ticket_number}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        getTicket();
        setShowEditForm(false);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const deleteTicket = async () => {
    await fetch(`${url}/ticket/${ticket_number}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTicket();
  }, [ticket_number]);

  useEffect(() => {
    getEmployees();
  }, []);

  const [showEditForm, setShowEditForm] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    updateTicket(data);
    console.log(data);
  };

  let ticket_status = "";
  switch (Ticket.Status_Id) {
    case 1:
      ticket_status = "Work In Progress";
      break;
    case 2:
      ticket_status = "Open";
      break;
    case 3:
      ticket_status = "Close";
      break;
    default:
      return ticket_status;
  }

  return (
    <div>
      <Progress isAnimating={loading} />
      <button
        className="bg-gray-300 hover:bg-gray-500 py-1 rounded px-3 mt-20 ml-4 focus:outline-none"
        onClick={() => {
          props.history.goBack();
        }}
      >
        <ArrowLeft className="inline-block mr-2" />
        Back
      </button>
      {err ? (
        <h1 className="px-4 rounded mx-4 py-4 bg-red-200 text-red-900">
          Error loading ticket, please contact server
        </h1>
      ) : loading ? (
        <h1 className="px-2 rounded mx-4 py-4 bg-indigo-200 text-indigo-900">
          Loading ticket...
        </h1>
      ) : (
        <div className="px-4 py-4 bg-white mx-4 rounded flex justify-between mt-8 mb-4">
          <div>
            <h1 className="font py-2 text-sm inline-block mr-4">
              Ticket number: {Ticket.Ticket_number}
            </h1>
            <h1 className="text-sm inline-block mr-4">
              Status: {ticket_status}
            </h1>
            <h1 className="text-sm inline-block">
              Priority: {Ticket.Priority}
            </h1>
            <h1 className="font-bold text-lg">
              {Ticket.Title} ({Ticket.Ticket_type})
            </h1>
            <div>
              <h1 className="pt-2 inline-block mr-4 text-gray-600">
                Open date:{" "}
                <Moment format="MM/DD/YYYY">{Ticket.Assigned_Date}</Moment>
              </h1>
              <h1 className="pt-2 inline-block text-gray-600">
                Deadline date:{" "}
                {Ticket.Deadline_Date == null ? (
                  ""
                ) : (
                  <Moment format="YYYY-MM-DD">{Ticket.Deadline_Date}</Moment>
                )}
              </h1>
            </div>
            <h1 className="pt-2">Assigned to: {Ticket.Assigned_To} </h1>
            <h1 className="pt-2">Created by: {Ticket.Created_By}</h1>
            <h1 className="pt-4">
              Description:{" "}
              <span className="text-gray-600">{Ticket.Description}</span>
            </h1>
          </div>
          <div className="mt-8">
            <button
              className="bg-gray-300 hover:bg-green-500 py-1 px-1 rounded focus:outline-none ml-32"
              type="submit"
              onClick={() => setShowEditForm(!showEditForm)}
            >
              <Edit />
            </button>
            <button
              className="bg-gray-300 hover:bg-red-500 py-1 ml-4 px-1 rounded focus:outline-none"
              type="submit"
              onClick={() => {
                deleteTicket();
                goHome();
              }}
            >
              <Trash />
            </button>
            {showEditForm ? (
              <div className="absolute top-0 right-0 mt-64 mr-4 w-84 ">
                <div className="bg-gray-400 rounded-lg shadow-xl bg-white ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-4 pt-4">
                      <label
                        htmlFor="Title"
                        className="block text-gray-900 leading-tight font-semibold text-center font-bold"
                      >
                        Edit Ticket
                      </label>
                      <label
                        htmlFor="Title"
                        className="block text-gray-900 leading-tight font-semibold"
                      >
                        Title
                      </label>
                      <textarea
                        ref={register({ required: true })}
                        className="mt-2 block w-full bg-gray-300 focus:bg-gray-100 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none "
                        name="Title"
                        type="text"
                        rows="3"
                        defaultValue={Ticket.Title}
                      />
                      {errors.Title && (
                        <h1 className="pt-1 text-red-600">
                          Title is required*
                        </h1>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <div className="px-4 pt-2 w-full">
                        <label
                          htmlFor="Priority"
                          className="block text-gray-900 leading-tight font-semibold"
                        >
                          Priority
                        </label>
                        <select
                          name="Priority"
                          className="block appearance-none w-full bg-gray-300 border border-gray-200 text-gray-700 py-2 px-3 mt-2 leading-tight focus:outline-none focus:bg-white rounded-lg"
                          ref={register({ required: true })}
                          defaultValue={Ticket.Priority}
                        >
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="px-4 pt-2 w-full">
                        <label
                          htmlFor="Ticket_type"
                          className="block text-gray-900 leading-tight font-semibold "
                        >
                          Ticket Type
                        </label>
                        <select
                          ref={register({ require: true })}
                          name="Ticket_type"
                          className="block appearance-none w-full bg-gray-300 border border-gray-200 text-gray-700 py-2 px-3 mt-2 leading-tight focus:outline-none focus:bg-white rounded-lg"
                          defaultValue={Ticket.Ticket_type}
                        >
                          <option value="R">Request</option>
                          <option value="I">Incident</option>
                        </select>
                      </div>
                    </div>
                    <div className="px-4 pt-2">
                      <label
                        htmlFor="Status_Id"
                        className="block text-gray-900 leading-tight"
                      >
                        Status
                      </label>
                      <select
                        ref={register({ require: true })}
                        name="Status_Id"
                        className="block appearance-none w-full bg-gray-300 border border-gray-200 text-gray-700 py-2 px-3 mt-2 leading-tight focus:outline-none focus:bg-white rounded-lg"
                        defaultValue={Ticket.Status_Id}
                      >
                        <option value="1">Work in progress</option>
                        <option value="2">Open</option>
                        <option value="3">Closed</option>
                      </select>
                    </div>
                    <div className="px-4 pt-2">
                      <label
                        htmlFor="Deadline_Date"
                        className="block text-gray-900 leading-tight font-semibold"
                      >
                        Deadline date:
                      </label>
                      <input
                        ref={register({ required: true })}
                        className="mt-2 block w-full rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none bg-gray-300 focus:bg-white "
                        name="Deadline_Date"
                        type="date"
                        defaultValue={moment(Ticket.Deadline_Date).format(
                          "YYYY-MM-DD"
                        )}
                      />
                      {errors.Deadline_Date && (
                        <h1 className="pt-1 text-red-600">
                          Deadline date is required*
                        </h1>
                      )}
                    </div>
                    <div className="px-4 pt-2">
                      <label
                        htmlFor="Assigned_To"
                        className="block text-gray-900 leading-tight font-semibold"
                      >
                        Assigned to:
                      </label>
                      <select
                        ref={register({ require: true })}
                        name="Assigned_To"
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 mt-2 rounded leading-tight focus:outline-none focus:bg-white"
                      >
                        {emps.map((emp) => {
                          return (
                            <option
                              value={emp.Employee_Id}
                              key={emp.Employee_Id}
                            >
                              {emp.First_name + " " + emp.Last_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="px-4 pt-2">
                      <label
                        htmlFor="Description"
                        className="block text-gray-900 leading-tight font-semibold"
                      >
                        Description:
                      </label>
                      <textarea
                        ref={register({ required: true })}
                        className="mt-2 block w-full rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none bg-gray-300 focus:bg-white "
                        name="Description"
                        type="text"
                        rows="5"
                        defaultValue={Ticket.Description}
                      ></textarea>
                      {errors.Description && (
                        <h1 className="pt-1 text-red-600">
                          Description is required*
                        </h1>
                      )}
                    </div>
                    <button
                      className="bg-gray-700 text-white hover:text-black hover:bg-gray-500 py-1 px-4 rounded outline-none my-4 ml-4 font-bold"
                      type="submit"
                    >
                      Update Ticket
                    </button>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
