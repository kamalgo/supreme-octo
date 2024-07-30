// import { Heading, Flex } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { Table, Input } from "antd";
// import Base from "../../components/Base";
// import { FreshStudentApi, castecertS3Fresh } from "../../api/FreshStudentAPi/FreshStudentApi";

// const { Search } = Input;

// const FreshStudents = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   const fetchData = async (query = "") => {
//     try {
//       const response = await FreshStudentApi(query);
//       setData(response.data); // Adjust according to your API response structure
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle search
//   const handleSearch = (value) => {
//     setSearchText(value);
//     fetchData(value);
//   };

//   // Columns for the Ant Design table
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "candidateName",
//       key: "candidateName",
//     },
//     {
//       title: "Gender",
//       dataIndex: "gender",
//       key: "gender",
//     },
//     // Add other columns as needed
//   ]; 

//   return (
//     <Base>
//       <Flex justifyContent="center" alignItems="center">
//         <Heading as="h1" size="xl">
//           Fresh Students
//         </Heading>
//       </Flex>

//       <div style={{ padding: "20px" }}>
//         <Search
//           placeholder="Search students"
//           onSearch={handleSearch}
//           style={{ marginBottom: "20px" }}
//           enterButton
//         />
//         <Table
//           dataSource={data}
//           columns={columns}
//           rowKey="id" // Ensure each row has a unique 'id'
//         />
//       </div>
//     </Base>
//   );
// };

// export default FreshStudents;

// //This code uploads data to s3
// import { Heading, Flex } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { Table, Input, Button, Modal, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import Base from "../../components/Base";
// import { FreshStudentApi, castecertS3Fresh } from "../../api/FreshStudentAPi/FreshStudentApi";

// const { Search } = Input;

// const FreshStudents = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const fetchData = async (query = "") => {
//     try {
//       const response = await FreshStudentApi(query);
//       setData(response.data); // Adjust according to your API response structure
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSearch = (value) => {
//     setSearchText(value);
//     fetchData(value);
//   };

//   const handleUploadDocuments = (record) => {
//     setSelectedRecord(record);
//     setIsModalVisible(true);
//   };

//   const handleModalOk = () => {
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//   };

//   const handleUpload = async ({ file, onSuccess, onError }) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('id', selectedRecord.id);

//     try {
//       const response = await castecertS3Fresh(formData);
//       if (response.success) {
//         message.success(`${file.name} file uploaded successfully.`);
//         onSuccess();
//         setIsModalVisible(false);
//         setSelectedRecord(null);
//       } else {
//         message.error("Upload failed. Please try again.");
//         onError(new Error("Upload failed"));
//       }
//     } catch (error) {
//       message.error("Upload failed. Please try again.");
//       console.error("Error uploading file:", error);
//       onError(error);
//     }
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "candidateName",
//       key: "candidateName",
//     },
//     {
//       title: "Gender",
//       dataIndex: "gender",
//       key: "gender",
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Button onClick={() => handleUploadDocuments(record)}>Upload Documents</Button>
//       ),
//     },
//   ];

//   return (
//     <Base>
//       <Flex justifyContent="center" alignItems="center">
//         <Heading as="h1" size="xl">
//           Fresh Students
//         </Heading>
//       </Flex>

//       <div style={{ padding: "20px" }}>
//         <Search
//           placeholder="Search students"
//           onSearch={handleSearch}
//           style={{ marginBottom: "20px" }}
//           enterButton
//         />
//         <Table
//           dataSource={data}
//           columns={columns}
//           rowKey="id"
//         />
//         <Modal
//           title="Upload Documents"
//           visible={isModalVisible}
//           onOk={handleModalOk}
//           onCancel={handleModalCancel}
//           footer={[
//             <Button key="cancel" onClick={handleModalCancel}>
//               Cancel
//             </Button>
//           ]}
//         >
//           {selectedRecord && (
//             <div>
//               <p><strong>ID:</strong> {selectedRecord.id}</p>
//               <p><strong>Name:</strong> {selectedRecord.candidateName}</p>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options)}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Caste Certificate</Button>
//                 </Upload>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </Base>
//   );
// };

// export default FreshStudents;


import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Base from "../../components/Base";
import { FreshStudentApi, castecertS3Fresh, fetchRecordDetails } from "../../api/FreshStudentApi/FreshStudentApi.js";

const { Search } = Input;

const FreshStudents = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordDetails, setRecordDetails] = useState(null);

  const fetchData = async (query = "") => {
    try {
      const response = await FreshStudentApi(query);
      setData(response.data); // Adjust according to your API response structure
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    fetchData(value);
  };

  const handleUploadDocuments = async (record) => {
    setSelectedRecord(record);
    try {
      const response = await fetchRecordDetails(record.id); // Fetch record details from the database
      setRecordDetails(response.data); // Adjust according to your API response structure
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching record details:", error);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setRecordDetails(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setRecordDetails(null);
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', selectedRecord.id);

    try {
      const response = await castecertS3Fresh(formData);
      if (response.success) {
        message.success(`${file.name} file uploaded successfully.`);
        onSuccess();
        setIsModalVisible(false);
        setSelectedRecord(null);
        setRecordDetails(null);
      } else {
        message.error("Upload failed. Please try again.");
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      message.error("Upload failed. Please try again.");
      console.error("Error uploading file:", error);
      onError(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "candidateName",
      key: "candidateName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleUploadDocuments(record)}>Upload Documents</Button>
      ),
    },
  ];

  return (
    <Base>
      <div style={{ padding: "20px" }}>
        <Search
          placeholder="Search students"
          onSearch={handleSearch}
          style={{ marginBottom: "20px" }}
          enterButton
        />
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
        />
        <Modal
          title="Upload Documents"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>
          ]}
        >
          {selectedRecord && recordDetails ? (
            <div>
              <p><strong>ID:</strong> {selectedRecord.id}</p>
              <p><strong>Name:</strong> {selectedRecord.candidateName}</p>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options)}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Caste Certificate</Button>
                </Upload>
                {recordDetails.casteDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.casteDoc, "_blank")}
                  >
                    View Caste Certificate
                  </Button>
                )}
              </div>
              {/* Add more sections for other document types as needed */}
            </div>
          ) : (
            <p>No details available</p>
          )}
        </Modal>
      </div>
    </Base>
  );
};

export default FreshStudents;
