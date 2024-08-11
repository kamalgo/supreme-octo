const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection"); // Adjust the path to your sequelize instance
const { DataTypes } = require('sequelize');

const RenewalMahadbt = sequelize.define('RenewalMahadbt', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Mahadbt_Username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    candidateName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Name_Of_Candidate',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Candidate_Email',
    },
    whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Candidate_MobileNumber',
    },
    alternateMobileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Alternate_Mobile_Number',
    },
    referenceId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Refrence_ID',
    },    

    //income section
    annualIncome: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Annual_Income',
    },
    incomeCertYesNo: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Income_Certificate',
    },   
    incomeCertNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'incomecertificate_Number',
    },    
    incomeIssuingAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Issauthority_income',
    },
    incomeIssueDate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'income_issued_date',
    },

    //Current Course Section  
    admissionYear: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_year',
    },
    instituteState: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_state',
    },
    instituteDistrict: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_district',
    },
    instituteTaluka: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_taluka',
    },
    qualificationLevel: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'qualification_level',
    },
    courseStream: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'course_stream',
    },
    instituteName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'institute_name',
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'coursename',
    },
    admissionType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'AdmissionType',
    },
    cetPercent: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'CET_Percentage',
    },
    admissionApplicationId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_application_id',
    },
    pastYearOfStudy: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Past_Year_Of_Study',
    },
    pastYearCompletedPursuing: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Past_Year_Completed_Pursuing',
    },
    presentYearOfStudy: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Present_Year_Of_Study',
    },
    presentYearCompletedPursuing: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Present_Year_Completed_Pursuing',
    },
    admissionYearOfThatCourse: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Year_Of_That_Course',
    },
    previousYearPercentage: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Percentage',
    },
    resultPassedAtkt: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Result',
    },
    admissionCasteCateogary: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Category',
    },
    admissionDateCurrentCourse: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Date_Current_Course',
    },
    feesPaidCurrentCourse: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Fees_Paid_Current_Course',
    },
    isThereAnyGap: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_There_Any_Gap',
    },
    gapReason: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Gap_Reason',
    },

    //Hostel section
    areYouHostellerDayScholar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostel_Category',
    },
    hostelType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostel_Type',
    },
    hostelPgName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostet_PG_Name',
    },
    hostelPgAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostet_PG_Address',
    },
    hostelPgPincode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Hostet_PG_Pincode',
    },
    hostelAdmissionDate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admission_Date',
    },
    isMessAvailable: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_Mess_Available',
    },
    rentPerMonth: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Rent_Per_Month',
    },

    //Scheme wise section
    previousYearApplicationId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Previouse_Year_Application_ID',
    },
    numberOfBeneficiaryInFamily: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Number_Of_Benificary_Family',
    },
    howManyBoysChild: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'How_Many_Boys_Child',
    },
    isYourParentAlphabhudarak: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_Your_Parent_AlphaBhuDharak',
    },
    isRegisteredLabour: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Is_Registered_labour',
    },
    admittedUnderEws: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Admited_Under_EWS',
    },  
    
    //documents section
    incomeDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Income_Certificate_URL',
    },
    feeReceiptDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Fees_Admission_Receipt_bonafide_Doc',
    },
    hostelCertificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Warden_Certificate_Doc',
    },
    alphabhudharakDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'AlphaBhuDharak_Doc',
    },
    declarationCertDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Declaration_Certificate',
    },
    labourDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Labour_Doc',
    },
    studentPancardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Student_PanCard_Doc',
    },
    fatherPancardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Father_PanCard_Doc',
    },
    fatherAadharcardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Father_Guradian_Adhar_Card_Doc',
    },
    casteValidityDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Caste_Validity',
    },
    leavingCertDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Leaving_Cerificate_Doc',
    },
    allotmentLetterDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'admission_letter_doc',
    },
    leavingCertDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Leaving_Cerificate_Doc',
    },
    rationCardDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Ration_Card',
    },
    previousYearMarksheetDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Marksheet_Passed_Year',
    },
    gapCertDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'Gap_Doc',
    },

}, {
    tableName: 'renewal_mahadbt',
    timestamps: false
});

module.exports = RenewalMahadbt;
