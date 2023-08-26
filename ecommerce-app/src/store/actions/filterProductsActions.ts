import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { AuthErrorResponse } from "@commercetools/platform-sdk";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import {
  filterProductsFetchError,
  filterProductsFetching,
  setIsSuccess,
} from "../slices/filterProductsSlice";

export const fetchFilterProducts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(filterProductsFetching());
      // const queryArgsCategory = {
      //   where: `key="other-women"`
      // };
      // const answer1 = await getApiEntryRoot()
      //   .categories()
      //   .get({
      //     queryArgs: queryArgsCategory
      //   })
      //   .execute();
      //   console.log(answer1);
      // const queryArgsProductsOfCategory = {
      //   where: `categories(id="${answer1.body.results[0].id}")`
      // };
      // const answer2 = await getApiEntryRoot()
      //   .productProjections()
      //   .get({
      //     queryArgs: queryArgsProductsOfCategory
      //   })
      //   .execute();
      //   console.log(answer2);

      const filterQuery = {
        "filter.query": "variants.price.centAmount:range (* to 3000)",
      };
      const answer3 = await getApiEntryRoot()
        .productProjections()
        .search()
        .get({
          queryArgs: filterQuery,
        })
        .execute();
      console.log(answer3);
      dispatch(setIsSuccess());
      // dispatch(filterProductsFetchSuccess(answer.body));
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(filterProductsFetchError(body));
      }
    }
  };
};
