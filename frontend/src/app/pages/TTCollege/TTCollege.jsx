import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Text } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Table as AntTable, Space, Modal, Button as AntButton, Input, Select } from "antd"; // Import Input and Select from Ant Design
import {
  Box,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import Base from "../../components/Base";
import { ChevronRightIcon } from "@chakra-ui/icons";
import moment from 'moment';
import { getTtcollegeTranches, updatePaymentStatus } from "../../api/TTCollegeApi/TTCollegeApi";

const { Option } = Select;

const TTCollege = () => {
  const [payments, setPayments] = useState([]);
  const [showTrancheReceivedPopup, setShowTrancheReceivedPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchText, setSearchText] = useState(''); // State for search text
  const [selectedDateRange, setSelectedDateRange] = useState(''); // State for selected date range
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, [selectedDateRange]); // Trigger fetchData when selectedDateRange changes

  const fetchData = async () => {
    try {
      const response = await getTtcollegeTranches(selectedDateRange); // Pass selectedDateRange to API call
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const renderStatus = (status) => {
    if (status === "Payment Success") {
      return (
        <Box display="flex" alignItems="center" color="green.500">
          <Text>Payment Success</Text>
          <FaCheckCircle size={24} style={{ marginRight: '8px' }} />
        </Box>
      );
    } else if (status === "On Hold") {
      return <Text color="orange.500">On Hold</Text>;
    } else if (status === "Payment Declined") {
      return (
        <Box display="flex" alignItems="center" color="red.500">
          <Text>Payment Declined</Text>
          <FaTimesCircle size={24} style={{ marginRight: '8px' }} />
        </Box>
      );   
    } else {
      return <Text>{status}</Text>;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Student Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (text, record) => renderStatus(record.Status), // Use the renderStatus function here
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Application ID",
      dataIndex: "ApplicationID",
      key: "ApplicationID",
    },
    {
      title: "Tranch",
      dataIndex: "Tranch",
      key: "Tranch",
    },
    {
      title: "Credit Date",
      dataIndex: "Credit_Date",
      key: "Credit_Date",
      render: (text, record) => moment(record.Credit_Date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.Status === "Tranche Initiated" && (
            <AntButton onClick={() => handleTrancheReceived(record)}>
              Tranche Received
            </AntButton>
          )}
        </Space>
      ),
    },
  ];

  // Filtered payments based on search text
  const filteredPayments = searchText ? payments.filter(payment =>
    payment.Name && payment.Name.toLowerCase().includes(searchText.toLowerCase())
  ) : payments;

  // Date range dropdown change handler
  const handleDateRangeChange = (value) => {
    setSelectedDateRange(value);
  };

  const handleTrancheReceived = (record) => {
    setSelectedPayment(record);
    setShowTrancheReceivedPopup(true);
  };

  const handleTrancheReceivedConfirm = async (confirmed) => {
    if (confirmed) {
      try {
        const response = await updatePaymentStatus(selectedPayment.id, "Tranche Success");
        if (response.success) {
          const updatedPayments = payments.map(payment => {
            if (payment.id === selectedPayment.id) {
              return {
                ...payment,
                Status: "Tranche Success",
              };
            }
            return payment;
          });
          setPayments(updatedPayments);
          setShowTrancheReceivedPopup(false);

          toast({
            title: "Tranche Received",
            description: `Payment ID ${selectedPayment.id} marked as Tranche Success.`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          throw new Error(response.error || "Failed to update payment status");
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
        toast({
          title: "Error",
          description: "Failed to update payment status.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      setShowTrancheReceivedPopup(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      console.log("File content:", binaryStr);
      // Implement file upload logic here
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
      <Box p={5}>
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>TTCollege</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex alignItems="center" mt={4}>
          <Heading size="lg">Tranch Tracker College</Heading>
          <Spacer />
          <Button as="label" colorScheme="blue">
            Upload
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              hidden
              onChange={handleFileUpload}
            />
          </Button>
          <Select
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            style={{ width: 150, marginLeft: 10 }}
          >
            <Option value="today">Today</Option>
            <Option value="yesterday">Yesterday</Option>
            <Option value="thisWeek">This Week</Option>
            <Option value="thisMonth">This Month</Option>
          </Select>
          <Input
            placeholder="Search by student name"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200, marginLeft: 10 }}
          />
        </Flex>
        <Box mt={4}>
          <AntTable columns={columns} dataSource={filteredPayments} rowKey="id" />
        </Box>
      </Box>
      <Modal
        title={`Did you receive the payment for ${selectedPayment ? selectedPayment.Name : ''}?`}
        visible={showTrancheReceivedPopup}
        onCancel={() => setShowTrancheReceivedPopup(false)}
        footer={[
          <Button key="no" onClick={() => handleTrancheReceivedConfirm(false)} style={{ marginRight: '10px' }}>
            No
          </Button>,
          <Button key="yes" type="primary" onClick={() => handleTrancheReceivedConfirm(true)}>
            Yes
          </Button>,
        ]}
      >
        Please confirm if the payment was received.
      </Modal>
    </Base>
  );
};

export default TTCollege;








// import { FaCheckCircle, FaTimesCircle  } from 'react-icons/fa';
// import { Text } from '@chakra-ui/react';
// import React, { useState, useEffect } from "react";
// import { Link, NavLink } from 'react-router-dom';
// import { Table as AntTable, Space, DatePicker, Select } from "antd";
// import {
//   Box,
//   Button,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Heading,
//   Flex,
//   Spacer,
//   useToast,
// } from "@chakra-ui/react";
// import Base from "../../components/Base";
// import { ChevronRightIcon } from "@chakra-ui/icons";
// import moment from 'moment';
// import { getTtcollegeTranches } from "../../api/TTCollegeApi/TTCollegeApi";

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const TTCollege = () => {
//   const [payments, setPayments] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [dateFilter, setDateFilter] = useState("today"); // Default to "today"
//   const [customRangeVisible, setCustomRangeVisible] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   const fetchData = async () => {
//     try {
//       const response = await getTtcollegeTranches();
//       setPayments(response.data);
//       // Filter payments based on default date filter ("today")
//       filterPaymentsByToday(response.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//       toast({
//         title: "Error",
//         description: "Failed to fetch data.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top-right",
//       });
//     }
//   };

//   const handleDateFilter = (dates) => {
//     if (!dates || dates.length === 0) {
//       // Reset filter if no dates are selected
//       setFilteredPayments(payments);
//       return;
//     }

//     const [start, end] = dates;
//     const startDate = moment(start).startOf('day');
//     const endDate = moment(end).endOf('day');

//     console.log("Start Date:", startDate.format('YYYY-MM-DD HH:mm:ss'));
//     console.log("End Date:", endDate.format('YYYY-MM-DD HH:mm:ss'));

//     const filteredData = payments.filter(payment => {
//       const creditDate = moment(payment.Credit_Date);
//       console.log("Credit Date:", creditDate.format('YYYY-MM-DD HH:mm:ss'));
//       return creditDate.isBetween(startDate, endDate, 'days', '[]');
//     });

//     setFilteredPayments(filteredData);
//   };

//   const handleDateFilterChange = (value) => {
//     setDateFilter(value);
//     setCustomRangeVisible(value === "custom");

//     if (value === "today") {
//       filterPaymentsByToday(payments);
//     } else if (value === "yesterday") {
//       filterPaymentsByYesterday(payments);
//     } else if (value === "all") {
//       setFilteredPayments(payments); // Show all payments
//     }
//   };

//   const filterPaymentsByToday = (data) => {
//     const today = moment().startOf('day');
//     const filteredData = data.filter(payment => {
//       const creditDate = moment(payment.Credit_Date);
//       return creditDate.isSame(today, 'day');
//     });
//     setFilteredPayments(filteredData);
//   };

//   const filterPaymentsByYesterday = (data) => {
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     const filteredData = data.filter(payment => {
//       const creditDate = moment(payment.Credit_Date);
//       return creditDate.isSame(yesterday, 'day');
//     });
//     setFilteredPayments(filteredData);
//   };

//   const renderStatus = (status) => {
//     if (status === "Payment Success") {
//       return (
//         <Box display="flex" alignItems="center" color="green.500">
//           <Text>Payment Success</Text>
//           <FaCheckCircle size={24} style={{ marginRight: '8px' }} />
//         </Box>
//       );
//     } else if (status === "On Hold") {
//       return <Text color="orange.500">On Hold</Text>;

//     } else if (status === "Payment Declined") {
//       return (
//         <Box display="flex" alignItems="center" color="red.500">
//           <Text>Payment Declined</Text>
//           <FaTimesCircle size={24} style={{ marginRight: '8px' }} />
//         </Box>
//       );   

//     } else {
//       return <Text>{status}</Text>;
//     }
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Student Name",
//       dataIndex: "Name",
//       key: "Name",
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//       key: "Status",
//       render: renderStatus, // Use the renderStatus function here
//     },
//     {
//       title: "Amount",
//       dataIndex: "Amount",
//       key: "Amount",
//     },
//     {
//       title: "Application ID",
//       dataIndex: "ApplicationID",
//       key: "ApplicationID",
//     },
//     {
//       title: "Tranch",
//       dataIndex: "Tranch",
//       key: "Tranch",
//     },
//     {
//       title: "Credit Date",
//       dataIndex: "Credit_Date",
//       key: "Credit_Date",
//       render: (text, record) => moment(record.Credit_Date).format('YYYY-MM-DD HH:mm:ss'),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//           <Link to={`/payment-details/${record.id}`}>
//             View
//           </Link>
//           <a onClick={() => handleDelete(record.id)}>
//             Delete
//           </a>
//         </Space>
//       ),
//     },
//   ];

//   const handleDelete = (paymentId) => {
//     console.log("Delete item with Payment ID:", paymentId);
//     toast({
//       title: "Delete action triggered",
//       description: `Delete functionality to be implemented for Payment ID: ${paymentId}`,
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     console.log("Selected file:", file);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const binaryStr = e.target.result;
//       console.log("File content:", binaryStr);
//       // Implement file upload logic here
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

//   return (
//     <Base>
    
//       <Box p={5}>
//         <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
//           <BreadcrumbItem>
//             <BreadcrumbLink as={NavLink} to="/home">Home</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbItem isCurrentPage>
//             <BreadcrumbLink>TTCollege</BreadcrumbLink>
//           </BreadcrumbItem>
//         </Breadcrumb>
//         <Flex alignItems="center" mt={4}>
//           <Heading size="lg">Tranch Tracker College</Heading>
//           <Spacer />
//           <Button as="label" colorScheme="blue">
//             Upload
//             <input
//               type="file"
//               accept=".csv, .xlsx, .xls"
//               hidden
//               onChange={handleFileUpload}
//             />
//           </Button>
//         </Flex>
//         <Box mt={4} marginBottom={10}>
//           <Select
//             style={{ marginLeft: 10, width: 150 }}
//             value={dateFilter}
//             onChange={handleDateFilterChange}
//           >
//             <Option value="today">Today</Option>
//             <Option value="yesterday">Yesterday</Option>
//             <Option value="all">All Time</Option>
//             <Option value="custom">Custom Range</Option>
//           </Select>
//           {customRangeVisible && (
//             <RangePicker style={{ marginLeft: 10 }} onChange={handleDateFilter} />
//           )}
//         </Box>
//         <Box mt={4}>
//           <AntTable columns={columns} dataSource={filteredPayments} rowKey="id" />
//         </Box>
//       </Box>
//     </Base>
//   );
// };

// export default TTCollege;






// import { FaCheckCircle } from 'react-icons/fa';
// import { Text } from '@chakra-ui/react';
// import React, { useState, useEffect } from "react";
// import { Link, NavLink } from 'react-router-dom';
// import { Table as AntTable, Space, DatePicker, Select } from "antd";
// import {
//   Box,
//   Button,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Heading,
//   Flex,
//   Spacer,
//   useToast,
// } from "@chakra-ui/react";
// import Base from "../../components/Base";
// import { ChevronRightIcon } from "@chakra-ui/icons";
// import moment from 'moment';
// import { getTtcollegeTranches } from "../../api/TTCollegeApi/TTCollegeApi";

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const TTCollege = () => {
//   const [payments, setPayments] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [dateFilter, setDateFilter] = useState("today"); // Default to "today"
//   const [customRangeVisible, setCustomRangeVisible] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   const fetchData = async () => {
//     try {
//       const response = await getTtcollegeTranches();
//       setPayments(response.data);
//       // Filter payments based on default date filter ("today")
//       filterPaymentsByToday(response.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//       toast({
//         title: "Error",
//         description: "Failed to fetch data.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top-right",
//       });
//     }
//   };

//   const handleDateFilter = (dates) => {
//     if (!dates || dates.length === 0) {
//       // Reset filter if no dates are selected
//       setFilteredPayments(payments);
//       return;
//     }

//     const [start, end] = dates;
//     const startDate = moment(start).startOf('day');
//     const endDate = moment(end).endOf('day');

//     console.log("Start Date:", startDate.format('YYYY-MM-DD HH:mm:ss'));
//     console.log("End Date:", endDate.format('YYYY-MM-DD HH:mm:ss'));

//     const filteredData = payments.filter(payment => {
//       const creditDate = moment(payment.Credit_Date);
//       console.log("Credit Date:", creditDate.format('YYYY-MM-DD HH:mm:ss'));
//       return creditDate.isBetween(startDate, endDate, 'days', '[]');
//     });

//     setFilteredPayments(filteredData);
//   };

//   const handleDateFilterChange = (value) => {
//     setDateFilter(value);
//     setCustomRangeVisible(value === "custom");

//     if (value === "today") {
//       filterPaymentsByToday(payments);
//     } else if (value === "yesterday") {
//       filterPaymentsByYesterday(payments);
//     } else if (value === "all") {
//       setFilteredPayments(payments); // Show all payments
//     }
//   };

//   const filterPaymentsByToday = (data) => {
//     const today = moment().startOf('day');
//     const filteredData = data.filter(payment => {
//       const creditDate = moment(payment.Credit_Date);
//       return creditDate.isSame(today, 'day');
//     });
//     setFilteredPayments(filteredData);
//   };

//   const filterPaymentsByYesterday = (data) => {
//     const yesterday = moment().subtract(1, 'days').startOf('day');
//     const filteredData = data.filter(payment => {
//       const creditDate = moment(payment.Credit_Date);
//       return creditDate.isSame(yesterday, 'day');
//     });
//     setFilteredPayments(filteredData);
//   };

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
//       key: "Beneficiary_Name",
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "Amount",
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
//       render: (text, record) => moment(record.Credit_Date).format('YYYY-MM-DD HH:mm:ss'),
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//       key: "Status",
//       filters: [
//         { text: 'On Hold', value: 'On Hold' },
//         { text: 'Payment Success', value: 'Payment Success' },
//         { text: 'Payment Declined', value: 'Payment Declined' },
//       ],
//       onFilter: (value, record) => record.Status === value,
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//           <Link to={`/payment-details/${record.id}`}>
//             View
//           </Link>
//           <a onClick={() => handleDelete(record.id)}>
//             Delete
//           </a>
//         </Space>
//       ),
//     },
//   ];

//   const handleDelete = (paymentId) => {
//     console.log("Delete item with Payment ID:", paymentId);
//     toast({
//       title: "Delete action triggered",
//       description: `Delete functionality to be implemented for Payment ID: ${paymentId}`,
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     console.log("Selected file:", file);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const binaryStr = e.target.result;
//       console.log("File content:", binaryStr);
//       // Implement file upload logic here
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

//   return (
//     <Base>
    
//      <Box display="flex" alignItems="center" color="green.500">
//       <FaCheckCircle size={24} style={{ marginRight: '8px' }} />
//       <Text>Payment Success</Text>
//     </Box>

//       <Box p={5}>
//         <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
//           <BreadcrumbItem>
//             <BreadcrumbLink as={NavLink} to="/home">Home</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbItem isCurrentPage>
//             <BreadcrumbLink>TTCollege</BreadcrumbLink>
//           </BreadcrumbItem>
//         </Breadcrumb>
//         <Flex alignItems="center" mt={4}>
//           <Heading size="lg">Tranch Tracker College</Heading>
//           <Spacer />
//           <Button as="label" colorScheme="blue">
//             Upload
//             <input
//               type="file"
//               accept=".csv, .xlsx, .xls"
//               hidden
//               onChange={handleFileUpload}
//             />
//           </Button>
//         </Flex>
//         <Box mt={4} marginBottom={10}>
//           <Select
//             style={{ marginLeft: 10, width: 150 }}
//             value={dateFilter}
//             onChange={handleDateFilterChange}
//           >
//             <Option value="today">Today</Option>
//             <Option value="yesterday">Yesterday</Option>
//             <Option value="all">All Time</Option>
//             <Option value="custom">Custom Range</Option>
//           </Select>
//           {customRangeVisible && (
//             <RangePicker style={{ marginLeft: 10 }} onChange={handleDateFilter} />
//           )}
//         </Box>
//         <Box mt={4}>
//           <AntTable columns={columns} dataSource={filteredPayments} rowKey="id" />
//         </Box>
//       </Box>
//     </Base>
//   );
// };

// export default TTCollege;




