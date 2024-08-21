import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

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