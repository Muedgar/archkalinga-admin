import { createSlice } from '@reduxjs/toolkit'
import { getPermissions } from '../thunks'
import { IPermission } from '@/interfaces'

export interface PermissionState {
  token: string | null
  loading: boolean
  count: number
  pages: number
  page: number
  limit: number
  permissions: IPermission[] | null
}

const initialState: PermissionState = {
  token: null,
  loading: false,
  count: 0,
  pages: 0,
  page: 1,
  limit: 2,
  permissions: null,
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state) => {
        state.loading = true
      })
      .addCase(getPermissions.fulfilled, (state, payload) => {
        state.loading = false
        state.permissions = payload.payload.items
        state.count = payload.payload.count
        state.pages = payload.payload.pages
        state.page = payload.payload.page
        state.limit = payload.payload.limit
      })
      .addCase(getPermissions.rejected, (state) => {
        state.loading = false
      })
  },
})

export const permissionReducer = permissionSlice.reducer
