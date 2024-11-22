"use client";
import Swal from "sweetalert2";
import { createPortal } from "react-dom";
import withReactContent from "sweetalert2-react-content";
import { useState, useRef, useEffect } from "react";
import UploadExcelModal from "./upload _excel_modal";
import UploadCSVModal from "./upload_export_file";
import { RunsheetType } from "@/types";
import { FadeLoader } from "react-spinners";
const ParcelPane = () => {
  const swal = withReactContent(Swal);
  const [addNewModalOpen, setAddNewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const modalContainerRef = useRef<HTMLElement | null>(null);
  const [runsheets, setRunsheets] = useState<RunsheetType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchRunsheets() {
    setIsLoading(true);
    try {
      const res = await fetch("api/parcel_management/runsheets/");
      if (!res.ok) throw new Error("Failed to fetch runsheets");
      const data = await res.json();
      setRunsheets(data.runsheets || []);
    } catch (error) {
      console.error("Error fetching runsheets:", error);
      swal.fire(
        "Error",
        "Unable to fetch runsheets. Please try again later.",
        "error"
      );
    }
    setIsLoading(false);
  }

  const openModal = () => {
    swal.fire({
      didOpen: () => {
        setAddNewModalOpen(true);

        modalContainerRef.current = swal.getHtmlContainer()!;
      },
      didClose: () => setAddNewModalOpen(false),
      showConfirmButton: false,
    });
  };
  const openCSVModal = () => {
    swal.fire({
      didOpen: () => {
        setUpdateModalOpen(true);

        modalContainerRef.current = swal.getHtmlContainer()!;
      },
      didClose: () => setUpdateModalOpen(false),
      showConfirmButton: false,
    });
  };
  useEffect(() => {
    fetchRunsheets();
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-neutral-100 shadow-lg shadow-neutral-600 rounded-lg mt-5 p-5">
      {!isLoading ? (
        <>
          <div className="flex justify-between w-full">
            <h2 className="font-bold text-xl">Runsheets</h2>
            <div className="flex gap-2">
              <button
                className="bg-neutral-500 text-white rounded-md p-1 flex items-baseline"
                title="Add Export Data"
                onClick={openCSVModal}
              >
                <span className="material-symbols-outlined text-2xl">
                  update
                </span>
              </button>
              <button
                className="bg-yellow-500 text-white rounded-md p-1 flex items-baseline"
                title="Add Item Handover file"
                onClick={openModal}
              >
                <span className="material-symbols-outlined text-2xl">
                  playlist_add
                </span>
              </button>
            </div>
          </div>
          <div className="rounded overflow-hidden mt-10">
            <table className="text-center h-full w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th>Runsheet Number</th>
                  <th>Date</th>
                  <th>Parcel Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {runsheets &&
                  runsheets.map((runsheet, ind) => (
                    <tr key={ind} className="odd:bg-gray-300">
                      <td>{runsheet.number}</td>
                      <td>
                        {new Date(Date.parse(runsheet.date_created))
                          .toString()
                          .split(" ")
                          .slice(0, 4)
                          .join(" ")}
                      </td>
                      <td>{runsheet.parcel_count}</td>
                      <td className="flex w-full justify-center">
                        <button className="text-white p-1 shadow rounded bg-green-500 flex items-baseline">
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {addNewModalOpen &&
            modalContainerRef.current &&
            createPortal(
              <UploadExcelModal
                fetchRunsheets={fetchRunsheets}
                setModal={() => setAddNewModalOpen(false)}
              />,
              modalContainerRef.current
            )}

          {updateModalOpen &&
            createPortal(
              <UploadCSVModal
                fetchRunsheets={fetchRunsheets}
                setModal={() => setUpdateModalOpen(false)}
              />,
              swal.getHtmlContainer()!
            )}
        </>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <FadeLoader color="#22C55E" />
        </div>
      )}
    </div>
  );
};

export default ParcelPane;
