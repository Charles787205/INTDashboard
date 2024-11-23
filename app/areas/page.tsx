"use client";
import { useEffect, useState } from "react";

import { AreaType } from "@/types";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import withReactContent from "sweetalert2-react-content";
import AddEditAreaAlert from "@/components/area/add_edit_area_alert";
import { LatLng, LatLngExpression, LatLngTuple } from "leaflet";

const Areas = () => {
  const { data: sessionData } = useSession();
  const [user, setUser] = useState<User>();
  const swal = withReactContent(Swal);
  const [zoom, setZoom] = useState<number>(13);

  const [mapConfig, setMapConfig] = useState<{
    hub_id: number;
    zoom: number;
    center: LatLngExpression;
  }>({
    hub_id: 0,
    zoom: 13,
    center: [7.04581, 125.52418],
  });
  useEffect(() => {
    console.log(sessionData, "asdfas");
    if (sessionData && sessionData.user) {
      console.log(sessionData.user, "this is good");
      setUser(sessionData.user);
      if (sessionData.user.hub) {
      }
    }
  }, [sessionData]);
  useEffect(() => {
    if (user?.hub) {
      fetchMapConfig();
    }
    fetchAreas();
  }, [user]);
  const Map = dynamic(() => import("@/components/map"), {
    ssr: false,
  });
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [areaModalOpen, setAreaModalOpen] = useState(false);
  const [editedArea, setEditedArea] = useState<AreaType>();
  async function onEditAreaClicked(area: AreaType) {
    setEditedArea(area);
    swal.fire({
      didClose: () => setAreaModalOpen(false),
      didOpen: () => setAreaModalOpen(true),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded-lg !p-0",
        htmlContainer: "!m-0 !rounded-lg p-0 ",
      },
    });
  }

  async function fetchMapConfig() {
    try {
      const res = await fetch(`/api/fleet/hubs/${user?.hub}`);
      if (res.ok) {
        const mapConfig = await res.json();

        setMapConfig({
          hub_id: mapConfig.id,
          zoom: mapConfig.zoom,
          center: [mapConfig.latitude, mapConfig.longitude],
        });
      }
    } catch (error) {
      console.log("Error fetching map config", error);
    }
  }
  async function fetchAreas() {
    try {
      const res = await fetch("/api/areas");
      if (res.ok) {
        const areas = await res.json();

        setAreas(
          areas.map((serverArea: any) => {
            const area: AreaType = {
              name: serverArea.name,
              id: serverArea.id,
              portCode: serverArea.port_code,
              portCodes: serverArea.port_codes,
              hub: serverArea.hub_id,
              coordinates: serverArea.coordinates,
            };
            return area;
          })
        );
      }
    } catch (error) {
      console.log("Error fetching areas", error);
    }
  }

  async function deleteArea(area: AreaType) {
    const res = await fetch("/api/areas/", {
      method: "DELETE",
      body: JSON.stringify(area),
    });
    return res;
  }
  useEffect(() => {
    if (!areaModalOpen) {
      fetchAreas();
      if (editedArea) {
        setEditedArea(undefined);
      }
    }
  }, [areaModalOpen]);
  useEffect(() => {}, []);

  function onAddAreaClicked() {
    swal.fire({
      didClose: () => setAreaModalOpen(false),
      didOpen: () => setAreaModalOpen(true),
      showConfirmButton: false,

      customClass: {
        popup: "m-0 flex !w-auto !rounded-lg !p-0",
        htmlContainer: "!m-0 !rounded-lg p-0 ",
      },
    });
  }

  function onDeleteAreaClicked(area: AreaType) {
    swal.fire({
      title: "Delete",
      text: `Are you sure you want to delete area "${area.name}"?`,
      icon: "warning",

      showCancelButton: true,
      customClass: {
        confirmButton: "!bg-red-500",
        cancelButton: "",
      },
      showLoaderOnConfirm: true,
      timerProgressBar: true,
      preConfirm: async () => {
        try {
          const response = await deleteArea(area);
          if (!response.ok) {
            throw Error;
          }
          await swal.fire({
            title: "Success",
            icon: "success",
            text: "Area is deleted",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          fetchAreas();
        } catch (error) {
          swal.showValidationMessage(`
              Request failed: Server Error
            `);

          await swal.fire({
            title: "Server Error",
            icon: "error",
            text: "Area wasn't deleted.",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  function onUploadCSVClicked() {
    swal.fire({
      title: "Upload MyMaps CSV",
      html: `
      <input type="file" id="file" name="file" accept=".csv" class="w-full p-2 border border-neutral-500 rounded-lg">
      `,
      showCancelButton: true,
      showConfirmButton: true,
      preConfirm: async () => {
        const file = (document.getElementById("file") as HTMLInputElement)
          .files![0];
        const formData = new FormData();
        formData.append("file", file);
        try {
          const response = await fetch("/api/areas/upload", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            fetchAreas();
            await swal.fire({
              title: "Success",
              icon: "success",
              text: "File uploaded successfully",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
            });
          } else {
            await swal.fire({
              title: "Error",
              icon: "error",
              text: "Failed to upload file",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.error("Error uploading file", error);
        }
      },
    });
  }
  function onSaveMapConfig() {
    swal.fire({
      title: "Save Map Config",
      text: "Are you sure you want to save the map configuration?",
      showCancelButton: true,
      showConfirmButton: true,
      preConfirm: async () => {
        try {
          swal.showLoading(swal.getConfirmButton());
          const response = await fetch(`/api/fleet/hubs/${user?.hub}`, {
            method: "PATCH",
            body: JSON.stringify({
              latitude: Array.isArray(mapConfig.center)
                ? mapConfig.center[0]
                : mapConfig.center.lat,
              longitude: Array.isArray(mapConfig.center)
                ? mapConfig.center[1]
                : mapConfig.center.lng,
              zoom: mapConfig.zoom,
              hub_id: mapConfig.hub_id,
            }),
          });
          if (response.ok) {
            await swal.fire({
              title: "Success",
              icon: "success",
              text: "Map configuration saved",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
            });
          } else {
            await swal.fire({
              title: "Error",
              icon: "error",
              text: "Failed to save map configuration",
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.error("Error saving map config", error);
        }
      },
    });
  }
  return (
    <div className="flex w-full max-w-full overflow-hidden rounded-2xl p-5 flex-col bg-white shadow shadow-neutral-600 ease-in-out duration-150 ">
      <div className="flex w-full justify-between mb-10">
        <h1 className="font-bold text-2xl">Area Management</h1>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col w-full">
          <div className="flex gap-2">
            <button
              onClick={() => onAddAreaClicked()}
              className="bg-yellow-400  font-semibold rounded px-2 py-1 w-[200px] shadow    hover:scale-105 gap-2"
            >
              Add Area
            </button>
            <button
              className="bg-blue-600 font-semibold  text-white shadow px-2 py-1 rounded  hover:scale-105"
              onClick={() => onUploadCSVClicked()}
            >
              Upload CSV
            </button>
          </div>
          <div className="flex  rounded overflow-auto mt-5 max-h-[calc(100vh-15em)] gap-10">
            <table className=" rounded shadow w-full text-sm    overflow-auto text-center     [&_td]:h-[50px]  [&_td]:px-5">
              <thead className="rounded-t-lg sticky top-0 w-full ">
                <tr className="bg-neutral-800  text-white  ">
                  <th>Area</th>
                  <th>Port Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {areas &&
                  areas.map((area, index) => (
                    <tr
                      key={index}
                      className="even:bg-amber-100 text-center  min-w-full cursor-pointer hover:bg-neutral-200"
                    >
                      <td className=" text-sm 2xl:text-base">{area.name}</td>
                      <td className=" text-sm 2xl:text-base">
                        {area.portCodes &&
                          area.portCodes.length > 0 &&
                          area.portCodes[0].code}
                      </td>
                      <td className="flex justify-center items-center gap-2">
                        <button
                          className="bg-blue-600 hover:scale-105  text-white rounded px-1 2xl:py-1 flex"
                          title="Edit area"
                          onClick={() => {
                            onEditAreaClicked(area);
                          }}
                        >
                          <span className="material-symbols-outlined my-auto text-base 2xl:text-base">
                            edit
                          </span>
                        </button>
                        <button
                          className="bg-red-600 hover:scale-105  text-white rounded px-1 2xl:py-1 flex"
                          title="Delete area"
                          onClick={() => onDeleteAreaClicked(area)}
                        >
                          <span className="material-symbols-outlined  my-auto text-base 2xl:text-base">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p>Center</p>
            <input
              type="text"
              className="py-1 px-2 border outline-none rounded"
              value={
                Array.isArray(mapConfig.center)
                  ? mapConfig.center.join(", ")
                  : "Invalid Center"
              }
              onChange={(e) => {
                try {
                  const center = e.target.value.split(",").map(Number); // directly map to an array of numbers
                  if (
                    center.length === 2 &&
                    center.every((coord) => !isNaN(coord))
                  ) {
                    // validate each number
                    setMapConfig({
                      ...mapConfig,
                      center: center as LatLngTuple,
                    });
                  } else {
                    throw new Error("Invalid input");
                  }
                } catch (e) {
                  console.log("Invalid center input:", e);
                }
              }}
            />

            <p>Zoom</p>
            <input
              type="number"
              onChange={(e) =>
                setMapConfig({ ...mapConfig, zoom: Number(e.target.value) })
              }
              value={mapConfig.zoom}
              name=""
              className="py-1 px-2 border outline-non rounded"
            />
            <button
              onClick={(e) => {
                onSaveMapConfig();
              }}
              className="px-2 py-2 bg-blue-600 text-white flex items-center rounded shadow hover:scale-105"
            >
              <span className="material-symbols-outlined">save</span>
            </button>
          </div>
          <div className="rounded min-w-[500px] h-[500px] mt-5 ">
            <Map
              areas={areas}
              zoom={mapConfig.zoom}
              center={mapConfig.center}
            />
          </div>
        </div>
      </div>
      {areaModalOpen &&
        createPortal(
          <AddEditAreaAlert
            editedArea={editedArea}
            sessionUser={user!}
            swal={swal}
          />,
          swal.getHtmlContainer()!
        )}
    </div>
  );
};

export default Areas;
