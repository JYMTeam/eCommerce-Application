import { AppDispatch } from "..";
import { ErrorResponse, ClientResponse } from "@commercetools/platform-sdk";
import {
  promocodeFetching,
  promocodeFetchSuccess,
  promocodeFetchError,
} from "../slices/promocodeSlice";
// import { getApiEntryRoot } from "../../commercetools-sdk/builders/ClientBuilderEntry";
import { clientBuilderManager } from "../../commercetools-sdk/builders/ClientBuilderManager";

export const fetchPromocodes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(promocodeFetching());

      const answer = await clientBuilderManager.requestCurrentBuilder
        .discountCodes()
        .get()
        .execute();

      dispatch(promocodeFetchSuccess(answer.body));
      console.log(answer.body);
    } catch (err) {
      const error = err as ClientResponse<ErrorResponse>;
      const body = error.body;
      if (body) {
        dispatch(promocodeFetchError(body));
      }
    }
  };
};
