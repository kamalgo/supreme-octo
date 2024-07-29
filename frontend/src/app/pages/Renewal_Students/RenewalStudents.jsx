import React, { useState, useEffect } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { Table, Input } from "antd";
import Base from "../../components/Base";
import { RenewalStudentApi } from "../../api/RenewalStudentsApi/RenewalStudentsApi";

const { Search } = Input;

const RenewalStudents = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RenewalStudentApi();
        setData(response.data); // Adjust according to your API response structure
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (item) => item.name.toLowerCase().includes(value.toLowerCase()) // Adjust the property to search by
    );
    setFilteredData(filtered);
  };

  // Columns for the Ant Design table
  const columns = [
    {
      title: "Name",
      dataIndex: "Mahadbt_Username",
      key: "Mahadbt_Username",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    // Add other columns as needed
  ];

  return (
    <Base>
      <Flex justifyContent="center" alignItems="center">
        <Heading as="h1" size="xl">
          Renewal Students
        </Heading>
      </Flex>

      <div style={{ padding: "20px" }}>
        <Search
          placeholder="Search students"
          onSearch={handleSearch}
          style={{ marginBottom: "20px" }}
          enterButton
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id" // Ensure each row has a unique 'id'
        />
      </div>
    </Base>
  );
};

export default RenewalStudents;
