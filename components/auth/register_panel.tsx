"use client";
import { useState } from "react";
import { UserRequestType } from "@/types";
import Swal from "sweetalert2";

const RegisterPanel = ({ setIsRegister }: { setIsRegister: Function }) => {
  const [panelIndex, setPanelIndex] = useState(0);
  const [userRequest, setUserRequest] = useState<UserRequestType>({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
    hub: 1,
  });

  const handleSubmit = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRequest),
    });

    if (res.ok) {
      await Swal.fire({
        title: "Success",
        text: "Request Submitted",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setIsRegister(false);
    } else {
      await Swal.fire({
        title: "Error",
        text: "Request Failed",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const FirstPanel = () => (
    <div className="flex flex-col w-full">
      <p className="self-start mt-5">First Name:</p>
      <input
        type="text"
        name="First Name"
        id=""
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full  mt-2 focus:outline-none  p-2"
        placeholder="Username"
        value={userRequest.firstName}
        onChange={(e) => {
          setUserRequest({ ...userRequest, firstName: e.target.value });
        }}
      />
      <p className="self-start mt-5">Middle Name:</p>
      <input
        type="text"
        name="Middle Name"
        id=""
        value={userRequest.middleName}
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full mt-2 focus:outline-none p-2"
        placeholder="Middle Name"
        onChange={(e) => {
          setUserRequest({ ...userRequest, middleName: e.target.value });
        }}
      />
      <p className="self-start mt-5">Last Name:</p>
      <input
        type="text"
        name="Last Name"
        id=""
        value={userRequest.lastName}
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full mt-2 focus:outline-none p-2"
        placeholder="Last Name"
        onChange={(e) => {
          setUserRequest({ ...userRequest, lastName: e.target.value });
        }}
      />
    </div>
  );
  const SecondPanel = () => (
    <div className="flex flex-col w-full">
      <p className="self-start mt-5">User Name:</p>
      <input
        type="text"
        name="Username"
        id=""
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full  mt-2 focus:outline-none  p-2"
        placeholder="Username"
        value={userRequest.username}
        onChange={(e) => {
          setUserRequest({ ...userRequest, username: e.target.value });
        }}
      />
      <p className="self-start mt-2">Email:</p>
      <input
        type="text"
        name="Email"
        id=""
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full mt-2 focus:outline-none p-2"
        placeholder="Middle Name"
        value={userRequest.email}
        onChange={(e) => {
          setUserRequest({ ...userRequest, email: e.target.value });
        }}
      />
      <p className="self-start mt-2">Password:</p>
      <input
        type="password"
        name="Password"
        id=""
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full mt-2 focus:outline-none p-2"
        placeholder="password"
        value={userRequest.password}
        onChange={(e) => {
          setUserRequest({ ...userRequest, password: e.target.value });
        }}
      />
      <p className="self-start mt-2">Confirm Password:</p>
      <input
        type="password"
        name="confirm password"
        id=""
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full mt-2 focus:outline-none p-2"
        placeholder="Confirm Password"
        value={userRequest.confirmPassword}
        onChange={(e) => {
          setUserRequest({ ...userRequest, confirmPassword: e.target.value });
        }}
      />
    </div>
  );
  const ThirdPanel = () => (
    <div className="flex flex-col w-full">
      <p className="self-start mt-5">Position:</p>
      <input
        type="text"
        name="Position"
        id=""
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full  mt-2 focus:outline-none  p-2"
        placeholder="Position"
        value={userRequest.position}
        onChange={(e) => {
          setUserRequest({ ...userRequest, position: e.target.value });
        }}
      />
      <p className="self-start mt-2">Hub:</p>
      <select
        name="Hub"
        id=""
        className="rounded-lg border-2 shadow-inner shadow-neutral-500 bg-transparent bg-black  bg-opacity-50 border-white w-full  mt-2 focus:outline-none  p-2"
        value={userRequest.hub}
        onChange={(e) => {
          setUserRequest({ ...userRequest, hub: parseInt(e.target.value) });
        }}
      >
        <option value="1">Davao</option>
      </select>
    </div>
  );

  const panels = [FirstPanel, SecondPanel, ThirdPanel];
  return (
    <div className="flex shadow-xl  min-w-[600px] justify-center flex-col md:flex-row bg-white bg-opacity-5 backdrop-blur-lg border-2 border-white shadow-neutral-500 z-20   min-h-[25em]  max-h-[600px] overflow-hidden rounded-lg relative ">
      <div className="flex flex-col p-8 z-20 w-full">
        <button
          onClick={() =>
            panelIndex > 0
              ? setPanelIndex(panelIndex - 1)
              : setIsRegister(false)
          }
          className=" absolute top-4 left-5 text-neutral-500  font-bold hover:scale-125 ease-in-out duration-300"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-3xl font-extrabold mt-3">Request Account</h1>
        <div className="flex w-full">{panels[panelIndex]()}</div>

        <button
          onClick={() =>
            panelIndex < 2 ? setPanelIndex(panelIndex + 1) : handleSubmit()
          }
          className="py-2 bg-yellow-600 hover:scale-105 duration-100 ease-in-out text-white px-10 mt-5 font-bold rounded shadow"
        >
          {`${panelIndex < 2 ? "Next" : "Submit"}`}
        </button>
      </div>
    </div>
  );
};

export default RegisterPanel;
