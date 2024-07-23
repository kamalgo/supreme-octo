import React, { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Base from "../../components/Base";
import { fetchstud, castecertS3 } from "../../api/Doc_Upload/Doc_UploadApi";

const { Search } = Input;

function Doc_Upload() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchstud();
        if (response.success) {
          setDataSource(response.data);
          setFilteredData(response.data); // Initialize filteredData
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredData(dataSource);
      return;
    }

    const lowercasedValue = value.toLowerCase();
    const filtered = dataSource.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lowercasedValue)
      )
    );
    setFilteredData(filtered);
  };

  const handleUploadDocuments = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedRecord(null); // Clear selected record after closing the modal
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null); // Clear selected record after closing the modal
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('video', file);  // Changed field name to 'video'
    formData.append('id', selectedRecord.id);

    try {
      const response = await castecertS3(formData);
      if (response.success) {
        message.success(`${file.name} file uploaded successfully.`);
        onSuccess();
        setIsModalVisible(false);
        setSelectedRecord(null); // Clear selected record after successful upload
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'candidateName',
      key: 'candidateName',
    },
    {
      title: 'Aadhaar',
      dataIndex: 'aadhaar',
      key: 'aadhaar',
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
      <div>
        <h2>Upload Document Section</h2>
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          enterButton
          style={{ marginBottom: 20 }}
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          loading={loading}
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
          {selectedRecord && (
            <div>
              <p><strong>ID:</strong> {selectedRecord.id}</p>
              <p><strong>Name:</strong> {selectedRecord.candidateName}</p>
              <div style={{ marginTop: 20 }}>
                <p><strong>Caste Certificate:</strong></p>
                <Upload
                  customRequest={handleUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Caste Certificate</Button>
                </Upload>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Base>
  );
}

export default Doc_Upload;


