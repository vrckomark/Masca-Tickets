import { MascaApi } from "@blockchain-lab-um/masca-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketType } from "../types/Ticket";

interface UserState {
  mascaApi: MascaApi | null;
  currentDID: string | null;
  isVendor: boolean | undefined;
  tickets: TicketType[];
}

const initialState: UserState = {
  mascaApi: null,
  currentDID: null,
  isVendor: undefined,
  tickets: [],
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
    setTickets(state, action: PayloadAction<TicketType[]>) {
      state.tickets = action.payload;
    },
  },
});

export const { setMascaApi, setCurrentDID, setIsVendor, setTickets } =
  userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
