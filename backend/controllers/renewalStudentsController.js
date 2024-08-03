  
  const { Sequelize, Op } = require("sequelize");
  const { createObjectCsvWriter } = require("csv-writer");
  const ROLES = require("../helpers/roles");
  const speakeasy = require("speakeasy");
  const { execFile } = require('child_process');

  const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
    DeleteObjectsCommand,
  } = require("@aws-sdk/client-s3");
  // const User = require("../models/usersModel");
  const MahadbtRenwalprofiles = require("../models/mahadbtRenewalModel")

  const { validationResult } = require("express-validator");
  const { createHmac } = require("crypto");

  const dotenv = require("dotenv");
  const sequelize = require("../database/connection");
  const AWS = require("aws-sdk");
  const ExcelInfo = require("../models/testExcelModel");
  const User = require("../models/usersModel");
  const nodemailer = require("nodemailer");

  // const { Json } = require("sequelize/types/utils");
  dotenv.config();

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION, // For example, 'us-east-1'
  });

  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY, // store it in .env file to keep it safe
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_BUCKET_REGION, // this is the region that you select in AWS account
  });


  exports.updateMahadbtRenewalProfile = (req, res) => {
    const { id } = req.body;
    const updatedData = req.body; // Assuming the updated data is in the request body
  
    MahadbtRenwalprofiles.update(updatedData, {
      where: {
        id: id,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.json({
            success: true,
            message: "Mahadbt Renewal Profile was updated successfully.",
          });
        } else {
          res.json({
            success: false,
            message: `Cannot update Mahadbt Renewal Profile with id=${id}. Maybe the profile was not found or req.body is empty!`,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: `Error updating Mahadbt Renewal Profile with id=${id}`,
          error: error,
        });
      });
  };
  
  exports.getSingleMahadbtRenewalProfile = (req, res) => {
    // console.log("id:::::", req.body);
    // console.log("clicked on single profile");
    // res.json({
    //   success: true,
    // });
    // return;
  
    // console.log("uour email", req.profile.email);
    // console.log("hellvgrtvr");
    // res.send("dddddddd");
    MahadbtRenwalprofiles.findOne({
      where: {
        // ref_code: req.profile.ref_code,
        // email: req.profile.email,
        id: req.body.id,
      },
    })
      .then((data) => {
        data = JSON.stringify(data);
        data = JSON.parse(data);
        res.json({
          success: true,
          data,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve Mahadbt Profiles",
          error: error,
        });
      });
  };

exports.getallRenewalStudents = async (req, res) => {
  const searchQuery = req.query.q || ""; // Get search query from request

  try {
    const freshprofiles = await MahadbtRenwalprofiles.findAll({
      where: {
        Mahadbt_Username: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: freshprofiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRenewalStudentDetails = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await MahadbtRenwalprofiles.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendCasteDocumentToS3Renewal = async (req, res) => {
  // console.log("req blblblbl", req.body.id);
  // console.log("req profile", req);
  // Check if req.emailData exists and has the 'base32' property before accessing it
  // if (req?.emailData && req?.emailData?.base32) {
  //   // Access req.emailData.base32 safely
  //   console.log("Base32 value:", req.emailData.base32);
  // } else {
  //   console.log(
  //     "req.emailData is undefined or does not have 'base32' property."
  //   );
  // }

  // return res.send("success");
  // const dataOfMain = req.body;
  // console.log("req body id", req.body);
  // return;
  try {
    const file = req.files.file;
    const uploadParams = {
      Bucket: "mahadbtdocs",
      Key: `${req.body.id}/castedocument/${file.name}`,
      Body: file.data,
    };

    const listParams = {
      Bucket: "mahadbtdocs",
      Prefix: `${req.body.id}/castedocument/`,
    };

    // List all objects in the folder
    const listResponse = await s3.send(new ListObjectsV2Command(listParams));
    console.log("list response", listResponse);

    // Extract keys of objects in the folder
    const keys = listResponse?.Contents?.map((object) => ({ Key: object.Key }));
    console.log("keys", keys);

    if (keys?.length > 0) {
      // Create a command to delete the objects
      const deleteParams = {
        Bucket: "mahadbtdocs",
        Delete: {
          Objects: keys,
          Quiet: false, // Set to true to suppress successful delete responses
        },
      };
      // Send the delete command to S3
      const deleteResponse = await s3.send(
        new DeleteObjectsCommand(deleteParams)
      );
      console.log(
        "Objects in the folder deleted successfully:",
        deleteResponse.Deleted
      );
    }

    // return res.send("success");
    const data = s3.send(new PutObjectCommand(uploadParams));

    // Construct the URL of the uploaded object manually
    const objectUrl = `https://${uploadParams.Bucket}.s3.${AWS.config.region}.amazonaws.com/${uploadParams.Key}`;
       
    const updatedDataOfMain = {
      casteDoc: objectUrl,
    };
    console.log("updatedDataOfMain", updatedDataOfMain);
    // return res.status(200).json({
    //   success: true,
    //   message: "File uploaded to S3",
    //   data: objectUrl,
    // });
    // Update database entry
    await MahadbtRenwalprofiles.update(updatedDataOfMain, {
      where: {
        id: req.body.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `${objectUrl} file(s) uploaded to S3 and database entry updated successfully.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





