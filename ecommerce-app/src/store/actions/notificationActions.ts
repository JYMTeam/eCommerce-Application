import { AppDispatch } from "..";
import {
  INotification,
  notificationActive,
  notificationInactive,
} from "../slices/notificationSlice";

export const showNotification = (notification: INotification) => {
  return async (dispatch: AppDispatch) => {
    dispatch(notificationActive(notification));
    // dispatch(notificationInactive());
    // try {
    //   dispatch(attributesFetching());
    //   const answer = await getApiEntryRoot().productTypes().get().execute();
    //   dispatch(
    //     attributesFetchSuccess(
    //       answer.body.results[PRODUCT_TYPE_INDEX].attributes,
    //     ),
    //   );
    // } catch (e) {
    //   const error = e as ClientResponse<ErrorResponse>;
    //   const body = error.body;
    //   if (body) {
    //     dispatch(attributesFetchError(body));
    //   }
    // }
  };
};

export const hideNotification = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(notificationInactive);
  };
};
