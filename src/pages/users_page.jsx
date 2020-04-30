import React, { useState, useEffect } from "react";
import Employee from "../components/employee";
import { useForm } from "react-hook-form";

const User_page = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setIsloading] = useState(true);
  const [err, setErr] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const createEmployee = async (data) => {
    await fetch(`${url}/employee`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        if (response.ok) {
          getEmployee();
          setCreateEmployeeLoading(true);
        }
      })
      .then(() => {
        setModalOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [createEmployeeLoading, setCreateEmployeeLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    createEmployee(data);
  };
  
  return (
    <div>
        <button
          className="btn bg-white hover:bg-gray-400 focus:outline-none mr-8"
          onClick={() => setModalOpen(true)}
        >
          Add Employee
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

            <form
              className="modal-content text-left"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between items-center pb-3 py-4 px-6">
                <p className="text-xl font-semibold">Add an employee</p>
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
                    Employee Id
                  </label>
                  <input
                    ref={register({ required: true })}
                    className="mt-2 block w-full bg-gray-200 focus:bg-gray-100 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none "
                    name="Employee_Id"
                    type="text"
                    placeholder="ZX158, RF567, . . ."
                  />
                  {errors.Title && (
                    <h1 className="pt-1 text-red-600">Employee Id is required*</h1>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Priority"
                    className="block text-gray-900 leading-tight"
                  >
                    First Name
                  </label>
                  <input
                    ref={register({ required: true })}
                    className="mt-2 block w-full bg-gray-200 focus:bg-gray-100 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none "
                    name="First_name"
                    type="text"
                  />
                  {errors.Title && (
                    <h1 className="pt-1 text-red-600">First name is required*</h1>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Ticket_type"
                    className="block text-gray-900 leading-tight"
                  >
                    Last Name
                  </label>
                  <input
                    ref={register({ required: true })}
                    className="mt-2 block w-full bg-gray-200 focus:bg-gray-100 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none "
                    name="Last_name"
                    type="text"
                  />
                  {errors.Title && (
                    <h1 className="pt-1 text-red-600">Last name is required*</h1>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Created_By"
                    className="block text-gray-900 leading-tight"
                  >
                    Department No.
                  </label>
                  <select
                    name="Department_Id"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 mt-2 rounded leading-tight focus:outline-none focus:bg-white"
                    ref={register({ required: true })}
                    defaultValue="1"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                    <option value="3">6</option>
                    <option value="3">7</option>
                    <option value="3">8</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Type"
                    className="block text-gray-900 leading-tight"
                  >
                    Type
                  </label>
                  <select
                    name="Type"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 mt-2 rounded leading-tight focus:outline-none focus:bg-white"
                    ref={register({ required: true })}
                    defaultValue="1"
                  >
                    <option value="1">S</option>
                    <option value="2">D</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Specialty"
                    className="block text-gray-900 leading-tight"
                  >
                    Specialty
                  </label>
                  <input
                    ref={register({ required: true })}
                    className="mt-2 block w-full bg-gray-200 focus:bg-gray-100 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none "
                    name="Specialty"
                    type="text"
                    placeholder="Network Security, Web Developer, . . ."
                  />
                  {errors.Title && (
                    <h1 className="pt-1 text-red-600">Specialty is required*</h1>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Levels"
                    className="block text-gray-900 leading-tight"
                  >
                    Levels
                  </label>
                  <input
                    ref={register({ required: true })}
                    className="mt-2 block w-full bg-gray-200 focus:bg-gray-100 rounded-lg bg-white px-3 py-2 leading-tight focus:outline-none "
                    name="Specialty"
                    type="text"
                  />
                  {errors.Title && (
                    <h1 className="pt-1 text-red-600">Levels is required*</h1>
                  )}
                </div>

                <div className="flex justify-end my-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 px-6 rounded-lg font-semibold text-white"
                  >
                    {createEmployeeLoading ? "Complete" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      {employee.map((emp) => {
        return <Employee employee={emp} key={emp.Employee_Id} />;
      })}
    </div>
  );
};

export default User_page;
