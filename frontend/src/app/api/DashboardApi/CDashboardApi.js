//This API is used for college dashboard

import { isAuthenticated } from "../../helpers/AuthHelpers";
import { redirectOnTokenExpire } from "../Auth";

const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function getCandidatesCountApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getCandidatesCount`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


// import { isAuthenticated } from "../../helpers/AuthHelpers";
// import { redirectOnTokenExpire } from "../Auth";

// const ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

// export async function getCandidatesCountApi() {
//     const { accessToken } = isAuthenticated();
  
//     const response = await fetch(`${ENDPOINT}/getCandidatesCount`, {
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
  
// }
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//getForstuTranchesCount

export async function getForstuTranchesCountApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getForstuTranchesCount`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response aa:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

//this API fetches Sum of amount_receivable column 

export async function getTotalAmountReceivableApi() {
    const { accessToken } = isAuthenticated();

    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }

    try {
        const response = await fetch(`${ENDPOINT}/getTotalAmountReceivable`, {
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

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        console.log('Response aa:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}