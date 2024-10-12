import { Workbook } from "exceljs";

function convertExcelSheet(file: File) {
  const reader = new FileReader();

  if (file.name.split(".").pop() !== "xlsx") {
    return null;
  }
  reader.onload = async (e) => {
    const arrayBuffer = e.target?.result as ArrayBuffer;

    // Load the ExcelJS workbook from the ArrayBuffer
    const workbook = new Workbook();
    await workbook.xlsx.load(arrayBuffer);

    // Example: Log sheet names and row values
    workbook.eachSheet((sheet) => {
      console.log(`Sheet Name: ${sheet.name}`);
      sheet.eachRow((row, rowNumber) => {
        console.log(`Row ${rowNumber}: ${row.values}`);
      });
    });
  };
  const workbook = new Workbook();
  reader.readAsArrayBuffer(file);
}

export default { convertExcelSheet };
