// middlewares/errorMiddleware.ts
import { Action, Middleware } from '@reduxjs/toolkit'
import { setRedirect } from '../slices/navigationSlice' // <-- we'll create this slice
import { logout } from '../slices/auth.slice'
import { setError } from '../slices/error.slice'

interface RejectedAction extends Action {
  type: string
  payload?: string
  error?: {
    message?: string
    code?: string
  }
}

const isRejectedAction = (action: unknown): action is RejectedAction => {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as RejectedAction).type === 'string'
  )
}

export const errorMiddleware: Middleware =
  (store) => (next) => (action: unknown) => {
    try {
      if (isRejectedAction(action) && action.type.endsWith('/rejected')) {
        if (action.payload === 'Unauthorized') {
          store.dispatch(logout())
          store.dispatch(
            setError({
              message: 'Your session has expired. Please log in again.',
              severity: 'warning',
            })
          )
          store.dispatch(setRedirect('/auth/login')) // <-- tell frontend to redirect
          return next(action)
        }
      }
      return next(action)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred'

      store.dispatch(
        setError({
          message: errorMessage,
          severity: 'error',
        })
      )
      return next(action)
    }
  }
