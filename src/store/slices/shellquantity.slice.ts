import { createSlice } from '@reduxjs/toolkit'
import {
  createShellQuantity,
  deleteShellQuantity,
  getShellQuantities,
  getShellQuantity,
  updateShellQuantity,
} from '../thunks'
import { IShellQuantity } from '@/interfaces'

export interface ShellQuantityState {
  token: string | null
  loading: boolean
  count: number
  pages: number
  page: number
  limit: number
  shellQuantities: IShellQuantity[] | null
  currentShellQuantity: IShellQuantity | null
}

const initialState: ShellQuantityState = {
  token: null,
  loading: false,
  count: 0,
  pages: 0,
  page: 1,
  limit: 10,
  shellQuantities: [],
  currentShellQuantity: null,
}

export const shellQuantitySlice = createSlice({
  name: 'shellQuantity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShellQuantities.pending, (state) => {
        state.loading = true
      })
      .addCase(getShellQuantities.fulfilled, (state, payload) => {
        state.loading = false
        state.shellQuantities = payload.payload.items
        state.count = payload.payload.count
        state.pages = payload.payload.pages
        state.page = payload.payload.page
        state.limit = payload.payload.limit
      })
      .addCase(getShellQuantities.rejected, (state) => {
        state.loading = false
      })
      // Get shell quantities cases
      .addCase(getShellQuantity.pending, (state) => {
        state.loading = true
      })
      .addCase(getShellQuantity.fulfilled, (state, action) => {
        state.loading = false
        state.currentShellQuantity = action.payload
      })
      .addCase(getShellQuantity.rejected, (state) => {
        state.loading = false
      })
       // Create shell quantities cases
      .addCase(createShellQuantity.pending, (state) => {
        state.loading = true
      })
      .addCase(createShellQuantity.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createShellQuantity.rejected, (state) => {
        state.loading = false
      })
       // Update shell quantities cases
      .addCase(updateShellQuantity.pending, (state) => {
        state.loading = true
      })
      .addCase(updateShellQuantity.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateShellQuantity.rejected, (state) => {
        state.loading = false
      })
      // Delete shell quantities cases
      .addCase(deleteShellQuantity.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteShellQuantity.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteShellQuantity.rejected, (state) => {
        state.loading = false
      })
  },
})

export const shellQuantityReducer = shellQuantitySlice.reducer
