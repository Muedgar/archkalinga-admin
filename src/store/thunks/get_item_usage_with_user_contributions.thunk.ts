/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface GetItemUsageWithUserContributionsParams {
  itemId: string
  projectId: string
}

export const getItemUsageWithUserContributions = createAsyncThunk(
  'reportsGetItemUsageWithUserContributions/getItemUsageWithUserContributions',
  async (params: GetItemUsageWithUserContributionsParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        '/reports/shell-schedule/item-user-contributions',
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
