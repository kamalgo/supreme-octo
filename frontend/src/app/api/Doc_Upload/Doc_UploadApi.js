import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function fetchstud() {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/fetchstud`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });

    if (response.status === 401) {
      redirectOnTokenExpire();
      return;
    }

    const data = await response.json();
    console.log("Fetched data in Api:", data); // Print the response data to the console
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export async function castecertS3() {
//     const { accessToken } = isAuthenticated();
  
//     const response = await fetch(`${ENDPOINT}/submitcastedocument`, {
//       method: "PUT",
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

export async function castecertS3(formData) {
  const { accessToken } = isAuthenticated();

  try {
    const response = await fetch(`${ENDPOINT}/submitcastedocument`, {
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
