import { FaBeer } from "react-icons/fa";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import React, { useState } from "react";

type Props = {};
interface Athlete {
  age: number;
  citizen: boolean;
  college: string;
  firstName: string;
  gender: string;
  id: number;
  image_url: string;
  instagram: string;
  lastName: string;
  sport: string;
}
interface FilterDropDownProps {
  fetchData: (data: any) => void;
  filterData: any;
  setFilterData: (data: any) => void;
}
const FilterDropDown: React.FC<FilterDropDownProps> = ({
  fetchData,
  filterData,
  setFilterData,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const resetFilters = () => {
    setFilterData({
      ageRange: [18, 65],
      gender: "all",
      citizen: "all",
    });
    fetchData({
      ageRange: [18, 65],
      gender: "all",
      citizen: "all",
    });
  };
  const handleCitizenChange = (data: string) => {
    setFilterData({ ...filterData, citizen: data });
  };

  const handleGenderChange = (data: any) => {
    setFilterData({ ...filterData, gender: data });
  };
  const handleMinAgeChange = (value: number) => {
    const newMinAge = Math.min(value, filterData.ageRange[1]);
    setFilterData({
      ...filterData,
      ageRange: [newMinAge, filterData.ageRange[1]],
    });
  };

  const handleMaxAgeChange = (value: number) => {
    const newMaxAge = Math.max(value, filterData.ageRange[0]);
    setFilterData({
      ...filterData,
      ageRange: [filterData.ageRange[0], newMaxAge],
    });
  };

  return (
    <div className="relative p-2">
      <button
        className="bg-cyan-700 flex justify-center items-center space-x-5 text-white w-28 h-10 rounded-md"
        onClick={toggleDropdown}
      >
        <span>Filter</span> {isDropdownOpen ? <FaArrowUp /> : <FaArrowDown />}
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-2 p-8 w-72 bg-white border rounded-md shadow-md z-10">
          <div className="mb-4">
            <label className="block font-medium mb-2">Age</label>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={filterData.ageRange[0]}
              onChange={(e) => handleMinAgeChange(parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={filterData.ageRange[1]}
              onChange={(e) => handleMaxAgeChange(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-center">
              Age: {filterData.ageRange[0]} - {filterData.ageRange[1]}
            </p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Gender</label>
            <div className="flex text-center justify-between">
              <label className="mr-2 flex flex-col">
                <input
                  type="radio"
                  name="gender"
                  value="all"
                  checked={filterData.gender === "all"}
                  onChange={() => {
                    handleGenderChange("all");
                  }}
                />
                All
              </label>
              <label className="mr-2 flex flex-col">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={filterData.gender === "male"}
                  onChange={() => {
                    handleGenderChange("male");
                  }}
                />
                Male
              </label>
              <label className="flex flex-col">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={filterData.gender === "female"}
                  onChange={() => {
                    handleGenderChange("female");
                  }}
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Citizen</label>
            <div className="flex justify-between">
              <label className="mr-2 flex flex-col">
                <input
                  type="radio"
                  name="citizen"
                  value="all"
                  checked={filterData.citizen === "all"}
                  onChange={() => {
                    handleCitizenChange("all");
                  }}
                />
                All
              </label>
              <label className="mr-2 flex flex-col">
                <input
                  type="radio"
                  name="citizen"
                  value="yes"
                  checked={filterData.citizen === "yes"}
                  onChange={() => {
                    handleCitizenChange("yes");
                  }}
                />
                Yes
              </label>
              <label className="flex flex-col">
                <input
                  type="radio"
                  name="citizen"
                  value="no"
                  checked={filterData.citizen === "no"}
                  onChange={() => {
                    handleCitizenChange("no");
                  }}
                />
                No
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white w-20 h-8 rounded-md"
              onClick={resetFilters}
            >
              Reset
            </button>
            <button
              className="bg-green-500 text-white w-20 h-8 rounded-md"
              onClick={() => fetchData(filterData)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
