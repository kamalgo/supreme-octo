const forstu_candidates = require("../models/forstu_candidatesModel");

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to get all tranches
exports.getAllCandidates = (req, res) => {
    forstu_candidates
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
