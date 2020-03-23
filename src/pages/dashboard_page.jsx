import React, { useState, useEffect } from "react";
import Ticket from "../components/ticket";

const Dashboard_page = () => {
  let url = "https://csc174proj.herokuapp.com/ticket";

  const [ticket, setTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getTickets = async () =>
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setTicket(data);
        setIsLoading(false);
      })
      .catch(err => setErr(err));
  console.log(ticket);

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="">
      <h1 className="font-bold px-4 mx-1 mt-8">Dashboard</h1>
      <div className="flex mb-8 justify-center">
        <input
          type="text"
          name="search_ticket"
          id="search_ticket"
          placeholder="Search..."
          className="transition-colors duration-100 ease-in-out focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 rounded-lg bg-gray-300 px-4 outline-none mx-8 leading-normal"
        />
        <button
          className="btn bg-white hover:bg-gray-400 outline-none"
          onClick={() => setModalOpen(true)}
        >
          Create Ticket
        </button>
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

            <form className="modal-content text-left">
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

              <div className="bg-gray-100 py-4 px-6">
                <div className="mb-4">
                  <label
                    htmlFor="ticket_title"
                    className="block text-gray-900 leading-tight"
                  >
                    Ticket Title
                  </label>
                  <input
                    required
                    className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-indigo-400"
                    id="ticket_title"
                    name="ticket_title"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="comments"
                    className="block text-gray-900 leading-tight"
                  >
                    Ticket Description
                  </label>

                  <textarea
                    required
                    className="mt-2 block w-full border-2 border-gray-300 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none focus:border-indigo-400"
                    id="comments"
                    rows="4"
                    cols="50"
                    name="comments"
                  />
                </div>

                <div className="flex justify-end my-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 px-6 rounded-lg font-semibold text-white"
                  >
                    Submit
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
          {ticket.map(ticket => (
            <Ticket
              Ticket_type={ticket.Ticket_type}
              key={ticket.Ticket_number}
              Ticket_number={ticket.Ticket_number}
              Priority={ticket.Priority}
              Description={ticket.Description}
              Ticket_title={ticket.Ticket_title}
              Status={ticket.Status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard_page;
