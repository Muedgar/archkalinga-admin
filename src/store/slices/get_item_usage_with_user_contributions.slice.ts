import { createSlice } from '@reduxjs/toolkit'
import { IItemUsageWithUserContributions } from '@/interfaces'
import { getItemUsageWithUserContributions } from '../thunks'

export interface ItemUsageWithUserContributionsState {
  token: string | null
  loading: boolean
  itemUsageWithUserContributions: IItemUsageWithUserContributions | null
}

const initialState: ItemUsageWithUserContributionsState = {
  token: null,
  loading: false,
  itemUsageWithUserContributions: null,
}

export const itemUsageWithUserContributions = createSlice({
  name: 'itemUsageWithUserContributions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemUsageWithUserContributions.pending, (state) => {
        state.loading = true
      })
      .addCase(getItemUsageWithUserContributions.fulfilled, (state, payload) => {
        state.loading = false
        state.itemUsageWithUserContributions = payload.payload
      })
      .addCase(getItemUsageWithUserContributions.rejected, (state) => {
        state.loading = false
      })
  },
})

export const itemUsageWithUserContributionsReducer =
  itemUsageWithUserContributions.reducer
