const ROLES = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  COLLEGE: "COLLEGE",


  //   NOTE : UPDATING THE ABOVE ROLES WILL ALSO REQUIRE UPDATE IN THE BELOW DB ROLES. DB ROLES ACT AS A ENUM DATATYPE

  DB_ROLE_ENUM: ["ADMIN", "STUDENT", "COLLEGE"],
};

module.exports = ROLES;

