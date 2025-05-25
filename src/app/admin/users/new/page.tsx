'use client'

import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import NewUserForm from '../forms/new-form'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'

export default function NewRole() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar title="Create User" backUrl="/admin/users" />,
          content: (
            <div className="md:w-1/3 mx-auto">
              <NewUserForm />
            </div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
