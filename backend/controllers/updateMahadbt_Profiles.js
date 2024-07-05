// this file is created to test the update query for mahadabt_profile table in DB 
//testing using POSTMAN

const { Sequelize, Op } = require("sequelize");
const Mahadbtprofiles = require("../models/mahadbtModel");


    exports.sendDatatoDBpostman = async (req, res) => {
        Mahadbtprofiles.update(req.body, {
          // Specify the condition for the update
          where: {
            email: req.body.id,
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
