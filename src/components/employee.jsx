import React from "react";

const Employee = ({ employee }) => {
  return (
    <div
      className={`px-4 py-2 mx-4 my-4 bg-white shadow-sm rounded  ${
        employee.Type === "D"
          ? "border-green-400 border-l-2"
          : employee.Type === "S"
          ? "border-indigo-400 border-l-2"
          : ""
      }`}
    >
      <h1 className="font-bold text-xl pr-4">
        {employee.First_name} {employee.Last_name}
      </h1>
      <h1 className="text-sm text-gray-600 ">{employee.Specialty}</h1>
      <h1 className="text-sm text-gray-600 ">{employee.Levels}</h1>
      <h1 className="text-sm text-gray-700">
        {employee.Type === "S" ? "Support" : "Developer"}
      </h1>
    </div>
  );
};

export default Employee;
