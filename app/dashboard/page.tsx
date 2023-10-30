"use client";
import { Button, Dropdown, Modal, Table } from "flowbite-react";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Pagination } from "flowbite-react";
import FilterDropdown from "../components/FilterDropDown";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import ShimmerTable from "../components/ShimmerTable";
import ShimmerLoader from "../components/ShimmerLoader";
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
  const [pageNumber, setPageNumber] = useState(0);
  const [filterData, setfilterData] = useState({
    ageRange: [18, 65],
    gender: "all",
    citizen: "all",
  });
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [gender, setGender] = useState("all");
  const [citizen, setCitizen] = useState("all");
  const [columnSort, setColumnSort] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState<Athlete[]>([]);
  const [data, setData] = useState<Athlete[]>([]);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const fetchAthleteData = async () => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + "/athletes");
    if (filterData && filterData.ageRange[0]) {
      url.searchParams.append("minAge", filterData.ageRange[0].toString());
      url.searchParams.append("maxAge", filterData.ageRange[1].toString());
      url.searchParams.append("gender", filterData.gender);
      url.searchParams.append("citizen", filterData.citizen);

      if (columnSort && columnSort != "") {
        url.searchParams.append("sortBy", columnSort);

        url.searchParams.append("sortOrder", sortOrder);
      }
    }

    url.searchParams.append("page", pageNumber.toString());
    await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error while making the GET request");
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        if (pageNumber != 0) {
          setData((prevData) => [...prevData, ...data]);
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  useEffect(() => {
    console.log("RUNNING", pageNumber);
    fetchAthleteData();
  }, [pageNumber, columnSort, sortOrder]);

  useEffect(() => {});
  const handleRowClick = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setOpenModal("dismissible");
  };

  const updateSort = async (columnName: string) => {
    let currenSort = sortOrder;
    if (columnName === columnSort) {
      currenSort = sortOrder === "asc" ? "desc" : "asc";
    } else {
      currenSort = "asc";
      setColumnSort(columnName);
    }
    setSortOrder(currenSort);

    setPageNumber(0);
  };

  const applyFilters = (filtered: Athlete[]) => {
    setSortedData(filtered);
  };
  return (
    <div>
      <div className="p-4 flex justify-start items-center mr-8 space-x-8">
        <FilterDropdown
          fetchData={() => {
            if (pageNumber === 0) {
              fetchAthleteData();
            } else {
              setPageNumber(0);
            }
          }}
          filterData={filterData}
          setFilterData={setfilterData}
        />
      </div>
      {data.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell onClick={() => updateSort("age")} className="">
              <span className="cursor-pointer">Age</span>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer"
              onClick={() => updateSort("gender")}
            >
              Gender{" "}
            </Table.HeadCell>
            <Table.HeadCell>College</Table.HeadCell>
            <Table.HeadCell>Instagram</Table.HeadCell>
            <Table.HeadCell onClick={() => updateSort("citizen")} className="">
              <span className="cursor-pointer">Citizen</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item, index) => (
              <Table.Row
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white cursor-pointer dark:border-gray-700 dark:bg-gray-800"
                    : "bg-gray-50 cursor-pointer dark:border-gray-700 dark:bg-gray-800"
                }
                onClick={() => handleRowClick(item)}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text:white">
                  {item.firstName}
                </Table.Cell>
                <Table.Cell>{item.lastName}</Table.Cell>
                <Table.Cell>{item.age}</Table.Cell>
                <Table.Cell>
                  {item.gender.charAt(0).toUpperCase() +
                    item.gender.slice(1).toLowerCase()}
                </Table.Cell>
                <Table.Cell>{item.college}</Table.Cell>
                <Table.Cell>{item.instagram}</Table.Cell>
                <Table.Cell>{item.citizen ? "Yes" : "No"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <ShimmerLoader />
      )}
      <div className="w-full flex justify-center items-center p-2">
        <button
          className="p-2 mt-10 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-600 ease-in-out"
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Load More
        </button>
      </div>
      <Modal
        dismissible
        show={openModal === "dismissible"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Body>
          {selectedAthlete && (
            <div>
              <h2>{`${selectedAthlete.firstName} ${selectedAthlete.lastName}`}</h2>
              <p>{`Age: ${selectedAthlete.age}`}</p>
              <p>{`Gender: ${selectedAthlete.gender}`}</p>
              <p>{`College: ${selectedAthlete.college}`}</p>
              <p>{`Instagram: ${selectedAthlete.instagram}`}</p>
              <p>{`Citizen: ${selectedAthlete.citizen ? "Yes" : "No"}`}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DashboardPage;
