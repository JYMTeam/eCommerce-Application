import { ClientResponse } from "@commercetools/sdk-client-v2";
import { AppDispatch } from "..";
import { ErrorResponse } from "@commercetools/platform-sdk";
import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import {
  attributesFetchError,
  attributesFetchSuccess,
  attributesFetching,
} from "../slices/attributesSlice";
import { PRODUCT_TYPE_INDEX } from "../../constants/constants";

export const fetchAttributes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(attributesFetching());
      const answer = await getApiEntryRoot().productTypes().get().execute();
      console.log("types");
      console.log(answer);
      dispatch(
        attributesFetchSuccess(
          answer.body.results[PRODUCT_TYPE_INDEX].attributes,
        ),
      );
    } catch (e) {
      const error = e as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(attributesFetchError(body));
      }
    }
  };
};
