'use client'

import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
import NewShellQuantityForm from '../forms/create_shellquantity'


export default function NewRole() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar title='Create Shell Quantity' backUrl='/admin/shell' />,
          content: (
            <div className="md:w-1/3 mx-auto">
        <NewShellQuantityForm />
      </div>
          )
        }}
        </ContentLayout>
    </AdminPanelLayout>
  )
}

