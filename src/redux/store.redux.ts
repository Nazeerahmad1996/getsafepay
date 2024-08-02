import { configureStore } from '@reduxjs/toolkit'
import lookupReducer from "./reducer/lookup.slice";

export default configureStore({
  reducer: {lookupReducer}
})