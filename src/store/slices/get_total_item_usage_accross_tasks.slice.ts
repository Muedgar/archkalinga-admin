import { createSlice } from '@reduxjs/toolkit'
import { ICreateGetTotalItemUsageAccrossTasks } from '@/interfaces'
import { createGetTotalItemUsageAccrossTasks } from '../thunks'

export interface CreateGetTotalItemUsageAccrossTasksState {
  token: string | null
  loading: boolean
  currentCreateGetTotalItemUsageAccrossTasks: ICreateGetTotalItemUsageAccrossTasks | null
}

const initialState: CreateGetTotalItemUsageAccrossTasksState = {
  token: null,
  loading: false,
  currentCreateGetTotalItemUsageAccrossTasks: null,
}

export const createGetTotalItemUsageAccrossTasksSlice = createSlice({
  name: 'createGetTotalItemUsageAccrossTasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGetTotalItemUsageAccrossTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(
        createGetTotalItemUsageAccrossTasks.fulfilled,
        (state, payload) => {
          state.loading = false
          state.currentCreateGetTotalItemUsageAccrossTasks = payload.payload
        }
      )
      .addCase(createGetTotalItemUsageAccrossTasks.rejected, (state) => {
        state.loading = false
      })
  },
})

export const createGetTotalItemUsageAccrossTasksReducer =
  createGetTotalItemUsageAccrossTasksSlice.reducer
