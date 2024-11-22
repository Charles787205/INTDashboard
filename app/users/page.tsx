"use client";
import { UserRequestType, UserType } from "@/types";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UsersPage = () => {
  const [userRequests, setUserRequests] = useState<UserRequestType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUserRequest = async () => {
    const res = await fetch("/api/user_request/");

    const requests = await res.json();
    console.log(requests);
    const userRequests = requests.results.map((request: any) => {
      return {
        id: request.id,
        username: request.username,
        email: request.email,
        firstName: request.first_name,
        middleName: request.middle_name,
        lastName: request.last_name,
        position: request.position,
        hub: request.hub,
        date_request: request.date_request,
      };
    });
    setUserRequests(userRequests);
  };
  const fetchUsers = async () => {
    const res = await fetch("/api/users/");
    const request = await res.json();

    setUsers(
      request.results.map((user: any) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.first_name,
          middleName: user.middle_name,
          lastName: user.last_name,
          position: user.position,
          isActive: user.is_active,
          hub: user.hub,
        };
      })
    );
  };

  const getPageData = async () => {
    await fetchUserRequest();
    await fetchUsers();
  };
  useEffect(() => {
    getPageData();
  }, []);

  function approveRequest(request: UserRequestType) {
    Swal.fire({
      title: "Approval",
      text: `Are you sure you want to approve this request?`,
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
      preConfirm: (confirmed) => {
        console.log(confirmed);

        const res = fetch(`/api/user_request/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: request.id,
            is_approved: true,
          }),
        });
        getPageData();
        Swal.fire({
          title: "Success",
          text: `User ${request.lastName.toUpperCase()}, ${request.firstName.toUpperCase()} ${request.middleName.toUpperCase()} approved.`,
          icon: "success",
          timerProgressBar: true,
          timer: 3000,
        });
      },
    });
  }
  function denyRequest(request: UserRequestType) {
    Swal.fire({
      title: "Deny",
      text: `Are you sure you want to deny this request?`,
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
      preConfirm: (confirmed) => {
        console.log(confirmed);

        console.log("adf");
        Swal.fire({
          title: "Success",
          text: `User ${request.lastName.toUpperCase()}, ${request.firstName.toUpperCase()} ${request.middleName.toUpperCase()} denied.`,
          icon: "success",
          timerProgressBar: true,
          timer: 3000,
        });
      },
    });
  }
  return (
    <div className="flex w-full max-w-full overflow-hidden rounded-2xl p-5 flex-col bg-white shadow shadow-neutral-600 ease-in-out duration-150 gap-10 ">
      <div className="flex flex-col">
        <div className="flex w-full justify-between mb-10">
          <h1 className="font-bold text-2xl">Users</h1>
        </div>
        <div className="flex flex-col h-full w-full rounded-md shadow shadow-neutral-400 p-5">
          <h2 className="font-semibold">Active Users</h2>
          <div className="flex overflow-auto rounded shadow">
            <table className="text-center h-full w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Position</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="odd:bg-gray-300">
                    <td>{user.id}</td>
                    <td>{`${user.lastName.toUpperCase()}, ${user.firstName.toUpperCase()} ${user.middleName.toUpperCase()} `}</td>
                    <td>{`${user.position.toUpperCase()}`}</td>

                    <td className="flex w-full justify-center">
                      <button className="text-white p-1 shadow rounded bg-green-500 flex items-baseline">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-3 ">
        <div className="flex flex-col h-full w-full rounded-md shadow shadow-neutral-400 p-5">
          <h2 className="font-semibold">Pending User Request</h2>
          <div className="flex overflow-auto rounded shadow">
            <table className="text-center h-full w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th>Request ID</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Username</th>
                  <th>Date Requested</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.map((userRequest, index) => (
                  <tr key={index} className="odd:bg-gray-300">
                    <td>{userRequest.id}</td>
                    <td>{`${userRequest.lastName.toUpperCase()}, ${userRequest.firstName.toUpperCase()} ${userRequest.middleName.toUpperCase()} `}</td>
                    <td>{`${userRequest.position.toUpperCase()}`}</td>
                    <td>{userRequest.username}</td>
                    <td>
                      {userRequest.date_request
                        ? userRequest.date_request.toString().split("T")[0]
                        : ""}
                    </td>
                    <td className="flex w-full justify-center gap-1">
                      <button
                        onClick={() => approveRequest(userRequest)}
                        className="text-white p-1 shadow rounded bg-green-500 flex items-baseline"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button
                        onClick={() => denyRequest(userRequest)}
                        className="text-white p-1 shadow rounded bg-red-500 flex items-baseline"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
