import React from "react";

const Employee = ({ employee }) => {
  return (
    <div className="px-4 py-2 mx-4 my-4 bg-gray-300 rounded">
      <h1 className="font-bold text-xl">
        {employee.First_name} {employee.Last_name}
      </h1>
    </div>
  );
};

export default Employee;
