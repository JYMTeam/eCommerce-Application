import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { ErrorResponse } from "@commercetools/platform-sdk";
// import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import {
  categoriesFetchError,
  categoriesFetchSuccess,
  categoriesFetching,
} from "../slices/categoriesSlice";
import { clientBuilderManager } from "../../commercetools-sdk/builders/ClientbuilderManager";

export const fetchCategories = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(categoriesFetching());
      const answer = await clientBuilderManager.requestCurrentBuilder
        .categories()
        .get({
          queryArgs: {
            expand: "ancestors[*]",
          },
        })
        .execute();
      dispatch(categoriesFetchSuccess(answer.body.results));
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(categoriesFetchError(body));
      }
    }
  };
};
