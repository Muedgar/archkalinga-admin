// app/dashboard/page.jsx
'use client'

import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
import React from 'react'

export default function Dashboard() {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar />,
          content: (
            <div className="text-black w-full bg-red-400 h-[5900px]">hello</div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
