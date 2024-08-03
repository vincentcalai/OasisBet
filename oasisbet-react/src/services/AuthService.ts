import SharedVarConstants from "../constants/SharedVarConstants.ts";
import { refreshJwtToken } from "./api/ApiService.ts";

const handleJwtTokenExpireError =  async (error, callback) => {
    if (error && error.response && error.response.status !== 401) {
      console.log("error status code: ", error.response.status);
      return;
    }
    console.log("Error Message: ", error.error);
    if (error.response && error.response.data && error.response.data.message === "Access Token Expired") {
      console.log("Token Expired. Retrying refresh token");

      try {
        const response = await refreshJwtToken();
        if (response.token) {
          sessionStorage.setItem(SharedVarConstants.AUTHORIZATION, `Bearer ${response.token}`);
          await callback();
        } else {
          console.log(error);
          throw error;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      console.log(error);
      throw error;
    }
  };

  export {handleJwtTokenExpireError};