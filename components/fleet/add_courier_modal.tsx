"use client";
import { CourierType, HubType } from "@/types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddCourierModal = ({
  setModalOpen,
  hubs,
  courierType,
}: {
  setModalOpen: (val: boolean) => void;
  hubs: HubType[];
  courierType: { value: string; description: string }[];
}) => {
  const [courier, setCourier] = useState<CourierType>({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    courier_hub: hubs.length > 0 ? hubs[0] : { id: 0, name: "" },
    courier_type: courierType.length > 0 ? `${courierType[0].value}` : "",
    plate_number: "",
    is_active: true,
    gcash_number: "",
    gcash_name: "",
  });

  const [currModal, setCurrModal] = useState(0);

  async function addCourier(courier: CourierType) {
    const res = await fetch("/api/fleet/courier", {
      method: "POST",
      body: JSON.stringify(courier),
    });
    if (res.ok) {
      console.log("Courier Added");
      setModalOpen(false);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Courier added",
      });
    } else {
      console.log("Error adding courier");
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Something went wrong",
      });
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCourier({
      ...courier,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div
      className="fixed flex top-0 left-0 w-full h-full bg-black bg-opacity-30"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="flex flex-col bg-white p-5 rounded-lg shadow-lg my-auto mx-auto w-2/6 h-4/6  gap-2 min-w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-baseline justify-between">
          <h1 className="font-bold text-2xl">Add Courier</h1>
          <button onClick={() => setModalOpen(false)}>
            <span className="material-symbols-outlined text-neutral-500">
              close
            </span>
          </button>
        </div>

        {currModal == 0 ? (
          <div className="flex  flex-col [&>p]:text-neutral-600 w-full justify-evenly  h-full">
            <div className="flex flex-col gap-2">
              <p>First Name:</p>
              <input
                onChange={onInputChange}
                value={courier.first_name}
                name="first_name"
                type="text"
                placeholder="First Name"
                className="rounded-lg border-2 border-neutral-300 p-2"
              />
              <p>Middle Name:</p>
              <input
                onChange={onInputChange}
                value={courier.middle_name}
                type="text"
                name="middle_name"
                placeholder="Middle Name"
                className="rounded-lg border-2 border-neutral-300 p-2"
              />
              <p>Last Name:</p>
              <input
                onChange={onInputChange}
                value={courier.last_name}
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="rounded-lg border-2 border-neutral-300 p-2"
              />
              <p>Phone Number:</p>
              <input
                onChange={onInputChange}
                value={courier.phone_number}
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                className="rounded-lg border-2 border-neutral-300 p-2"
              />
              <p>Courier Type:</p>
              <select
                value={courier.courier_type}
                name="courier_type"
                id=""
                className="rounded-lg border-2 border-neutral-300 p-2"
                onChange={(e) => {
                  setCourier({
                    ...courier,
                    courier_type: `${
                      courierType[e.target.selectedIndex].value
                    }`,
                  });
                }}
              >
                {courierType.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.description}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setCurrModal(1)}
              type="button"
              className="bg-amber-400 hover:bg-amber-500 hover:scale-105 duration-300 ease-in-out shadow shadow-neutral-400 rounded-lg px-4 py-2 text-black"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="flex  flex-col [&>p]:text-neutral-600 w-full justify-evenly  h-full">
            <p>Plate Number:</p>
            <input
              onChange={onInputChange}
              value={courier.plate_number}
              type="text"
              placeholder="Plate Number"
              name="plate_number"
              className="rounded-lg border-2 border-neutral-300 p-2"
            />
            <p>GCash Number:</p>
            <input
              onChange={onInputChange}
              value={courier.gcash_number}
              type="text"
              placeholder="GCash Number"
              name="gcash_number"
              className="rounded-lg border-2 border-neutral-300 p-2"
            />
            <p>GCash Name:</p>
            <input
              onChange={onInputChange}
              value={courier.gcash_name}
              type="text"
              name="gcash_name"
              placeholder="GCash Name"
              className="rounded-lg border-2 border-neutral-300 p-2"
            />
            <p>Hub</p>
            <select
              value={courier.courier_hub.name}
              name="courier_hub"
              id=""
              className="rounded-lg border-2 border-neutral-300 p-2 mb-5"
              onChange={(e) => {
                setCourier({
                  ...courier,
                  courier_hub: hubs[e.target.selectedIndex],
                });
              }}
            >
              {hubs.map((hub, index) => (
                <option key={index} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setCurrModal(0);
              }}
              type="button"
              className="bg-neutral-800 hover:bg-neutral-900 text-white hover:scale-105 duration-300 ease-in-out shadow shadow-neutral-400 rounded-lg px-4 py-2 "
            >
              Back
            </button>
            <button
              onClick={async () => {
                await addCourier(courier);
              }}
              type="button"
              className="bg-amber-400 hover:bg-amber-500 hover:scale-105 duration-300 ease-in-out shadow shadow-neutral-400 rounded-lg px-4 py-2 text-black"
            >
              Add Courier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourierModal;
