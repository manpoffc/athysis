'use client';
import { Button, Dropdown, Modal, Table } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Pagination } from 'flowbite-react';
import FilterDropdown from '../components/FilterDropDown';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
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

const DashboardPage: React.FC = () => {
  const [isGenderSortedClicked,setIsGenderSortedClicked] = useState(false)
  const [isAgeSortedClicked, setIsAgeSortedClicked] = useState(false)
  const [isCitizenSortedClicked, setIsCitizenSortedClicked] = useState(false)
  const [sortedData,setSortedData] = useState<Athlete[]>([]);
  const [data, setData] = useState<Athlete[]>([]);
  const [filteredData, setFilteredData] = useState<Athlete[]>([]);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
useEffect(() => {
    async function fetchData() {
      try {
        console.log('HELLOOOO',process.env.NEXT_PUBLIC_API_URL)
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/athletes'); // Replace with your server's actual URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        setSortedData(fetchedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  const handleRowClick = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setOpenModal('dismissible');
  };
  const handleSort = () => {
    const sortedData = [...data].sort((a: Athlete | undefined, b: Athlete | undefined) => {
      if (a && b) {
        if (isAgeSortedClicked) {
          return a.age - b.age;
        } else {
          return b.age - a.age;
        }
      }
      return 0;
    });
  
    setSortedData(sortedData);
    setIsAgeSortedClicked(!isAgeSortedClicked);
  };
  
  const handleSortByCitizenship = () => {
    const sortedData = [...data].sort((a: Athlete | undefined, b: Athlete | undefined) => {
      if (a && b) {
        if (isCitizenSortedClicked) {
          return a.citizen === b.citizen ? 0 : a.citizen ? -1 : 1;
        } else {
          return a.citizen === b.citizen ? 0 : a.citizen ? 1 : -1;
        }
      }
      return 0;
    });
  
    setSortedData(sortedData);
    setIsCitizenSortedClicked(!isCitizenSortedClicked);
  };
  const handleSortByGender = () => {
    const sortedData = [...data].sort((a: Athlete | undefined, b: Athlete | undefined) => {
      if (a && b) {
        if (isGenderSortedClicked) {
          return a.gender.localeCompare(b.gender);
        } else {
          return b.gender.localeCompare(a.gender);
        }
      }
      return 0;
    });
  
    setSortedData(sortedData);
    setIsGenderSortedClicked(!isGenderSortedClicked);
  };
    
  const applyFilters = (filtered:Athlete[])=>{
    setSortedData(filtered)
  }
  return (
    <div>
      
      <div className='p-4 flex justify-start items-center mr-8 space-x-8'>
        <FilterDropdown filteredData={filteredData} setFilteredData={applyFilters}/>
      </div>
      {sortedData.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell onClick={()=>handleSort()} className=''><span className='cursor-pointer'>Age</span></Table.HeadCell>
            <Table.HeadCell className='cursor-pointer' onClick={()=>handleSortByGender()}>Gender </Table.HeadCell>
            <Table.HeadCell>College</Table.HeadCell>
            <Table.HeadCell>Instagram</Table.HeadCell>
            <Table.HeadCell onClick={()=>handleSortByCitizenship()} className=''><span className='cursor-pointer'>Citizen</span></Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {sortedData.map((item, index) => (
              <Table.Row
                key={index}
                className={
                  index % 2 === 0
                    ? 'bg-white cursor-pointer dark:border-gray-700 dark:bg-gray-800'
                    : 'bg-gray-50 cursor-pointer dark:border-gray-700 dark:bg-gray-800'
                }
                onClick={()=>handleRowClick(item)}

              >
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text:white'>
                  {item.firstName}
                </Table.Cell>
                <Table.Cell>{item.lastName}</Table.Cell>
                <Table.Cell>{item.age}</Table.Cell>
                <Table.Cell>
                  {item.gender.charAt(0).toUpperCase() + item.gender.slice(1).toLowerCase()}
                </Table.Cell>
                <Table.Cell>{item.college}</Table.Cell>
                <Table.Cell>{item.instagram}</Table.Cell>
                <Table.Cell>{item.citizen ? 'Yes' : 'No'}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>Loading data...</p>
      )}
 <Modal dismissible show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>
        <Modal.Body>
        {selectedAthlete && (
          <div>
            <h2>{`${selectedAthlete.firstName} ${selectedAthlete.lastName}`}</h2>
            <p>{`Age: ${selectedAthlete.age}`}</p>
            <p>{`Gender: ${selectedAthlete.gender}`}</p>
            <p>{`College: ${selectedAthlete.college}`}</p>
            <p>{`Instagram: ${selectedAthlete.instagram}`}</p>
            <p>{`Citizen: ${selectedAthlete.citizen ? 'Yes' : 'No'}`}</p>
          </div>
        )}
        </Modal.Body>
      </Modal>
      
    </div>
  );
};
export default DashboardPage;