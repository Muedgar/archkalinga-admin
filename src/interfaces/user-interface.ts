import { IOrganization } from './organization-interface'
import { IRole } from './role-interface'

export interface IUser {
  id: string
  firstName: string
  lastName: string
  userName: string
  email: string
  title: string
  organization: IOrganization
  status: boolean
  isDefaultPassword: boolean
  userType: string
  twoFactorAuthentication: boolean
  role: IRole
}
