import { ITask } from './task.interface'
import { IUser } from './user-interface'

export interface IProject {
  id: string
  name: string
  createdBy: IUser
  tasks: ITask[] | null
}
