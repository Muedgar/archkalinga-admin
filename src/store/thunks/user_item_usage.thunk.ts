/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface GetUserItemUsageTaskParams {
  userId: string
  itemId: string
  projectId: string
}

export const getUserItemUsage = createAsyncThunk(
  'reportsGetUserItemUsage/getUserItemUsage',
  async (params: GetUserItemUsageTaskParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        '/reports/shell-schedule/user-item-usage',
        {
          params: {
            ...params,
          },
        }
      )
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get report.'
      )
    }
  }
)
