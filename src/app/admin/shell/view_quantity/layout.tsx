import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'

export default async function ShellViewQuantityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar title='Shell Schedule Quantity' backUrl='/admin/shell' />,
          content: (
            <>
             {children}
             </>
          )
        }}
        </ContentLayout>
    </AdminPanelLayout>
  )
}
