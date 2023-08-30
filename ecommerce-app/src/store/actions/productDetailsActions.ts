import { AppDispatch } from "..";
import { ErrorResponse, ClientResponse } from "@commercetools/platform-sdk";
import {
  productDetailsFetching,
  productDetailsFetchSuccess,
  productDetailsFetchError,
} from "../slices/productDetailsSlice";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";

export const fetchProductDetails = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productDetailsFetching());

      const answer = await getApiEntryRoot()
        .productProjections()
        .withId({ ID: id })
        .get()
        .execute();

      dispatch(productDetailsFetchSuccess(answer.body));
    } catch (err) {
      const error = err as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(productDetailsFetchError(body));
      }
    }
  };
};
