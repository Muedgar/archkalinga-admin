import { createSlice } from '@reduxjs/toolkit'
import { IShellScheduleTree } from '@/interfaces'
import { jsonShellSchedule } from '../thunks'

export interface ShellScheduleTreeState {
  token: string | null
  loading: boolean
  projectShellSchedule: IShellScheduleTree | null
}

const initialState: ShellScheduleTreeState = {
  token: null,
  loading: false,
  projectShellSchedule: null,
}

export const getShellScheduleTreeSlice = createSlice({
  name: 'getShellScheduleTree',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(jsonShellSchedule.pending, (state) => {
        state.loading = true
      })
      .addCase(jsonShellSchedule.fulfilled, (state, payload) => {
        state.loading = false
        state.projectShellSchedule = payload.payload
      })
      .addCase(jsonShellSchedule.rejected, (state) => {
        state.loading = false
      })
  },
})

export const getShellScheduleTreeReducer = getShellScheduleTreeSlice.reducer
