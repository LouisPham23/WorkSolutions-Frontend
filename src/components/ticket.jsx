import React from "react";

const Ticket = ({
  Ticket_number,
  Ticket_type,
  Priority,
  Description,
  Status,
  Ticket_title
}) => {
  return (
    <div
      className={`px-4 py-4 mx-4 my-2 rounded-md border-l-4 bg-white shadow ${
        Status === "Closed"
          ? "border-green-500"
          : Status === "Open"
          ? "border-blue-500"
          : Status === "Work In Progress"
          ? "border-yellow-500"
          : ""
      }`}
    >
      <div className="font-bold text-blue-700">{Ticket_title}</div>
      <h1 className="font-bold text-gray-700 pt-2 text-xl">
        Ticket Number: {Ticket_number}
      </h1>
      <div className="flex text-gray-500">
        <h1 className="mr-4">Priority: {Priority}</h1>
        <h1>Status: {Status}</h1>
      </div>
      <h2 className="pt-4">{Ticket_type}</h2>

      <h1 className="pb-2">
        <span className="font-medium">Description:</span> {Description}
      </h1>
    </div>
  );
};

export default Ticket;
