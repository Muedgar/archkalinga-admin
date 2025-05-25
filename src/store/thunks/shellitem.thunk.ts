import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getShellItems = createAsyncThunk(
  'shell/getShellItems',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get('/shellshedule/items', {
        params: {
          page,
          limit,
        },
      })
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get all shell items.'
      )
    }
  }
)

export const getShellItem = createAsyncThunk(
  'shell/getShellItem',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/shellshedule/items/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get shell item.'
      )
    }
  }
)
