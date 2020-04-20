import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Ticket = ({ ticket }) => {
  return (
    <Link to={`/ticket/${ticket.Ticket_number}`}>
      <div
        className={`px-4 py-4 mx-4 my-2 rounded-md border-l-4 bg-white shadow  hover:bg-gray-300 ${
          ticket.Status_Id === 3
            ? "border-gray-400"
            : ticket.Status_Id === 2
            ? "border-green-400"
            : ticket.Status_Id === 1
            ? "border-yellow-400"
            : ""
        }`}
      >
        <div className="flex justify-between">
          <div>
            <div className="font-semibold text-gray-800 text-lg">
              {ticket.Title} ({ticket.Ticket_number})
            </div>
            <div className="flex text-gray-500">
              <h1 className="mr-4 mb-2">Priority: {ticket.Priority}</h1>
              <h1>Type: {ticket.Ticket_type}</h1>
            </div>
            <div>
              <h1>
                Open date:{" "}
                <Moment format="MM Do YYYY, h:mm">
                  {ticket.Assigned_Date}
                </Moment>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Ticket;
