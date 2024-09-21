import { MascaApi } from "@blockchain-lab-um/masca-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketType } from "../types/Ticket";

interface UserState {
  currentDID: string | null;
  isVendor: boolean | undefined;
  tickets: TicketType[];
}

const initialState: UserState = {
  currentDID: null,
  isVendor: undefined,
  tickets: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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

export const { setCurrentDID, setIsVendor, setTickets } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
