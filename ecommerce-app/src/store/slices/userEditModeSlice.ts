import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IEditModeState {
  userInfoEdit: boolean;
  userAddressCardEdits: Record<number, boolean>;
}

const initialState: IEditModeState = {
  userInfoEdit: false,
  userAddressCardEdits: {},
};

const userEditModeSlice = createSlice({
  name: "userEditMode",
  initialState,
  reducers: {
    setUserInfoEdit: (state, action: PayloadAction<boolean>) => {
      state.userInfoEdit = action.payload;
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

export const { setUserInfoEdit, setUserAddressCardEdit } =
  userEditModeSlice.actions;

export default userEditModeSlice.reducer;
