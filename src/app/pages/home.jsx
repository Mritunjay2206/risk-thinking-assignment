"use client"; // this is a client component
import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import DataTable from "../components/DataTable";
import { groupBy } from "lodash";
import DataSet from "../../data/data.json";

const COLUMNS= [
  { id: "Asset Name", label: "Asset Name", sorting: true },
  { id: "Business Category", label: "Business Category", sorting: true },
  { id: "Risk Rating", label: "Risk Rating", sorting: false },
]

export default function HomePage() {
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const groupedData = groupBy(DataSet, "Year");
    const optionsData = Object.keys(groupedData);
    setOptions(optionsData);
    setSelectedOption(optionsData[0]);
    setData(groupedData);
  }, []);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleMarkerClick = (location) =>{
    const filteredLocation = DataSet.filter(l=>l.Lat === location.Lat && l.Long===location.Long)
    console.log(filteredLocation)
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <label
        htmlFor="countries_multiple"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select Year
      </label>
      <select
        onChange={handleChange}
        value={selectedOption}
        id="countries_multiple"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((o) => {
          return (
            <option key={o} value={o} selected>
              {o}
            </option>
          );
        })}
      </select>
      {data[selectedOption] ? (
        <>
          <Map locations={data[selectedOption]} handleMarkerClick={handleMarkerClick}/>
          <DataTable data={data[selectedOption]} columns={COLUMNS} enableGlobalFilter/>
        </>
      ) : null}
    </main>
  );
}
