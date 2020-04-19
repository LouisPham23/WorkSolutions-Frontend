import React from "react";
import { Trash, Edit } from "react-feather";
import Moment from "react-moment";

const Ticket = ({
  Ticket_number,
  Ticket_type,
  Priority,
  Description,
  Status_Id,
  Ticket_title,
  Assigned_Date,
}) => {
  return (
    <div
      className={`px-4 py-4 mx-4 my-2 rounded-md border-l-4 bg-white shadow ${
        Status_Id === 3
          ? "border-green-400"
          : Status_Id === 2
          ? "border-blue-400"
          : Status_Id === 1
          ? "border-yellow-400"
          : ""
      }`}
    >
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-gray-800 text-lg">
            {Ticket_title} ({Ticket_number})
          </div>
          <div className="flex text-gray-500">
            <h1 className="mr-4 mb-2">Priority: {Priority}</h1>
            <h1>Type: {Ticket_type}</h1>
          </div>
          <div>
            <h1>
              Open date:{" "}
              <Moment format="MM Do YYYY, h:mm">{Assigned_Date}</Moment>
            </h1>
            {/* <h1 className="pb-2">
          <span className="font-medium">Description:</span> {Description}
        </h1> */}
          </div>
        </div>
        <div className="flex xl:mr-16">
          <Trash className="h-8 w-8 text-red-500 hover:text-red-800 mr-6" />
          <Edit className="h-8 w-8 text-green-500 hover:text-green-800" />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
