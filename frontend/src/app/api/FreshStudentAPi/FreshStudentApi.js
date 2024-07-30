import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function FreshStudentApi(searchQuery = "") {
  const { accessToken } = isAuthenticated();

  const response = await fetch(`${ENDPOINT}/getallFreshStudents?q=${searchQuery}`, {
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

  return response.json();
}
