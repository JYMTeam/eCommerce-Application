//import { ClientResponse, UserAuthOptions } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { ErrorResponse, ClientResponse } from "@commercetools/platform-sdk";
import {
  productsFetching,
  productsFetchSuccess,
  productsFetchError,
} from "../slices/productsSlice";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";

export const fetchProducts = (page = 1, limit = 20) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetching());

      //todo:params page, limit
      const answer = await getApiEntryRoot()
        .productProjections()
        .get()
        .execute();

      dispatch(productsFetchSuccess(answer.body));
    } catch (err) {
      console.log(err, "FETCH PRODUCTS ERROR");
      const error = err as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(productsFetchError(body));
      }
    }
  };
};

//todo: pager
export const setProductsPage = (page: number) => {
  return { payload: { page } };
};
