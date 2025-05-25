'use client'

import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import NewRoleForm from '../forms/new-role-form'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'

export default function NewRole() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar title="Create Role" backUrl="/admin/roles" />,
          content: (
            <div className="md:w-1/3 mx-auto">
              <NewRoleForm />
            </div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}

/*

*/
