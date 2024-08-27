import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;


//Mark As Login Section

export async function markLoginSuccessful(id) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/markAsSuccessful`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,  // Include access token for authorization
      },
      body: JSON.stringify({
        id: id,  // Only sending the `id`
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;  // Return the response data
  } catch (error) {
    console.error("Error marking as successful:", error);
    throw error;
  }
}

export async function markLoginUnsuccessful(id) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/markAsUnsuccessful`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,  // Include access token for authorization
      },
      body: JSON.stringify({
        id: id,  // Only sending the `id`
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;  // Return the response data
  } catch (error) {
    console.error("Error marking as successful:", error);
    throw error;
  }
}


//verification section
////////////////////////////////////////////////////
export async function updatePersonalInfo(id, personalInfo_verified) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/personalInfoVerified`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        id: id,
        personalInfo_verified: personalInfo_verified,
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating personal info:", error);
    throw error;
  }
}

export async function updateIncomeDetails(id, incomeDetails_verified) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/incomeDetailsVerified`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        id: id,
        incomeDetails_verified: incomeDetails_verified,
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating income details:", error);
    throw error;
  }
}

export async function updateCurrentCourseDetails(id, currentCourse_verified) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/currentCourseVerified`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        id: id,
        currentCourse_verified: currentCourse_verified,
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating current course details:", error);
    throw error;
  }
}

export async function updateHostelDetails(id, hostelDetails_verified) {
  const { accessToken } = isAuthenticated();

    // Log the data being sent
    console.log("Sending data:", {
      id: id,
      hostelDetails_verified: hostelDetails_verified,
    });

  try {
    const response = await fetch(`${ENDPOINT}/hostelVerified`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        id: id,
        hostelDetails_verified: hostelDetails_verified,
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating hostel details:", error);
    throw error;
  }
}


export async function updateSchemeDetails(id, scheme_verified) {
  const { accessToken } = isAuthenticated(); // Get authentication token

  // Log the data being sent for debugging
  console.log("Sending data:", {
    id: id,
    schemeWise_verified: scheme_verified,
  });

  try {
    const response = await fetch(`${ENDPOINT}/schemeVerified`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        id: id,
        schemeWise_verified: scheme_verified,
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating scheme details:", error);
    throw error;
  }
}





///////////////////////////////////////////////////

// export async function RenewalStudentApi() {
//     const { accessToken } = isAuthenticated();
  
//     const response = await fetch(`${ENDPOINT}/getallRenewalStudents`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: accessToken,
//       },
//     });
  
//     if (response.status == 401) {
//       redirectOnTokenExpire();
//     }
  
//     return response.json();
//   }



// export async function RenewalStudentApi(searchQuery = "") {
//   const { accessToken } = isAuthenticated();

//   try {
//     const response = await fetch(`${ENDPOINT}/getallRenewalStudents?q=${searchQuery}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: accessToken,
//       },
//     });

//     if (response.status == 401) {
//       redirectOnTokenExpire();
//       throw new Error("Token expired");
//     }

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Response Data:", data); // Print the response data

//     return data;
//   } catch (error) {
//     console.error("Error fetching renewal students:", error);
//     throw error;
//   }
// }


export async function RenewalStudentApi(referenceId = "") {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/getallRenewalStudents`, {
      method: "POST",  // Use POST method to send data in the body
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        referenceId: referenceId,  // Send referenceId in the request body
      }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Print the response data

    return data;
  } catch (error) {
    console.error("Error fetching renewal students:", error);
    throw error;
  }
}


export async function getAllRenewalStudentsForPageLoad(referenceId = "") {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/getallRenewalStudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ referenceId }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("All Renewal Students Data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching all renewal students:", error);
    throw error;
  }
}

// Function to search renewal students by query
export async function getRenewalStudentsBySearch(query, referenceId = "") {
  const { accessToken } = isAuthenticated();
  console.log("on the train", query, referenceId);
  try {
    const response = await fetch(`${ENDPOINT}/searchRenewalStudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ query, referenceId }),
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      throw new Error("Token expired");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Search Results:", data);

    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}


// export async function fetchRecordDetails(id) {
//     const { accessToken } = isAuthenticated();
  
//     const response = await fetch(`${ENDPOINT}/getRenewalStudentDetails/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: accessToken,
//       },
//     });
  
//     if (response.status === 401) {
//       redirectOnTokenExpire();
//       throw new Error("Token expired");
//     }
  
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
  
//     return response.json();
//   }


export async function fetchRecordDetails(id) {
  const { accessToken } = isAuthenticated();

  try {
      const response = await fetch(`${ENDPOINT}/getRenewalStudentDetails/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: accessToken,
          },
      });

      if (response.status === 401) {
          redirectOnTokenExpire();
          throw new Error("Token expired");
      }

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Record Details Response:", data); // Print the response data
      
      return data;
  } catch (error) {
      console.error("Error fetching record details:", error);
      throw error;
  }
}


  
  export async function renewalStudentProfileView(data) {
    console.log(data, "data");
    // const { accessToken } = isAuthenticated();
  
    const response = await fetch(`${ENDPOINT}/getSingleMahadbtRenewalProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: accessToken,
      },
      body: JSON.stringify(data),
    });
  
    if (response.status == 401) {
      redirectOnTokenExpire();
    }
  
    return response.json();
  }

  export async function editRenewalStudentApi(data) {
    const { accessToken } = isAuthenticated();
  
    console.log("data in editstudentapi",data);
  
    const response = await fetch(`${ENDPOINT}/updateMahadbtRenewalProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
    });
  
    if (response.status == 401) {
      redirectOnTokenExpire();
    }
  
    return response.json();
  }


  //Documents upload section 

  export async function incomeDocS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendincomeDocS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function feeReceiptS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendfeeReceiptS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function hostelCertS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendHostelCertToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function alpabudharakCertS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendalpabudharakCertS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function declarationCertS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendDeclarationCertToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function registeredLabourCertS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendRegisteredLabourCertToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }
  
  export async function studentPanCardS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendStudentPanCardToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function fatherPanCardS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
  
    try {
      const response = await fetch(`${ENDPOINT}/sendFatherPanCardToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function fatherAadharCardS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
    
    try {
      const response = await fetch(`${ENDPOINT}/sendFatherAadharCardToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function casteValidityS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
    
    try {
      const response = await fetch(`${ENDPOINT}/sendCasteValidityToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }
  
  export async function allotmentLetterS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
    
    try {
      const response = await fetch(`${ENDPOINT}/sendAllotmentLetterToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }
  
  export async function leavingCertS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
    
    try {
      const response = await fetch(`${ENDPOINT}/sendLeavingCertToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function rationCardS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
    
    try {
      const response = await fetch(`${ENDPOINT}/sendRationCardToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  
  export async function previousYearMarksheetS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
    
    try {
      const response = await fetch(`${ENDPOINT}/sendPreviousYearMarksheetToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }

  export async function gapCertS3Renewal(formData) {
    const { accessToken } = isAuthenticated();
    
    try {
      const response = await fetch(`${ENDPOINT}/sendGapCertToS3Renewal`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
        redirectOnTokenExpire();
        throw new Error("Token expired");
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }