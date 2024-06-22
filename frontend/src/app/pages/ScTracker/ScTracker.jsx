import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Table as AntTable } from "antd";
import {
  Box,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import Base from "../../components/Base";
import { ChevronRightIcon, DownloadIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { isAuthenticated } from "../../helpers/AuthHelpers";
import { getstudentstranch } from "../../api/ScTracker";
import { uploadPfmsExcelApi } from "../../api/PaymentsApi/PaymentsApi"; 

import * as XLSX from 'xlsx';

function ScTracker() {
  const [college, setCollegeList] = useState([]);
  const toast = useToast();
  const currentUser = isAuthenticated().user.username;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Beneficiary Name",
      dataIndex: "Candidate_name",
      key: "Candidate_name",
    },
    {
      title: "Tranches",
      dataIndex: "Tranches",
      key: "Tranches",
      sorter: (a, b) => a.Tranches - b.Tranches,
    },
    // {
    //   title: "Credited Count",
    //   dataIndex: "creditedCount",
    //   key: "creditedCount",
    //   sorter: (a, b) => a.creditedCount - b.creditedCount,
    // },
    {
      title: "Credited",
      dataIndex: "Credited",
      key: "Credited",
    },
    {
      title: "Account Number",
      dataIndex: "AccountNumber_AsPerBank",
      key: "AccountNumber_AsPerBank",
    },
    {
      title: "Transaction ID",
      dataIndex: "Credit_Transaction_ID",
      key: "Credit_Transaction_ID",
    },
    {
      title: "Credit Date",
      dataIndex: "Credit_Date",
      key: "Credit_Date",
    },
    {
      title: "Application ID",
      dataIndex: "ApplicationID",
      key: "ApplicationID",
    },
    {
      title: "whatsapp_number ",
      dataIndex: "whatsapp_number",
      key: "whatsapp_number",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Menu>
          <MenuButton as={Button} variant="ghost">
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={`/sc-student-details/${record.ApplicationID}`}>
              View
            </MenuItem>
            <MenuItem
              onClick={() => handleDelete(record.ApplicationID)}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};
   
  const getAllColleges = async () => {
    try {
      const res = await getstudentstranch();
      if (res.success) {
        setCollegeList(res.data);
      } else {
        setCollegeList([]);
        console.error("Failed to fetch college data:", res.error);
      }
    } catch (error) {
      setCollegeList([]);
      console.error("Error fetching college data:", error);
    }
  };

  useEffect(() => {
    getAllColleges();
  }, []);

  const handleDelete = (ApplicationID) => {
    // Implement your delete functionality here
    console.log("Delete item with Application ID:", ApplicationID);
    toast({
      title: "Delete action triggered",
      description: `Delete functionality to be implemented for Application ID: ${ApplicationID}`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const downloadCSVFileOfCollegeList = () => {
    downloadCSVFileOfCOllegeListFunctionApi()
      .then((res) => {
        if (res.success) {
          const csvData = res.data
            .map((obj) => Object.values(obj).join(","))
            .join("\n");

          const blob = new Blob([csvData], { type: "text/csv" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "csvforcollegelist.csv";

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        } else {
          console.error("Failed to download CSV:", res.error);
        }
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      console.log("File content:", data);

      try {
        const response = await uploadPfmsExcelApi(data);
        if (response.success) {
          getAllColleges(); // Refresh the college list
          toast({
            title: "File uploaded",
            description: "File data has been successfully uploaded.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          console.error("Failed to upload file data:", response.error);
          toast({
            title: "Error",
            description: "Failed to upload file data.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error uploading file data:", error);
        toast({
          title: "Error",
          description: "An error occurred while uploading the file data.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
    reader.readAsBinaryString(file);

    toast({
      title: "File upload",
      description: `File selected: ${file.name}`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Base>
      <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
        <Flex>
          <Box>
            <Heading as="h4" size={"md"} my={2}>
              Tranch Tracker 
            </Heading>

            <Button onClick={downloadCSVFileOfCollegeList}>
              <DownloadIcon />
            </Button>

            <Button as="label" colorScheme="blue" ml={2}>
              Upload
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                hidden
                onChange={handleFileUpload}
              />
            </Button>

            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              fontSize={15}
            >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <NavLink to="/dashboard/admin">Dashboard</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <NavLink to="/dashboard/admin/sctracker">ScTracker</NavLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>List</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Spacer />
        </Flex>
      </Box>
      <Box bg="white" my={3}>
        <AntTable
          rowKey={"id"}
          columns={columns}
          dataSource={college}
          onChange={onChange}
          bordered={true}
          loading={false}
        />
      </Box>
    </Base>
  );
}

export default ScTracker;



// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from 'react-router-dom';
// import { Table as AntTable } from "antd";
// import {
//   Box,
//   Button,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Heading,
//   Flex,
//   Spacer,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   useToast,
// } from "@chakra-ui/react";
// import Base from "../../components/Base";
// import { ChevronRightIcon, DownloadIcon } from "@chakra-ui/icons";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { isAuthenticated } from "../../helpers/AuthHelpers";
// import {
//   downloadCSVFileOfCOllegeListFunctionApi,
//   getAllCollegesApi,
// } from "../../api/College";
// import { getstudentstranch} from "../../api/ScTracker";
// import {uploadPfmsExcelApi } from "../../api/PaymentsApi/PaymentsApi"; 

// import * as XLSX from 'xlsx';

// function ScTracker() {
//   const [college, setCollegeList] = useState([]);
//   const toast = useToast();
//   const currentUser = isAuthenticated().user.username;

//   useEffect(() => {
//     console.log("College List Updated:", college);
//     college.forEach((entry) => {
//       console.log("whatsapp_number:", entry.whatsapp_number);
//     });
//   }, [college]);

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Beneficiary Name",
//       dataIndex: "Candidate_name",
//       key: "Candidate_name",
//     },
//     {
//       title: "Tranches",
//       dataIndex: "Tranches",
//       key: "SchemeName",
//     },
//     {
//       title: "Credited Count",
//       dataIndex: "creditedCount",
//       key: "creditedCount",
//       sorter: (a, b) => a.creditedCount - b.creditedCount,
//     },
//     {
//       title: "Credited",
//       dataIndex: "Credited",
//       key: "Credited",
//     },
//     {
//       title: "Account Number",
//       dataIndex: "AccountNumber_AsPerBank",
//       key: "AccountNumber_AsPerBank",
//     },
//     {
//       title: "Transaction ID",
//       dataIndex: "Credit_Transaction_ID",
//       key: "Credit_Transaction_ID",
//     },
//     {
//       title: "Credit Date",
//       dataIndex: "Credit_Date",
//       key: "Credit_Date",
//     },
//     {
//       title: "Application ID",
//       dataIndex: "ApplicationID",
//       key: "Status",
//     },
//     // {
//     //   title: "Application ID",
//     //   dataIndex: "First_ApplicationID",
//     //   key: "First_ApplicationID",
//     // },
//     {
//       title: "whatsapp_number ",
//       dataIndex: "whatsapp_number",
//       key: "whatsapp_number",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Menu>
//           <MenuButton as={Button} variant="ghost">
//             <BsThreeDotsVertical />
//           </MenuButton>
//           <MenuList>
//             <MenuItem as={Link} to={`/sc-student-details/${record.ApplicationID}`}>
//               View
//             </MenuItem>
//             <MenuItem
//               onClick={() => handleDelete(record.ApplicationID)}
//             >
//               Delete
//             </MenuItem>
//           </MenuList>
//         </Menu>
//       ),
//     },
//   ];

//   const onChange = (pagination, filters, sorter, extra) => {};
   
//   // Fetch data and set state as before
// const getAllColleges = async () => {
//   try {
//       const res = await getstudentstranch();
//       if (res.success) {
//           setCollegeList(res.data);
//       } else {
//           setCollegeList([]);
//           console.error("Failed to fetch college data:", res.error);
//       }
//   } catch (error) {
//       setCollegeList([]);
//       console.error("Error fetching college data:", error);
//   }
// };

// // Call getAllColleges in useEffect as before
// useEffect(() => {
//   getAllColleges();
// }, []);
  
//   const handleDelete = (ApplicationID) => {
//     // Implement your delete functionality here
//     console.log("Delete item with Application ID:", ApplicationID);
//     toast({
//       title: "Delete action triggered",
//       description: `Delete functionality to be implemented for Application ID: ${ApplicationID}`,
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   const downloadCSVFileOfCollegeList = () => {
//     downloadCSVFileOfCOllegeListFunctionApi()
//       .then((res) => {
//         if (res.success) {
//           const csvData = res.data
//             .map((obj) => Object.values(obj).join(","))
//             .join("\n");

//           const blob = new Blob([csvData], { type: "text/csv" });
//           const link = document.createElement("a");
//           link.href = window.URL.createObjectURL(blob);
//           link.download = "csvforcollegelist.csv";

//           document.body.appendChild(link);
//           link.click();

//           document.body.removeChild(link);
//           window.URL.revokeObjectURL(link.href);
//         } else {
//           console.error("Failed to download CSV:", res.error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error downloading CSV:", error);
//       });
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     console.log("Selected file:", file);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const binaryStr = e.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(sheet);
//       console.log("File content:", data);

//       try {
//         const response = await uploadPfmsExcelApi(data);
//         if (response.success) {
//           getAllColleges(); // Refresh the college list
//           toast({
//             title: "File uploaded",
//             description: "File data has been successfully uploaded.",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//             position: "top-right",
//           });
//         } else {
//           console.error("Failed to upload file data:", response.error);
//           toast({
//             title: "Error",
//             description: "Failed to upload file data.",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//             position: "top-right",
//           });
//         }
//       } catch (error) {
//         console.error("Error uploading file data:", error);
//         toast({
//           title: "Error",
//           description: "An error occurred while uploading the file data.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "top-right",
//         });
//       }
//     };
//     reader.readAsBinaryString(file);

//     toast({
//       title: "File upload",
//       description: `File selected: ${file.name}`,
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   useEffect(() => {
//     getAllColleges();
//   }, []);

//   return (
//     <Base>
//       <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
//         <Flex>
//           <Box>
//             <Heading as="h4" size={"md"} my={2}>
//               PFMS Tracker
//             </Heading>

//             <Button onClick={downloadCSVFileOfCollegeList}>
//               <DownloadIcon />
//             </Button>

//             <Button as="label" colorScheme="blue" ml={2}>
//               Upload
//               <input
//                 type="file"
//                 accept=".csv, .xlsx, .xls"
//                 hidden
//                 onChange={handleFileUpload}
//               />
//             </Button>

//             <Breadcrumb
//               spacing="8px"
//               separator={<ChevronRightIcon color="gray.500" />}
//               fontSize={15}
//             >
//               <BreadcrumbItem>
//                 <BreadcrumbLink>
//                   <NavLink to="/dashboard/admin">Dashboard</NavLink>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>

//               <BreadcrumbItem>
//                 <NavLink to="/dashboard/admin/sctracker">ScTracker</NavLink>
//               </BreadcrumbItem>

//               <BreadcrumbItem isCurrentPage>
//                 <BreadcrumbLink>List</BreadcrumbLink>
//               </BreadcrumbItem>
//             </Breadcrumb>
//           </Box>
//           <Spacer />
//         </Flex>
//       </Box>
//       <Box bg="white" my={3}>
//         <AntTable
//           rowKey={"id"}
//           columns={columns}
//           dataSource={college}
//           onChange={onChange}
//           bordered={true}
//           loading={false}
//         />
//       </Box>
//     </Base>
//   );
// }

// export default ScTracker;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//without action column and its function 

// import React, { useEffect, useState } from "react";
// import { Link, useHistory } from 'react-router-dom';
// import { Table as AntTable } from "antd";
// import {
//   Box,
//   Button,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Spacer,
//   Text,
// } from "@chakra-ui/react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Heading,
//   Flex,
// } from "@chakra-ui/react";
// import Base from "../../components/Base";
// import { HiCheckCircle } from "react-icons/hi";
// import { ChevronRightIcon, DownloadIcon } from "@chakra-ui/icons";
// import { NavLink } from "react-router-dom";
// import { IoMdAdd } from "react-icons/io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { isAuthenticated } from "../../helpers/AuthHelpers";
// import {
//   downloadCSVFileOfCOllegeListFunctionApi,
//   getAllCollegesApi,
// } from "../../api/College";
// import ConformDeleteCollage from "../Collage/CollageComponents/ConformDeleteCollage";
// import ConformEditCollage from "../Collage/CollageComponents/ConformEditCollage";
// import AddCollageForm from "../Collage/CollageComponents/AddCollageForm";
// import AddStreamsModal from "../Collage/CollageComponents/AddStreamsModal";
// import { getShravaniallcolumnsApi } from "../../api/ScTracker";

// function ScTracker() {
//   const [college, setCollegeList] = useState([]);
//   const currentUser = isAuthenticated().user.username;
//   const history = useHistory();

//   useEffect(() => {
//     console.log("College List Updated:", college);
//   }, [college]);

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Beneficiary Name",
//       dataIndex: "Beneficiary_Name",
//       key: "Beneficiary_Name",
//     },
//     {
//       title: "Scheme Name",
//       dataIndex: "SchemeName",
//       key: "SchemeName",
//     },
//     {
//       title: "Credited",
//       dataIndex: "SchemeName",
//       key: "SchemeName",
//     },
//     {
//       title: "Account Number",
//       dataIndex: "AccountNumber_AsPerBank",
//       key: "AccountNumber_AsPerBank",
//     },
//     {
//       title: "Transaction ID",
//       dataIndex: "Credit_Transaction_ID",
//       key: "Credit_Transaction_ID",
//     },
//     {
//       title: "Credit Date",
//       dataIndex: "Credit_Date",
//       key: "Credit_Date",
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//       key: "Status",
//     },
//     {
//       title: "Application ID",
//       dataIndex: "First_ApplicationID",
//       key: "First_ApplicationID",
//       // render: (text, record) => (
//       //   <Link 
//       //     to={`/sc-student-details/${record.First_ApplicationID}`} 
//       //     onClick={() => console.log(record.First_ApplicationID)}
//       //   >
//       //     {text}
//       //   </Link>
//       // )
//     },
//   ];

//   const onChange = (pagination, filters, sorter, extra) => {};

//   const getAllColleges = async () => {
//     const res = await getShravaniallcolumnsApi();
//     if (res.success) {
//       // Filter duplicates based on First_ApplicationID
//       const uniqueData = [];
//       const seenApplicationIDs = new Set();

//       res.data.forEach((entry) => {
//         if (!seenApplicationIDs.has(entry.First_ApplicationID)) {
//           uniqueData.push(entry);
//           seenApplicationIDs.add(entry.First_ApplicationID);
//         }
//       });

//       setCollegeList(uniqueData);
//     } else {
//       setCollegeList([]);
//     }
//   };

//   const downloadCSVFileOfCollegeListFunctionFunction = () => {
//     console.log("djflkdsjfldsf");
//     downloadCSVFileOfCOllegeListFunctionApi()
//       .then((res) => {
//         if (res.success) {
//           console.log(res.data);
//           const csvData = res.data
//             .map((obj) => {
//               return Object.values(obj).join(",");
//             })
//             .join("\n");

//           const blob = new Blob([csvData], { type: "text/csv" });

//           const link = document.createElement("a");
//           link.href = window.URL.createObjectURL(blob);
//           link.download = "csvforcollegelist.csv";

//           document.body.appendChild(link);
//           link.click();

//           document.body.removeChild(link);
//           window.URL.revokeObjectURL(link.href);
//         } else {
//           console.error("Failed to download CSV:", res.error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error downloading CSV:", error);
//       });
//   };

//   useEffect(() => {
//     getAllColleges();
//   }, []);

//   return (
//     <>
//       <Base>
//         <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
//           <Flex>
//             <Box>
//               <Heading as="h4" size={"md"} my={2}>
//                 College List
//               </Heading>

//               <Button onClick={downloadCSVFileOfCollegeListFunctionFunction}>
//                 <DownloadIcon />
//               </Button>

//               <Breadcrumb
//                 spacing="8px"
//                 separator={<ChevronRightIcon color="gray.500" />}
//                 fontSize={15}
//               >
//                 <BreadcrumbItem>
//                   <BreadcrumbLink>
//                     <NavLink to="/dashboard/admin">Dashboard</NavLink>
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>

//                 <BreadcrumbItem>
//                   <NavLink to="/dashboard/admin/colleges">Colleges</NavLink>
//                 </BreadcrumbItem>

//                 <BreadcrumbItem isCurrentPage>
//                   <BreadcrumbLink>List</BreadcrumbLink>
//                 </BreadcrumbItem>
//               </Breadcrumb>
//             </Box>
//             <Spacer />
//           </Flex>
//         </Box>
//         <Box bg="white" my={3}>
//           <AntTable
//             rowKey={"id"}
//             columns={columns}
//             dataSource={college}
//             onChange={onChange}
//             bordered={true}
//             loading={false}
//           />
//         </Box>
//       </Base>
//     </>
//   );
// }

// export default ScTracker;

