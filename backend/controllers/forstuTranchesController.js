const { Sequelize, Op } = require("sequelize");
const forstu_tranches = require("../models/forstu_tranchesModel");

// Function to get all tranches with tranches count
exports.getForstuTranches = async (req, res) => {
    try {
        // Fetch all data from the database
        const data = await forstu_tranches.findAll({});

        // Calculate the tranches count
        const tranchesCounts = await forstu_tranches.findAll({
            attributes: [
                'ApplicationID',
                [Sequelize.fn('COUNT', Sequelize.col('ApplicationID')), 'tranchesCount']
            ],
            group: ['ApplicationID']
        });

        // Create a mapping of ApplicationID to tranchesCount
        const tranchesCountMap = {};
        tranchesCounts.forEach((entry) => {
            tranchesCountMap[entry.ApplicationID] = entry.dataValues.tranchesCount;
        });

        // Append counts to the data
        const uniqueData = [];
        const seenApplicationIDs = new Set();

        data.forEach(entry => {
            if (!seenApplicationIDs.has(entry.ApplicationID)) {
                entry.dataValues.Tranches = tranchesCountMap[entry.ApplicationID] || 0;
                uniqueData.push(entry);
                seenApplicationIDs.add(entry.ApplicationID);
            }
        });

        // Respond with the enhanced data
        res.json({
            success: true,
            data: uniqueData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve data from forstu_tranches",
            error: error.message || "An error occurred",
        });
    }
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get all tranches
exports.getAllForstuTranches = (req, res) => {
    forstu_tranches
    .findAll({})
    .then((data) => {
        console.log('Data retrieved:', data);
        res.json({
            success: true,
            data,
        });
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve data from forstu_tranches",
            error: error.message || "An error occurred",
        });
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get students by ApplicationID
exports.getStudentByApplicationId = (req, res) => {
    const applicationId = req.params.ApplicationID;
    console.log("Searching for ApplicationID:", applicationId);
    forstu_tranches
      .findAll({
        where: {
          ApplicationID: applicationId,
        },
      })
      .then((students) => {
        if (students.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No students found with the given ApplicationID",
          });
        }
  
        res.json({
          success: true,
          data: students,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve students by ApplicationID",
          error: error.message || "An error occurred",
        });
      });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addTranchData = (req, res) => {
  const { 
    Candidate_name, 
    gender, 
    dob, 
    whatsapp_number, 
    Credit_Date, 
    ApplicationID, 
    credited, 
    amount, 
    tranch 
  } = req.body;

  const errors = [];

  // Validate each field and collect error messages
  if (!Candidate_name) errors.push("Candidate_name is required");
  if (!gender) errors.push("Gender is required");
  if (!dob) errors.push("DOB is required");
  if (!whatsapp_number) errors.push("Whatsapp number is required");
  if (!Credit_Date) errors.push("Credit date is required");
  if (!ApplicationID) errors.push("Application ID is required");
  if (credited === undefined) errors.push("Credited field is required");
  if (amount === undefined) errors.push("Amount is required");
  if (!tranch) errors.push("Tranch is required");

  // If there are any validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors
    });
  }

  // Create a new tranch record
  forstu_tranches
    .create({
      Candidate_name,
      gender,
      dob,
      whatsapp_number,
      Credit_Date,
      ApplicationID,
      credited,
      amount,
      tranch,
    })
    .then((newTranche) => {
      res.status(201).json({
        success: true,
        message: "Tranch data added successfully",
        data: newTranche,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to add tranch data",
        error: error.message || "An error occurred",
      });
    });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////