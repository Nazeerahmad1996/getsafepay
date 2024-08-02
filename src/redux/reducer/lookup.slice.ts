import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Student } from "../../types/user";
import { InitialState } from "../../types/user";

const initialState: InitialState = {
  recent: null
};

export const lookupSlice = createSlice({
  name: 'lookup',
  initialState: initialState,
  reducers: {
    updateRecent: (state, actions: PayloadAction<Student | null>) => {
      state.recent = actions.payload
    }
  }
})

export const { updateRecent } = lookupSlice.actions

export default lookupSlice.reducer