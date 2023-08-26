import { AppDispatch } from "..";
import { ErrorResponse, ClientResponse } from "@commercetools/platform-sdk";
import {
  productsFetching,
  productsFetchSuccess,
  productsFetchError,
  productsPage,
} from "../slices/productsSlice";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";

export const fetchProducts = (offset = 0) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(productsFetching());

      const queryArgs = {
        limit: DEFAULT_PRODUCTS_LIMIT,
        offset,
      };

      const answer = await getApiEntryRoot()
        .productProjections()
        .get({ queryArgs })
        .execute();

      dispatch(productsFetchSuccess(answer.body));
    } catch (err) {
      const error = err as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(productsFetchError(body));
      }
    }
  };
};

export const setProductsPage = (page: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(productsPage({ page }));
  };
};
