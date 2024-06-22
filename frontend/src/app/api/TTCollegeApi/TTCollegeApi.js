import { isAuthenticated } from "../../helpers/AuthHelpers"; //"../helpers/AuthHelpers"
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//it fetches data from backend, it fetches from routes forstuTranchesRoutes
export async function getTtcollegeTranches() {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/ttcollege/tranches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
  });

  if (response.status === 401) {
    redirectOnTokenExpire();
  }

  const responseData = await response.json();
  console.log("Shravani all columns:", responseData); // Print response in console
  return responseData;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
