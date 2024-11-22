"use client";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Workbook } from "exceljs";
import { parse } from "papaparse";
import { ClipLoader } from "react-spinners";
const UploadExcelModal = ({
  fetchRunsheets,
  setModal,
}: {
  fetchRunsheets: Function;
  setModal: () => void;
}) => {
  function convertExcelSheet(file: File) {
    const reader = new FileReader();

    const fileExtension = file.name?.split(".").pop()?.toLowerCase() || ""; // Get the file extension
    if (fileExtension === "xlsx") {
      reader.readAsArrayBuffer(file); // For Excel files
      setFile(file);
    } else {
      alert("Unsupported file format. Please upload an XLSX or CSV file.");
      setModal();
      return;
    }

    reader.onload = async (e) => {
      if (fileExtension === "xlsx") {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        // Load the ExcelJS workbook from the ArrayBuffer
        const workbook = new Workbook();
        await workbook.xlsx.load(arrayBuffer).catch((err) => {
          alert(
            "This file may be password encrypted. Please remove the password and try again."
          );
        });

        // Example: Log sheet names and row values
        workbook.eachSheet((sheet) => {
          const jsonData = [];
          const sheetLabels: string[] = [];
          const excelData: string[][] = [];
          if (sheet.name.toUpperCase() === "DATA") {
            console.log("data found");
            console.log(sheet.actualRowCount);
            setRowCount(sheet.actualRowCount);
            //setSheetLabels(sheetLabels);
            //setExcelData(excelData);
          }
        });
      }
    };
  }
  const uploadFile = async () => {
    setisLoading(true);
    if (!file) {
      alert("No file selected!");
      setisLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append file directly, no need for arrayBuffer
    formData.append("date", date);
    try {
      const response = await fetch("/api/upload/handover/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setisLoading(false);
        Swal.fire({
          icon: "success",
          title: "File uploaded successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchRunsheets();
      } else {
        setisLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed to upload file",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Failed to upload file");
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error uploading file", error);
    }
    setModal();
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [date, setDate] = useState(getTodayDate());
  const [rowCount, setRowCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setisLoading] = useState(false);
  return (
    <div className="flex flex-col items-center min-h-[300px] relative">
      <h2 className="font-bold text-xl mb-10">Upload Excel</h2>

      {!file ? (
        <>
          <input
            className=" p-2 mt-2 file:mr-5 file:py-2 file:px-3 
   file:text-xs file:font-medium
   file:bg-blue-400 file:rounded file:shadow-lg file:border-none file:text-white
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700 mb-10"
            type="file"
            value={""}
            onChange={(e) => {
              convertExcelSheet(e.target.files![0]);
            }}
          />
          <p>Choose a handover file</p>
        </>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-5">
          <Image
            src="/images/excel.png"
            width={50}
            height={50}
            alt="Excel Icon"
          />
          <h1 className="text-lg">{file.name}</h1>
          <h1 className="text-lg">{`Number of rows: ${rowCount}`}</h1>
          <div className="flex items-center mb-10 gap-2">
            <p>Date:</p>
            <input
              type="date"
              name=""
              id=""
              value={date}
              className="w-[250px] border border-neutral-200 shadow-inner outline-none shadow-neutral-600 py-1 px-3 rounded "
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            className=" absolute top-0 right-0  px-1 py-1 rounded  mt-5"
            onClick={() => {
              setFile(null);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      <div className="flex gap-3 mt-auto w-full justify-center">
        {isLoading ? (
          <div className="min-h-[70px]">
            <ClipLoader />
          </div>
        ) : (
          <>
            <button
              className="bg-neutral-200    shadow-neutral-600 px-10 py-1 rounded shadow mt-auto w-full"
              onClick={() => {
                setFile(null);
                Swal.close();
              }}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white shadow-neutral-600 px-10 py-1 rounded shadow mt-auto  w-full"
              onClick={() => uploadFile()}
            >
              Upload
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadExcelModal;
