import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { AuthErrorResponse } from "@commercetools/platform-sdk";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import {
  filterProductsFetchError,
  filterProductsFetching,
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

      // const filterQuery = {
      //   "filter.query": "variants.price.centAmount:range (* to 3000)",
      // };
      // const filterQuery = {
      //   filter: ['variants.attributes.color.key:"White"'],
      // };
      // const answer3 = await getApiEntryRoot()
      //   .productProjections()
      //   .search()
      //   .get({
      //     queryArgs: filterQuery,
      //   })
      //   .execute();
      // console.log(answer3);
      // dispatch(setIsSuccess());
      // dispatch(filterProductsFetchSuccess(answer.body));
      // const answer4 = await getApiEntryRoot()
      //   .categories()
      //   .get({
      //     queryArgs: {
      //       expand: ['parent']
      //     }
      //   })
      //   .execute();
      //   console.log('categories');
      //   console.log(answer4);
      // dispatch(filterProductsFetchSuccess(answer.body));
      const answer5 = await getApiEntryRoot().productTypes().get().execute();
      console.log("types");
      console.log(answer5);
    } catch (e) {
      const error = e as ClientResponse<AuthErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(filterProductsFetchError(body));
      }
    }
  };
};
