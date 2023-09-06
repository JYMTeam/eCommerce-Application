import { AppDispatch } from "..";
import {
  INotification,
  notificationActive,
  notificationInactive,
} from "../slices/notificationSlice";

export const showNotification = (notification: INotification) => {
  return async (dispatch: AppDispatch) => {
    dispatch(notificationActive(notification));
  };
};

export const hideNotification = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(notificationInactive());
  };
};
