import React, { useState, useEffect } from "react";
import Ticket from "../components/ticket";
import Progress from "../components/top-loading-board/progress";
import { useForm } from "react-hook-form";

const Dashboard_page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [ticket, setTicket] = useState([]);
  const [emps, setEmps] = useState([]);

  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:3030`;
  } else {
    url = `https://csc174proj.herokuapp.com`;
  }

  const getTickets = async () => {
    await fetch(`${url}/ticket/`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data.reverse());
        setIsLoading(false);
      })
      .catch((err) => setErr(err));
  };

  useEffect(() => {
    getTickets();
    getEmployees();
  }, []);

  const getEmployees = async () => {
    await fetch(`${url}/employee/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmps(data);
      })
      .catch((err) => setErr(err));
  };

  //Ticket filter dropdown handler
  const [showSelectDropDown, setShowSelectDropDown] = useState(false);
  const [dropDown, setDropDown] = useState("");
  const HandleDropdownChange = (e) => {
    setDropDown(e.target.value);
  };

  //Create ticket form handler
  const createTicket = async (data) => {
    // let url = "";
    // if (process.env === "development") {
    //   url = `http://localhost:3030/ticket/`;
    // } else {
    //   url = `https://csc174proj.herokuapp.com/ticket/`;
    // }

    await fetch(`${url}/ticket/`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        if (response.ok) {
          getTickets();
          setCreateTicketLoading(true);
        }
      })
      .then(() => {
        setModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [createTicketLoading, setCreateTicketLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    createTicket(data);
  };
  return (
    <div className="">
      <Progress isAnimating={isLoading} />
      <h1 className="font-bold px-4 mx-1 mt-8 mb-8 md:mb-0">Dashboard</h1>
      <div className="flex mb-8 justify-center">
        <input
          type="text"
          name="search_ticket"
          id="search_ticket"
          placeholder="Search..."
          className="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-300 px-4 outline-none mx-8 leading-normal"
        />
        <button
          className="btn bg-white hover:bg-gray-400 focus:outline-none mr-8"
          onClick={() => setModalOpen(true)}
        >
          Create Ticket
        </button>
        {/* <div
          className="dropdown inline-block relative"
          onClick={() => {
            setShowSelectDropDown(!showSelectDropDown);
          }}
        >
          <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
            <span className="mr-1">Ticket Type</span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
            </svg>
          </button>
          {showSelectDropDown ? null : (
            <ul
              className="dropdown-menu text-gray-700 pt-1 absolute bg-gray-200 py-2 px-2 mt-1 rounded w-full text-center"
              defaultValue="All"
              onChange={(e) => HandleDropdownChange(e)}
            >
              <li className="py-1 mt-1 hover:bg-white rounded">All</li>
              <li className="py-1 hover:bg-white rounded">Incident</li>
              <li className="py-1 mt-1 hover:bg-white rounded">Request</li>
            </ul>
          )}
        </div> */}

        <div
          className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${
            modalOpen ? "opacity-100" : "opacity-0 pointer-events-none "
          }`}
        >
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-lg mx-auto rounded-lg shadow-lg z-40 overflow-y-auto">
            <div
              onClick={() => setModalOpen(false)}
              className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50"
            >
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>

            <form
              className="modal-content text-left"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between items-center pb-3 py-4 px-6">
                <p className="text-xl font-semibold">Create a new ticket</p>
                <div
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer flex h-8 items-center justify-center modal-close rounded-full w-8 z-50"
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>

              <div className="bg-white py-4 px-6">
                <div className="mb-4">
                  <label
                    htmlFor="Title"
                    className="block text-gray-900 leading-tight"
                  >
                    Title
                  </label>
                  <input
                    ref={register({ required: true })}
                    className="mt-2 block w-full bg-gray-200 focus:bg-gray-100 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none "
                    name="Title"
                    type="text"
                  />
                  {errors.Title && (
                    <h1 className="pt-1 text-red-600">Title is required*</h1>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Priority"
                    className="block text-gray-900 leading-tight"
                  >
                    Priority
                  </label>
                  <select
                    name="Priority"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 mt-2 rounded leading-tight focus:outline-none focus:bg-white"
                    ref={register({ required: true })}
                    defaultValue="1"
                  >
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Ticket_type"
                    className="block text-gray-900 leading-tight"
                  >
                    Ticket Type
                  </label>
                  <select
                    ref={register({ require: true })}
                    name="Ticket_type"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 mt-2 rounded leading-tight focus:outline-none focus:bg-white"
                    defaultValue="R"
                  >
                    <option value="R">Request</option>
                    <option value="I">Incident</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Created_By"
                    className="block text-gray-900 leading-tight"
                  >
                    Created by:
                  </label>
                  <select
                    ref={register({ require: true })}
                    name="Created_By"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 mt-2 rounded leading-tight focus:outline-none focus:bg-white"
                  >
                    {emps.map((emp) => {
                      return (
                        <option value={emp.Employee_Id} key={emp.Employee_Id}>
                          {emp.First_name + emp.Last_name}
                        </option>
                      );
                    })}
                  </select>
                  {/* <input
                    ref={register()}
                    className="mt-2 block w-full rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none bg-gray-200 focus:bg-gray-100 "
                    name="Created_By"
                    type="text"
                  /> */}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Deadline_Date"
                    className="block text-gray-900 leading-tight"
                  >
                    Deadline date:
                  </label>
                  <input
                    ref={register({ required: true })}
                    className="mt-2 block w-full rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none bg-gray-200 focus:bg-gray-100 "
                    name="Deadline_Date"
                    type="date"
                  />
                  {errors.Deadline_Date && (
                    <h1 className="pt-1 text-red-600">
                      Deadline date is required*
                    </h1>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Deadline_Date"
                    className="block text-gray-900 leading-tight"
                  >
                    Description:
                  </label>
                  <textarea
                    ref={register({ required: true })}
                    className="mt-2 block w-full rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none bg-gray-200 focus:bg-gray-100 "
                    name="Description"
                    type="text"
                    rows="5"
                  ></textarea>
                  {errors.Description && (
                    <h1 className="pt-1 text-red-600">
                      Description is required*
                    </h1>
                  )}
                </div>

                <div className="flex justify-end my-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 px-6 rounded-lg font-semibold text-white"
                  >
                    {createTicketLoading ? "Complete" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {err ? (
        <h1 className="px-4 rounded mx-4 py-4 bg-red-200 text-red-900">
          Error loading tickets, please contact server
        </h1>
      ) : isLoading ? (
        <h1 className="px-2 rounded mx-4 py-4 bg-indigo-200 text-indigo-900">
          Loading tickets...
        </h1>
      ) : (
        <div className="flex flex-col">
          {ticket.map((ticket) => (
            <Ticket ticket={ticket} key={ticket.Ticket_number} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard_page;
