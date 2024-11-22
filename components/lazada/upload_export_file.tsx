"use client";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Workbook } from "exceljs";
import { parse } from "papaparse";
import { ClipLoader } from "react-spinners";
const UploadCSVModal = ({
  fetchRunsheets,
  setModal,
}: {
  fetchRunsheets: Function;
  setModal: () => void;
}) => {
  function convertExcelSheet(file: File) {
    const reader = new FileReader();

    const fileExtension = file.name?.split(".").pop()?.toLowerCase() || ""; // Get the file extension
    if (fileExtension === "csv") {
      reader.readAsText(file); // For Excel files
      setFile(file);
    } else {
      alert("Unsupported file format. Please upload an XLSX or CSV file.");
      return;
    }

    reader.onload = async (e) => {
      const csvText = e.target?.result as string;
      console.log(csvText);
      // Parse CSV data using PapaParse
      parse(csvText, {
        header: true, // Treat first row as header
        complete: (results) => {
          const csvData = results.data; // This will be an array of objects
          const keys = Object.keys(csvData[0] || {});
          const header = [keys[0], keys[1]];
          const sheetLabels = header; // Get headers from the first row
          const excelData = csvData.map((row) => {
            const val = Object.values(row as string);
            const newVal = [val[0], val[1]];

            return newVal;
          });
          console.log(results.data);
          setRowCount(results.data.length); // Convert to 2D array
        },
        error: (error: any) => {
          alert("Error parsing CSV file: " + error.message);
        },
      });
    };
  }
  const uploadFile = async () => {
    setisLoading(true);
    if (!file) {
      alert("No file selected!");
      setisLoading(false);
      setModal();
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append file directly, no need for arrayBuffer

    try {
      const response = await fetch("/api/upload/export/", {
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

  const [rowCount, setRowCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setisLoading] = useState(false);
  return (
    <div className="flex flex-col items-center min-h-[300px] relative">
      <h2 className="font-bold text-xl mb-10">Upload Export</h2>

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
          <p>Choose a export file</p>
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

export default UploadCSVModal;
