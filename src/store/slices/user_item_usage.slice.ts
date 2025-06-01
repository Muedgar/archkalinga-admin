import { createSlice } from '@reduxjs/toolkit'
import { IUserItemUsageInProject } from '@/interfaces'
import { getUserItemUsage } from '../thunks'

export interface UserItemUsageInProjectState {
  token: string | null
  loading: boolean
  userItemUsageInProject: IUserItemUsageInProject | null
}

const initialState: UserItemUsageInProjectState = {
  token: null,
  loading: false,
  userItemUsageInProject: null,
}

export const getUserItemUsageSlice = createSlice({
  name: 'getUserItemUsage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserItemUsage.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserItemUsage.fulfilled, (state, payload) => {
        state.loading = false
        state.userItemUsageInProject = payload.payload
      })
      .addCase(getUserItemUsage.rejected, (state) => {
        state.loading = false
      })
  },
})

export const getUserItemUsageReducer = getUserItemUsageSlice.reducer
