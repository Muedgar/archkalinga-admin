import { IProject } from './project-interface'
import { IUser } from './user-interface'

export interface ITask {
  id: string
  name: string
  project: IProject
  assignedUsers: IUser[]
}
