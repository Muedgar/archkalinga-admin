import { createSlice } from '@reduxjs/toolkit'
import { getShellItem, getShellItems } from '../thunks'
import { IShellItem } from '@/interfaces'

export interface ShellItemState {
  token: string | null
  loading: boolean
  count: number
  pages: number
  page: number
  limit: number
  shellItems: IShellItem[] | null
  currentShellItem: IShellItem | null
}

const initialState: ShellItemState = {
  token: null,
  loading: false,
  count: 0,
  pages: 0,
  page: 1,
  limit: 10,
  shellItems: [],
  currentShellItem: null,
}

export const shellItemSlice = createSlice({
  name: 'shellItem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShellItems.pending, (state) => {
        state.loading = true
      })
      .addCase(getShellItems.fulfilled, (state, payload) => {
        state.loading = false
        state.shellItems = payload.payload
        state.count = payload.payload.count
        state.pages = payload.payload.pages
        state.page = payload.payload.page
        state.limit = payload.payload.limit
      })
      .addCase(getShellItems.rejected, (state) => {
        state.loading = false
      })
      // Get shell items cases
      .addCase(getShellItem.pending, (state) => {
        state.loading = true
      })
      .addCase(getShellItem.fulfilled, (state, action) => {
        state.loading = false
        state.currentShellItem = action.payload
      })
      .addCase(getShellItem.rejected, (state) => {
        state.loading = false
      })
  },
})

export const shellItemReducer = shellItemSlice.reducer
