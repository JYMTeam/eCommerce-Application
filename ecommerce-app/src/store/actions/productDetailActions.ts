//import { ClientResponse, UserAuthOptions } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { ErrorResponse, ClientResponse } from "@commercetools/platform-sdk";
import {
  productDetailFetching,
  productDetailFetchSuccess,
  productDetailFetchError,
} from "../slices/productDetailSlice";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";

export const fetchProductDetail = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productDetailFetching());
      const response = await getApiEntryRoot()
        .productProjections()
        .withId({ ID: id })
        .get()
        .execute();
      dispatch(productDetailFetchSuccess(response.body));
      console.log(productDetailFetchSuccess(response.body));
    } catch (error) {
      dispatch(productDetailFetchError(error as ErrorResponse));
      console.log(error, "error fetching product");
      const err = error as ClientResponse<ErrorResponse>;
      const body = err.body;
      if (body) {
        dispatch(productDetailFetchError(body));
      }
    }
  };
};
