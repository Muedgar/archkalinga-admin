import { createSlice } from '@reduxjs/toolkit'
import { IItemAndQuantityBreakdownByTask } from '@/interfaces'
import { itemAndQuantityBreakdownByTask } from '../thunks'

export interface ItemTaskBreakdownState {
  token: string | null
  loading: boolean
  itemTaskBreakdown: IItemAndQuantityBreakdownByTask | null
}

const initialState: ItemTaskBreakdownState = {
  token: null,
  loading: false,
  itemTaskBreakdown: null,
}

export const itemAndQuantityBreakdownByTaskSlice = createSlice({
  name: 'itemAndQuantityBreakdownByTask',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(itemAndQuantityBreakdownByTask.pending, (state) => {
        state.loading = true
      })
      .addCase(itemAndQuantityBreakdownByTask.fulfilled, (state, payload) => {
        state.loading = false
        state.itemTaskBreakdown = payload.payload
      })
      .addCase(itemAndQuantityBreakdownByTask.rejected, (state) => {
        state.loading = false
      })
  },
})

export const itemAndQuantityBreakdownByTaskReducer =
  itemAndQuantityBreakdownByTaskSlice.reducer
