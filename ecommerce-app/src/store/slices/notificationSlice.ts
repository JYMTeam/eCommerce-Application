import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface INotification {
  message: string;
  type: "success" | "error";
}

export interface INotificationState {
  isNotification: boolean;
  notificationObject: INotification;
}

const initialState: INotificationState = {
  isNotification: false,
  notificationObject: {
    message: "",
    type: "success",
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationInactive(state) {
      state.isNotification = false;
      state.notificationObject = {
        message: "",
        type: "success",
      };
    },
    notificationActive(state, action: PayloadAction<INotification>) {
      state.isNotification = true;
      state.notificationObject = action.payload;
    },
  },
});

export const { notificationInactive, notificationActive } =
  notificationSlice.actions;

export default notificationSlice.reducer;
