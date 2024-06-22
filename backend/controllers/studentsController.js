const { Sequelize } = require("sequelize");
const Mahadbtprofiles = require("../models/candidate_infoModel");

// Function to get students
async function getAllTheStudents(req, res) {
  try {
    const data = await Mahadbtprofiles.findAll({});
    console.log("your data req", data);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve College Profile",
      error: error.message,
    });
  }
}

// Function to add a new student
async function addStudent(req, res) {
  try {
    // Log the data received from the frontend
    console.log("Received student data:", req.body);
    
    // Create a new student record in the database
    const newStudent = await Mahadbtprofiles.create(req.body);
    
    // Send a response with the newly created student data
    res.status(201).json(newStudent);
  } catch (error) {
    // Log the error
    console.error("Error adding student:", error);

    // You can choose to handle the error differently based on the specific error type
    if (error instanceof Sequelize.ValidationError) {
      // Handle validation errors
      res.status(400).json({ error: "Validation error", message: error.message });
    } else {
      // Handle other types of errors
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
}

module.exports = {
  getAllTheStudents,
  addStudent,
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
