import { FaBeer } from "react-icons/fa";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import React, { useState } from 'react';

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
  fetchData: (data: any) => void
}
const FilterDropDown: React.FC<FilterDropDownProps> = ({ fetchData }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState({
    ageRange: [18, 65],
    gender: 'all',
    citizen: 'all'
  });

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const resetFilters = () => {
    setFilteredData({
      ageRange: [18, 65],
      gender: 'all',
      citizen: 'all'
    })
    fetchData({
      ageRange: [18, 65],
      gender: 'all',
      citizen: 'all'
    })
  };
  const handleCitizenChange = (data: string) => {

    setFilteredData({ ...filteredData, citizen: data })
  }

  const handleGenderChange = (data: any) => {

    setFilteredData({ ...filteredData, gender: data })

  }
  const handleMinAgeChange = (value: number) => {
    const newMinAge = Math.min(value, filteredData.ageRange[1]);
    setFilteredData({ ...filteredData, ageRange: [newMinAge, filteredData.ageRange[1]] });
  };
  
  const handleMaxAgeChange = (value: number) => {
    const newMaxAge = Math.max(value, filteredData.ageRange[0]);
    setFilteredData({ ...filteredData, ageRange: [filteredData.ageRange[0], newMaxAge] });
  };
  
  return (
    <div className='relative p-2'>
      <button
        className='bg-cyan-700 flex justify-center items-center space-x-5 text-white w-28 h-10 rounded-md'
        onClick={toggleDropdown}
      >
        <span>Filter</span> {isDropdownOpen ? <FaArrowUp /> : <FaArrowDown />}
      </button>
      {isDropdownOpen && (
        <div className='absolute mt-2 p-8 w-72 bg-white border rounded-md shadow-md z-10'>
          <div className='mb-4'>
            <label className='block font-medium mb-2'>Age</label>
            <input
              type='range'
              min='0'
              max='100'
              step='1'
              value={filteredData.ageRange[0]}
              onChange={(e) => handleMinAgeChange(parseInt(e.target.value))}
              className='w-full'
            />
            <input
              type='range'
              min='0'
              max='100'
              step='1'
              value={filteredData.ageRange[1]}
              onChange={(e) => handleMaxAgeChange(parseInt(e.target.value))}
              className='w-full'
            />
            <p className='text-center'>
              Age: {filteredData.ageRange[0]} - {filteredData.ageRange[1]}
            </p>
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2'>Gender</label>
            <div className='flex text-center justify-between'>
              <label className='mr-2 flex flex-col'>
                <input
                  type='radio'
                  name='gender'
                  value='all'
                  checked={filteredData.gender === 'all'}
                  onChange={() => { handleGenderChange('all') }}
                />
                All
              </label>
              <label className='mr-2 flex flex-col'>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={filteredData.gender === 'male'}
                  onChange={() => { handleGenderChange('male') }}
                />
                Male
              </label>
              <label className='flex flex-col'>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={filteredData.gender === 'female'}
                  onChange={() => { handleGenderChange('female') }}
                />
                Female
              </label>
            </div>
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2'>Citizen</label>
            <div className='flex justify-between'>
              <label className='mr-2 flex flex-col'>
                <input
                  type='radio'
                  name='citizen'
                  value='all'
                  checked={filteredData.citizen === 'all'}
                  onChange={() => { handleCitizenChange('all') }}
                />
                All
              </label>
              <label className='mr-2 flex flex-col'>
                <input
                  type='radio'
                  name='citizen'
                  value='yes'
                  checked={filteredData.citizen === 'yes'}
                  onChange={() => { handleCitizenChange('yes') }}
                />
                Yes
              </label>
              <label className='flex flex-col'>
                <input
                  type='radio'
                  name='citizen'
                  value='no'
                  checked={filteredData.citizen === 'no'}
                  onChange={() => { handleCitizenChange('no') }}
                />
                No
              </label>
            </div>
          </div>
          <div className='flex justify-between'>
            <button
              className='bg-red-500 text-white w-20 h-8 rounded-md'
              onClick={resetFilters}
            >
              Reset
            </button>
            <button
              className='bg-green-500 text-white w-20 h-8 rounded-md'
              onClick={() => fetchData(filteredData)}
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
