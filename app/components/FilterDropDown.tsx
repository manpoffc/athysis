import { FaBeer } from "react-icons/fa";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import React, { useState } from 'react';

type Props = {};
interface Athlete{
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
interface FilterDropDownProps{
    filteredData: Athlete[]
    setFilteredData: (data: Athlete[])=> void
}
const FilterDropDown: React.FC<FilterDropDownProps> = ({filteredData,setFilteredData}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [gender, setGender] = useState('all');
  const [citizen, setCitizen] = useState('all');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const resetFilters = () => {
    setAgeRange([18, 65]);
    setGender('all');
    setCitizen('all');
  };
  const applyFilters = () => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL+'/filter');
    url.searchParams.append('minAge', ageRange[0].toString());
    url.searchParams.append('maxAge', ageRange[1].toString());
    url.searchParams.append('gender', gender);
    url.searchParams.append('citizen', citizen);
  
    fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else {
          console.error('Error while making the GET request');
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        // Update the filteredData state with the data from the API response
        setFilteredData(data);
        setDropdownOpen(false);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };
    const handleMinAgeChange = (value: number) => {
    if (value <= ageRange[1]) {
      setAgeRange([value, ageRange[1]]);
    } else {
      setAgeRange([value, value]);
    }
  };

  const handleMaxAgeChange = (value: number) => {
    if (value >= ageRange[0]) {
      setAgeRange([ageRange[0], value]);
    } else {
      setAgeRange([value, value]);
    }
  };

  return (
    <div className='relative p-2'>
      <button
        className='bg-cyan-700 flex justify-center items-center space-x-5 text-white w-28 h-10 rounded-md'
        onClick={toggleDropdown}
      >
        <span>Filter</span> {isDropdownOpen? <FaArrowUp />:<FaArrowDown /> }
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
              value={ageRange[0]}
              onChange={(e) => handleMinAgeChange(parseInt(e.target.value))}
              className='w-full'
            />
            <input
              type='range'
              min='0'
              max='100'
              step='1'
              value={ageRange[1]}
              onChange={(e) => handleMaxAgeChange(parseInt(e.target.value))}
              className='w-full'
            />
            <p className='text-center'>
              Age: {ageRange[0]} - {ageRange[1]}
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
                  checked={gender === 'all'}
                  onChange={() => setGender('all')}
                />
                All
              </label>
              <label className='mr-2 flex flex-col'>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                Male
              </label>
              <label className='flex flex-col'>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
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
                  checked={citizen === 'all'}
                  onChange={() => setCitizen('all')}
                />
                All
              </label>
              <label className='mr-2 flex flex-col'>
                <input
                  type='radio'
                  name='citizen'
                  value='yes'
                  checked={citizen === 'yes'}
                  onChange={() => setCitizen('yes')}
                />
                Yes
              </label>
              <label className='flex flex-col'>
                <input
                  type='radio'
                  name='citizen'
                  value='no'
                  checked={citizen === 'no'}
                  onChange={() => setCitizen('no')}
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
              onClick={applyFilters}
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
