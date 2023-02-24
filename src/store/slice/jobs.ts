import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { JobProps } from 'types';

export interface JobState {
  jobs: JobProps[];
}

const initialState: JobState = {
  jobs: [],
};

export const JobSlice = createSlice({
  name: 'Jobs',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<JobProps>) => {
      state.jobs = {
        ...state.jobs,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addJob } = JobSlice.actions;

export default JobSlice.reducer;
