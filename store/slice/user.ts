import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserProps } from 'types';

export interface UsersState {
  user: UserProps;
}

const initialState: UsersState = {
  user: { uid: '', displayName: '' },
};

export const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
      return state;
    },
    removeUser: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = UsersSlice.actions;

export default UsersSlice.reducer;
