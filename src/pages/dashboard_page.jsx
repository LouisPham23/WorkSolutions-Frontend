import React, { useState, useEffect } from "react";
import Ticket from "../components/ticket";

const Dashboard_page = () => {
  const [ticket, setTicket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let url = "https://csc174proj.herokuapp.com/ticket";

  const [err, setErr] = useState(false);

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
      <h1 className="font-bold px-4 mx-1 my-8">Dashboard</h1>
      {err ? (
        <h1 className="px-2 rounded mx-4 py-4 bg-red-200 text-red-900">
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
