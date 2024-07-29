import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function RenewalStudentApi() {
    const { accessToken } = isAuthenticated();
  
    const response = await fetch(`${ENDPOINT}/getallRenewal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });
  
    if (response.status == 401) {
      redirectOnTokenExpire();
    }
  
    return response.json();
  }