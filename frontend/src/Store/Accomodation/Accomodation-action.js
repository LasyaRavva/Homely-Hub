import axios from "axios";
import { accomodationActions } from "./Accomodation-slice";

export const createAccomodation = (accomodationData) => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());
    const response = await axios.post(
      "/api/v1/rent/user/newAccommodation",
      accomodationData
    );

    if (!response) {
      throw new Error("Could not create accommodation");
    }

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Failed to create accommodation";
    dispatch(accomodationActions.getErrors(message));
    throw error;
  }
};

export const getAllAccomodation = () => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());
    const { data } = await axios.get("/api/v1/rent/user/myAccommodation");
    const accom = data.data;
    dispatch(accomodationActions.getAccomodation(accom));
  } catch (error) {
    dispatch(
      accomodationActions.getErrors(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load accommodations"
      )
    );
  }
};
