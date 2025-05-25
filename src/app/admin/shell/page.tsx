// app/dashboard/page.jsx
'use client'

import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShellTemplate from './forms/shelltemplate'
import ShellQuantities from './forms/shellquantities'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default function Shell() {
  const [currentTab, setCurrentTab] = useState('shell_template')

  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar:
            currentTab === 'shell_template' ? (
              <NavBar title="Shell Schedule" />
            ) : (
              <>
                <NavBar title="Shell Schedule">
                  <Link prefetch={true} href={'/admin/shell/new'}>
                    <Button>
                      <PlusIcon />
                      Create Shell Quantity
                    </Button>
                  </Link>
                </NavBar>
              </>
            ),
          content: (
            <div>
              <Tabs defaultValue="shell_template">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    onClick={() => setCurrentTab('shell_template')}
                    value="shell_template"
                  >
                    Shell Schedule Template
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setCurrentTab('shell_quantities')}
                    value="shell_quantities"
                  >
                    Shell Schedule & Quantities
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="shell_template">
                  <ShellTemplate />
                </TabsContent>
                <TabsContent value="shell_quantities">
                  <ShellQuantities />
                </TabsContent>
              </Tabs>
            </div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
