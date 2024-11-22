import { CourierType } from "@/types";
import CourierRow from "./courier_row";

const CourierPane = ({ couriers }: { couriers: CourierType[] }) => {
  return (
    <div className="flex flex-col p-5 overflow-auto">
      <div className="flex gap-3 ">
        <h1 className="font-bold text-2xl">Couriers</h1>
        <div className="flex ml-auto">
          <select
            name=""
            id=""
            className="bg-white outline-none border rounded px-5"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex border  rounded bg-white py-1 px-2 ">
          <span className="material-symbols-outlined">search</span>
          <input type="text" className="border-none outline-none px-2" />
        </div>
        <button className="bg-blue-600 text-white rounded px-2 py-1">
          Search
        </button>
      </div>
      <div className="flex shadow rounded overflow-auto mt-5 max-h-[calc(100vh-15em)]">
        <table className=" rounded shadow w-full   overflow-auto    [&_td]:h-[50px]  [&_td]:px-5">
          <thead className="rounded-t-lg sticky top-0 w-full ">
            <tr className="bg-neutral-800  text-white  min-w-full">
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Vehicle Type</th>
              <th>Status</th>
              <th>Hub</th>
              <th>Plate Number</th>
            </tr>
          </thead>
          <tbody>
            {couriers &&
              couriers.map((courier, index) => (
                <tr
                  key={index}
                  className="even:bg-amber-100 text-center  min-w-full cursor-pointer hover:bg-blue-600 hover:text-white"
                >
                  <td>{index + 1}</td>
                  <td className="min-w-40">{`${courier.first_name} ${courier.middle_name} ${courier.last_name}`}</td>
                  <td className="min-w-40">{courier.phone_number}</td>
                  <td className="min-w-40">{courier.courier_type}</td>
                  <td className="min-w-30">
                    {courier.is_active ? "Active" : "Not Active"}
                  </td>
                  <td className="min-w-40">{courier.courier_hub.name}</td>
                  <td className="min-w-40">{courier.plate_number}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourierPane;
