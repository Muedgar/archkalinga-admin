import { axiosClient } from './use-axios'

let interceptorsInitialized = false

export const setupInterceptors = () => {
  if (interceptorsInitialized) return
  interceptorsInitialized = true
  axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        window.dispatchEvent(new Event('auth-logout'))
      }

      return Promise.reject(error)
    }
  )
}
