import React from "react";

const CourierRow = () => {
  return (
    <div className="bg-white flex py-2 px-3 border items-center gap-3">
      <div className="flex items-center">
        <span className="material-symbols-outlined">account_circle</span>
      </div>
      <div className="flex">
        <h1 className="font-bold">John Doe</h1>
      </div>
    </div>
  );
};

export default CourierRow;
