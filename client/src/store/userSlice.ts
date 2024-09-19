import { MascaApi } from "@blockchain-lab-um/masca-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  mascaApi: MascaApi | null;
  currentDID: string | null;
  isVendor: boolean | undefined;
}

const initialState: UserState = {
  mascaApi: null,
  currentDID: null,
  isVendor: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMascaApi(state, action: PayloadAction<MascaApi | null>) {
      state.mascaApi = action.payload;
    },
    setCurrentDID(state, action: PayloadAction<string | null>) {
      state.currentDID = action.payload;
    },
    setIsVendor(state, action: PayloadAction<boolean | undefined>) {
      state.isVendor = action.payload;
    },
  },
});

export const { setMascaApi, setCurrentDID, setIsVendor } = userSlice.actions;

export const selectUser = (state: { masca: UserState }) => state.masca;

export default userSlice.reducer;
