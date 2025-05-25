interface IPhase {
  id: string
  name: string
}

interface ICategory {
  id: string
  name: string
  shellPhase: IPhase
}

interface ISubCategory {
  id: string
  name: string
  shellCategory: ICategory
}

export interface IShellItem {
  id: string
  description: string
  references: string[]
  unit: string
  quantity: string
  kind: string
  shellSubCategory: ISubCategory
}
