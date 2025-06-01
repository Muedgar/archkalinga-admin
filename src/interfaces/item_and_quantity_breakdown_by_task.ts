interface IBreakdown {
  taskId: string
  taskName: string
  amount: number
  unit: string
}

export interface IItemAndQuantityBreakdownByTask {
  id: string
  project: string
  item: string
  unit: string
  breakdown: IBreakdown[]
}
