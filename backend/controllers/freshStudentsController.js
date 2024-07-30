const { Op } = require("sequelize");
const dummyModel = require("../models/dummyExcelModel");

exports.getallFreshStudents = async (req, res) => {
  const searchQuery = req.query.q || ""; // Get search query from request

  try {
    const freshprofiles = await dummyModel.findAll({
      where: {
        candidateName: {
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







// const dummyModel = require("../models/dummyExcelModel");

// exports.getallFreshStudents = async (req, res) => {
//   const searchQuery = req.query.q || ""; // Get search query from request

//   try {
//     const freshprofiles = await dummyModel.findAll({
//       where: {
//         candidateName: {
//           [Op.like]: `%${searchQuery}%`,
//         },
//       },
//     });
//     return res.status(200).json({
//       success: true,
//       data: freshprofiles,
//     });
//   } catch (error) {
//     console.error("Error fetching profiles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };





// const dummyModel = require ("../models/dummyExcelModel");

// exports.getallFreshStudents = async (req, res ) => {

//     try{
//         const freshprofiles = await dummyModel.findAll();
//         return res.status(200).json(
//            {
//             sucess: true,
//             data : freshprofiles
//            }
//           );

//   }catch (error) {
//     console.error("Error fetching profiles :" , error);
//     res.status(500).json({error: "internal server Error"})

//   }
// }

