import { NavigateFunction } from 'react-router-dom'

let navigationFunction: NavigateFunction | null = null

export const setNavigationFunction = (fn: NavigateFunction) => {
  navigationFunction = fn
}

export const navigate = (path: string) => {
  if (navigationFunction) {
    navigationFunction(path)
  }
}
