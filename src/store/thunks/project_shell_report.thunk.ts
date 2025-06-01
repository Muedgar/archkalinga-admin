/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface JsonShellScheduleParams {
  projectId: string
}

export const jsonShellSchedule = createAsyncThunk(
  'reportsJsonShellSchedule/jsonShellSchedule',
  async (params: JsonShellScheduleParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `/reports/shell-schedule/${params.projectId}/json`
      )
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
  async (params: JsonShellScheduleParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        `/reports/shell-schedule/${params.projectId}`,
        {
          responseType: 'blob', // ⬅️ Important!
        }
      )

      // Create a Blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]))

      // Create temporary <a> and trigger click
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ShellSchedule.xlsx') // ⬅️ Filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      return true
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to download report.'
      )
    }
  }
)
