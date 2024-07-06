// this file is created to test the update query for mahadabt_profile table in DB 
//update the row data through email
//testing using POSTMAN

const { Sequelize, Op } = require("sequelize");
const Mahadbtprofiles = require("../models/mahadbtModel");

//UPTE update profile through email
    exports.UPTE = async (req, res) => {
        Mahadbtprofiles.update(req.body, {
          // Specify the condition for the update
          where: {
            email: req.body.email,
          },
        })
          .then((result) => {
            console.log("result", result);
            console.log("email", req.body.id);
            
            // The result is an array where the first element is the number of updated rows
            return res.status(200).json({
              success: true,
              message: `${result[0]} row(s) updated`,
            });
          })
          .catch((error) => {
            console.error("Error updating records:", error);
            res.status(500).json({ error: "Internal Server Error" });
          });
      };      


//UPTA update profile through aadhar

      exports.UPTA = async (req, res) => {
        Mahadbtprofiles.update(req.body, {
          // Specify the condition for the update
          where: {
            aadhaar: req.body.aadhaar,
          },
        })
          .then((result) => {
            console.log("result", result);
            console.log("aadhaar", req.body.aadhaar);
            
            // The result is an array where the first element is the number of updated rows
            return res.status(200).json({
              success: true,
              message: `${result[0]} row(s) updated`,
            });
          })
          .catch((error) => {
            console.error("Error updating records:", error);
            res.status(500).json({ error: "Internal Server Error" });
          });
      };      
