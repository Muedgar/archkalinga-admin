'use client'

import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
import NewProjectForm from '../forms/new-form'

export default function NewRole() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar title="Create Task" backUrl="/admin/tasks" />,
          content: (
            <div className="md:w-1/3 mx-auto">
              <NewProjectForm />
            </div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
