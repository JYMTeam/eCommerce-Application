import { AppDispatch } from "..";
import { ErrorResponse, ClientResponse } from "@commercetools/platform-sdk";
import {
  productDetailsFetching,
  productDetailsFetchSuccess,
  productDetailsFetchError,
} from "../slices/productDetailsSlice";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";

export const fetchproductDetails = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productDetailsFetching());

      const response = await getApiEntryRoot()
        .productProjections()
        .withId({ ID: id })
        .get()
        .execute();

      dispatch(productDetailsFetchSuccess(response.body));
      console.log(productDetailsFetchSuccess(response.body));
    } catch (err) {
      const error = err as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(productDetailsFetchError(body));
      }
    }
  };
};
