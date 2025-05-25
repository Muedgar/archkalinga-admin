import { IShellItem } from './shell-item.interface'
import { ITask } from './task.interface'
import { IUser } from './user-interface'

export interface IItemTaskQuantity {
  id: string
  amount: number
  unit: string
  item: IShellItem
  task: ITask
}

export interface IShellQuantity {
  id: string
  createdBy: IUser
  itemTaskQuantity: IItemTaskQuantity[]
}
