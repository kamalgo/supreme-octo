const { Sequelize } = require("sequelize");
const forstu_tranches = require("../models/forstu_tranchesModel");

// Function to get all tranches
exports.getTtcollegeTranches = async (req, res) => {
    try {
        // Fetch all data from the database
        const data = await forstu_tranches.findAll();

        // Respond with the data
        res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve data from forstu_tranches",
            error: error.message || "An error occurred",
        });
    }
};
