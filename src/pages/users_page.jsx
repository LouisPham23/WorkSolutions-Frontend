import React, { useState, useEffect } from "react";
import Employee from "../components/employee";

const User_page = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setIsloading] = useState(true);
  const [err, setErr] = useState(false);

  let url = "";
  if (process.env === "development") {
    url = `http://localhost:3030`;
  } else {
    url = `https://csc174proj.herokuapp.com`;
  }

  const getEmployee = async () =>
    await fetch(`${url}/employee`)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setIsloading(false);
      })
      .catch((err) => setErr(err));

  useEffect(() => {
    getEmployee();
  }, []);
  console.log(employee);
  return (
    <div>
      <h1 className="font-bold px-4 my-8">Users</h1>
      {employee.map((emp) => {
        return <Employee employee={emp} key={emp.Employee_Id} />;
      })}
    </div>
  );
};

export default User_page;
