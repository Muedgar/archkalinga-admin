/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface ItemAndQuantityBreakdownByTaskParams {
  itemId: string
  projectId: string
}

export const itemAndQuantityBreakdownByTask = createAsyncThunk(
  'reportsTotalItemBreakdown/itemAndQuantityBreakdownByTask',
  async (params: ItemAndQuantityBreakdownByTaskParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        '/reports/shell-schedule/item-task-breakdown',
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
