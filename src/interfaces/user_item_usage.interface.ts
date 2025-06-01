interface IUserAssignments {
  taskId: string
  taskName: string
  amount: number
  unit: string
}

export interface IUserItemUsageInProject {
  id: string
  project: string
  user: string
  item: string
  unit: string
  assignments: IUserAssignments[]
}
