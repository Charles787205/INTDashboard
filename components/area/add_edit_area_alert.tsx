"use client";

import { AreaType, PortCodeType } from "@/types";
import { User } from "next-auth";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const AddEditAreaAlert = ({
  swal,
  editedArea,
  sessionUser,
}: {
  swal: typeof Swal;
  sessionUser: User;
  editedArea?: AreaType;
}) => {
  const [area, setArea] = useState<AreaType>({
    name: "",
    portCodes: [
      {
        code: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (editedArea) {
      console.log(editedArea);
      if (editedArea.portCodes?.length == 0) {
        editedArea.portCodes = [{ code: "" }];
      }
      setArea(editedArea);
    }
    console.log(editedArea?.portCodes);
  }, []);

  const onAddArea = async (area: AreaType) => {
    setIsLoading(true);
    const portCodes = area.portCodes?.filter(
      (portCode) => portCode.code.trim() != ""
    );
    const res = await fetch("/api/areas", {
      method: editedArea ? "PATCH" : "POST",
      body: JSON.stringify({
        ...area,
        port_codes: portCodes,
        hub_id: sessionUser.id,
      }),
    });
    console.log("sadfad");
    const diffList = [];
    if (editedArea && editedArea.portCodes && area && area.portCodes) {
      for (const portcode of editedArea.portCodes) {
        if (!area.portCodes.includes(portcode)) {
          diffList.push(portcode); // Add to diffList if different
        }
      }
    }

    if (res.ok) {
      console.log(await res.json());
    } else {
      console.log("error");
    }
    swal.close();
  };

  function onAddPortCode() {
    const portCodes = area.portCodes;

    portCodes?.push({
      code: "",
    });
    setArea({ ...area, portCodes });
  }

  function onRemovePortCode(index: number) {
    const portCodes = area.portCodes;
    portCodes?.splice(index, 1);
    setArea({ ...area, portCodes });
  }
  return (
    <div className=" flex flex-col rounded-lg gap-3 pb-5">
      <h1 className="font-bold text-4xl mb-3">
        {editedArea ? "Edit Area" : "Add Area"}
      </h1>
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-baseline">
        <p className="text-start">Area:</p>
        <input
          type="text grid-span-2 col-span-2"
          placeholder="Area"
          value={area.name}
          onChange={(e) => setArea({ ...area, name: e.target.value })}
          className="border border-neutral-500 rounded px-2 py-1 text-lg"
        />

        <p className="text-start col-span-1">Port Code:</p>
        <div className="flex flex-col gap-2">
          {area &&
            area.portCodes &&
            area.portCodes.map((portCode, index) => (
              <div className="flex gap-2" key={index}>
                <input
                  type="text"
                  placeholder="Port Code"
                  value={portCode ? portCode.code : ""}
                  onChange={(e) => {
                    const portCodes = area.portCodes;
                    if (portCodes) {
                      portCodes[index].code = e.target.value;
                      setArea({ ...area, portCodes });
                    }
                  }}
                  className="border border-neutral-500 rounded px-2 py-1 text-lg"
                />
                <button
                  onClick={() => {
                    if (index == 0) {
                      onAddPortCode();
                    } else {
                      onRemovePortCode(index);
                    }
                  }}
                >
                  <span
                    className={`material-symbols-outlined p-1  text-white rounded shadow hover:scale-105 ${
                      index == 0 ? "bg-green-500" : "bg-red-600"
                    }`}
                  >
                    {index == 0 ? "add" : "remove"}
                  </span>
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-2 w-full mt-5">
        <button
          className="bg-neutral-500 text-white rounded px-2 py-1 flex-1 shadow"
          onClick={() => swal.close()}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log(area);

            onAddArea(area);
          }}
          className="bg-blue-600 text-white rounded px-2 py-1 flex-1 shadow"
        >
          {editedArea ? "Edit Area" : "Add Area"}
        </button>
      </div>
    </div>
  );
};

export default AddEditAreaAlert;
