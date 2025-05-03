import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    declineRequest: (state, action) => {
      const filteredRequests = state.filter(
        (req) => req._id !== action.payload
      );
      return filteredRequests;
    },
  },
});

export const { addRequest,declineRequest } = requestSlice.actions;
export default requestSlice.reducer;
