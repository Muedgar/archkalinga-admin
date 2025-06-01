/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface CreateGetTotalItemUsageAccrossTasksParams {
  itemId: string
  projectId: string
}

export const createGetTotalItemUsageAccrossTasks = createAsyncThunk(
  'reportsTotalItem/createGetTotalItemUsageAccrossTasks',
  async (
    params: CreateGetTotalItemUsageAccrossTasksParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(
        '/reports/shell-schedule/total-item-usage',
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
