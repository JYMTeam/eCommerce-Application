import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IEditModeState {
  userInformationEdit: boolean;
  userAddressCardEdits: Record<number, boolean>;
}

const initialState: IEditModeState = {
  userInformationEdit: false,
  userAddressCardEdits: {},
};

const userEditModeSlice = createSlice({
  name: "userEditMode",
  initialState,
  reducers: {
    setUserInformationEdit: (state, action: PayloadAction<boolean>) => {
      state.userInformationEdit = action.payload;
    },
    setUserAddressCardEdit: (
      state,
      action: PayloadAction<{ cardId: number; isEdit: boolean }>,
    ) => {
      const { cardId, isEdit } = action.payload;
      state.userAddressCardEdits[cardId] = isEdit;
    },
  },
});

export const { setUserInformationEdit, setUserAddressCardEdit } =
  userEditModeSlice.actions;

export default userEditModeSlice.reducer;
