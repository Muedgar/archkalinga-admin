'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ViewUserForm from '../../forms/view'
import ChangePasswordForm from '../../forms/change-password'
import { useParams } from 'next/navigation'

export default function ViewUserComponent() {
  const { id } = useParams()
  return (
    <div className="md:w-1/2 mx-auto">
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">User Details</TabsTrigger>
          <TabsTrigger value="password">Change password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ViewUserForm />
        </TabsContent>
        <TabsContent value="password">
          {id && <ChangePasswordForm id={`${id}`} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
