/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface JsonShellScheduleParams {
  projectId: string
}

export const jsonShellSchedule = createAsyncThunk(
  'reportsJsonShellSchedule/jsonShellSchedule',
  async (
    params: JsonShellScheduleParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(
        `/reports/shell-schedule/${params.projectId}/json`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get report.'
      )
    }
  }
)


export const excelShellSchedule = createAsyncThunk(
  'reportsExcelShellSchedule/excelShellSchedule',
  async (
    params: JsonShellScheduleParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get(
        `/reports/shell-schedule/${params.projectId}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get report.'
      )
    }
  }
)
