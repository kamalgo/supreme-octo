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
        allowNull: false,
    },
    candidateName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Name_Of_Candidate',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Candidate_Email',
    },
    whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Candidate_MobileNumber',
    },
    referenceId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Refrence_ID',
    },    

    //income section
    annualIncome: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Annual_Income',
    },
    incomeCertYesNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Income_Certificate',
    },   
    incomeCertNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'incomecertificate_Number',
    },    
    incomeIssuingAuthority: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Issauthority_income',
    },
    incomeIssueDate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'income_issued_date',
    },

    //Current Course Section  
    admissionYear: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'admission_year',
    },
    instituteState: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'institute_state',
    },
    instituteDistrict: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'institute_district',
    },
    instituteTaluka: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'institute_taluka',
    },
    qualificationLevel: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'qualification_level',
    },
    courseStream: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'course_stream',
    },
    instituteName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'institute_name',
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'coursename',
    },
    admissionType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'AdmissionType',
    },
    cetPercent: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'CET_Percentage',
    },
    admissionApplicationId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'admission_application_id',
    },
    pastYearOfStudy: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Past_Year_Of_Study',
    },
    pastYearCompletedPursuing: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Past_Year_Completed_Pursuing',
    },
    presentYearOfStudy: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Present_Year_Of_Study',
    },
    presentYearOfStudy: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Present_Year_Of_Study',
    },
    presentYearCompletedPursuing: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Present_Year_Completed_Pursuing',
    },
    admissionYearOfThatCourse: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Admission_Year_Of_That_Course',
    },
    admissionYearOfThatCourse: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Admission_Year_Of_That_Course',
    },
    previousYearPercentage: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Percentage',
    },
    resultPassedAtkt: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Result',
    },
    admissionCasteCateogary: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Admission_Category',
    },
    admissionDateCurrentCourse: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Admission_Date_Current_Course',
    },
    feesPaidCurrentCourse: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Fees_Paid_Current_Course',
    },
    isThereAnyGap: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Is_There_Any_Gap',
    },
    gapReason: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Gap_Reason',
    },

    //Hostel section
    areYouHostellerDayScholar: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Hostel_Category',
    },
    hostelType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Hostel_Type',
    },
    hostelPgName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Hostet_PG_Name',
    },
    hostelPgAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Hostet_PG_Address',
    },
    hostelPgPincode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Hostet_PG_Pincode',
    },
    hostelAdmissionDate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Admission_Date',
    },
    isMessAvailable: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Is_Mess_Available',
    },
    rentPerMonth: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Rent_Per_Month',
    },

    //Scheme wise section
    previousYearApplicationId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Previouse_Year_Application_ID',
    },
    numberOfBeneficiaryInFamily: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Number_Of_Benificary_Family',
    },
    howManyBoysChild: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'How_Many_Boys_Child',
    },
    isYourParentAlphabhudarak: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Is_Your_Parent_AlphaBhuDharak',
    },
    isRegisteredLabour: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Is_Registered_labour',
    },
    admittedUnderEws: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Admited_Under_EWS',
    },  
    
    //documents section
    incomeDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Income_Certificate_URL',
    },
    feeReceiptDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Fees_Admission_Receipt_bonafide_Doc',
    },
    hostelCertificate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Warden_Certificate_Doc',
    },
    alphabhudharakDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'AlphaBhuDharak_Doc',
    },
    declarationCertDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Declaration_Certificate',
    },
    labourDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Labour_Doc',
    },
    studentPancardDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Student_PanCard_Doc',
    },
    fatherPancardDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Father_PanCard_Doc',
    },
    fatherAadharcardDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Father_Guradian_Adhar_Card_Doc',
    },
    casteValidityDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Caste_Validity',
    },
    leavingCertDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Leaving_Cerificate_Doc',
    },
    allotmentLetterDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'admission_letter_doc',
    },
    leavingCertDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Leaving_Cerificate_Doc',
    },
    rationCardDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Ration_Card',
    },
    previousYearMarksheetDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Marksheet_Passed_Year',
    },
    gapCertDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'Gap_Doc',
    },

}, {
    tableName: 'renewal_mahadbt',
    timestamps: false
});

module.exports = RenewalMahadbt;
