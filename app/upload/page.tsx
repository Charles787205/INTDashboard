"use client";
import { useState } from "react";
import Image from "next/image";
import { Workbook } from "exceljs";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isFileOver, setIsFileOver] = useState(false);
  const [excelData, setExcelData] = useState<[][]>([]);
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    console.log(event.dataTransfer.files);
    setFile(event.dataTransfer.files[0]);
    setIsFileOver(false);
  }
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsFileOver(true);
  }
  function convertExcelSheet(file: File) {
    const reader = new FileReader();

    if (file.name.split(".").pop() !== "xlsx") {
      return null;
    }
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;

      // Load the ExcelJS workbook from the ArrayBuffer
      const workbook = new Workbook();
      await workbook.xlsx.load(arrayBuffer).catch((err) => {
        alert(
          "This file may be password encrypted please remove the password and try again"
        );
      });

      // Example: Log sheet names and row values
      workbook.eachSheet((sheet) => {
        const jsonData = [];
        const sheetLabels = [];
        if (sheet.name === "DATA") {
          sheet.eachRow((row, rowNumber) => {
            if (rowNumber == 1) {
              sheetLabels.push(row.values);
            } else {
            }
          });
        }
      });
    };
    const workbook = new Workbook();

    reader.readAsArrayBuffer(file);

    console.log("Error");
  }
  return (
    <div className="flex w-full rounded-2xl p-5 flex-col bg-white shadow shadow-neutral-600 ease-in-out duration-150">
      <h1 className="text-2xl font-bold">Upload Excel File</h1>

      {file ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center my-10 gap-5">
            <Image src="/excel.png" width={50} height={50} alt="Excel Icon" />
            <h1 className="text-xl font-light">{file.name}</h1>
          </div>
          <button
            className="w-[250px] bg-red-500 hover:scale-105 ease-in-out duration-150 text-white py-1 px-3 rounded shadow shadow-neutral-400"
            onClick={() => {
              setFile(null);
            }}
          >
            Remove File
          </button>
          <button
            className="w-[250px] bg-blue-500 hover:scale-105 ease-in-out duration-150 text-white py-1 px-3 rounded shadow shadow-neutral-400"
            onClick={() => {
              convertExcelSheet(file);
            }}
          >
            Upload File
          </button>
        </div>
      ) : (
        <div
          className={`rounded-2xl bg-neutral-200 flex flex-col max-w-[400px]  duration-300 ease-in-out h-[250px] justify-center items-center ${
            isFileOver
              ? "border-blue-400 border-4 border-solid"
              : "border-neutral-700 border-2  border-dotted"
          }`}
          onDrop={handleDrop}
          onDragOverCapture={handleDragOver}
          onDragLeaveCapture={(e) => {
            e.preventDefault();
            console.log("exit");
            setIsFileOver(false);
          }}
        >
          Drag files here
        </div>
      )}
    </div>
  );
};

export default Upload;
