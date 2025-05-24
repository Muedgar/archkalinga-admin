'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import ViewUserForm from '../forms/view'
import ChangePasswordForm from '../forms/change-password'

export default function ViewUserComponent() {
  const { user } = useSelector((state: RootState) => state.auth)
  return (
    <div className="md:w-1/2 mx-auto">
      

      <Tabs defaultValue="profile">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Change password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ViewUserForm />
      </TabsContent>
      <TabsContent value="password">
        {user?.id && <ChangePasswordForm id={user.id} />}
      </TabsContent>
    </Tabs>
    </div>
  )
}
