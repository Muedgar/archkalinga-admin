import { IPermission } from './permission-interface'

export interface IRole {
  id: string
  name: string
  status: boolean
  slug: string
  permissions: IPermission[]
}
