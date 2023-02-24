import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LocationProps } from 'types';

export interface LocationState {
  location: LocationProps;
}

const initialState: LocationState = {
  location: { uid: '', lat: 0, lng: 0 },
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<LocationProps>) => {
      state.location = action.payload;
      return state;
    },
    removeLocation: (state) => {
      state = initialState;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLocation, removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
