import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'

export default async function UserUpdateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar title="Update User" backUrl="/admin/users" />,
          content: <>{children}</>,
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
