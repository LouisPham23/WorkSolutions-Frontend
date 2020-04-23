import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Edit, ArrowLeft } from "react-feather";
import Moment from "react-moment";
import Progress from "../components/top-loading-board/progress";

const TicketDetails = (props) => {
  const [Ticket, setTicket] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  let ticket_number = props.match.params.id;

  let url = "";
  if (process.env === "development") {
    url = `http://localhost:3030/ticket/${ticket_number}`;
  } else {
    url = `https://csc174proj.herokuapp.com/ticket/${ticket_number}`;
  }

  const getTicket = async () =>
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data[0]);
        setIsLoading(false);
      })
      .catch((err) => setErr(err));

  useEffect(() => {
    getTicket();
  }, [ticket_number]);

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
        className="bg-gray-300 hover:bg-gray-500 py-1 rounded px-3 mt-20 ml-4 outline-none"
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
                <Moment format="MM Do YYYY, h:mm">
                  {Ticket.Assigned_Date}
                </Moment>
              </h1>
              <h1 className="pt-2 inline-block text-gray-600">
                Deadline date:{" "}
                {Ticket.Deadline_Date == null ? (
                  ""
                ) : (
                  <Moment format="MM Do YYYY, h:mm">
                    {Ticket.Deadline_Date}
                  </Moment>
                )}
              </h1>
            </div>
            <h1 className="pt-2">Assigned to: </h1>
            <h1 className="pt-2">Created by: {Ticket.Created_By}</h1>
            <h1 className="pt-4">
              Description:{" "}
              <span className="text-gray-600">{Ticket.Description}</span>
            </h1>
          </div>
          <div className="mt-16">
            <Edit className="h-8 w-8 text-green-500 hover:text-green-800" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
