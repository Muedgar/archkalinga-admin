// app/dashboard/page.jsx
'use client'

import AdminPanelLayout from '@/components/layout/admin-panel-layout'
import ContentLayout from '@/components/layout/content-layout'
import { NavBar } from '@/components/navigation/navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { GetTotalItemUsageAccrossTasks } from './forms/get_total_item_usage_accross_tasks'
import { GetItemTaskBreakdownByTask } from './forms/get_item_task_breakdown'
import { GetUserItemUsage } from './forms/get_user_item_usage'
import { GetItemUserContributions } from './forms/get_item_user_contributions'
import { ProjectShellSchedule } from './forms/project_shell_schedule'

export default function Shell() {
  const [currentTab, setCurrentTab] = useState(
    'get_total_item_usage_accross_tasks'
  )

  return (
    <AdminPanelLayout>
      <ContentLayout>
        {{
          navbar: <NavBar title="Reports - Shell Schedule" />,
          content: (
            <div>
              <Tabs defaultValue="get_total_item_usage_accross_tasks">
                <div className="w-full overflow-hidden">
                  <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden h-auto p-1 bg-muted rounded-md">
                    <div className="flex space-x-1 min-w-max">
                      <TabsTrigger
                        onClick={() =>
                          setCurrentTab('get_total_item_usage_accross_tasks')
                        }
                        value="get_total_item_usage_accross_tasks"
                        className="whitespace-nowrap px-3 py-2 text-sm font-medium transition-all"
                      >
                        Get total item usage across tasks
                      </TabsTrigger>
                      <TabsTrigger
                        onClick={() =>
                          setCurrentTab('item_and_quantity_breakdown_by_task')
                        }
                        value="item_and_quantity_breakdown_by_task"
                        className="whitespace-nowrap px-3 py-2 text-sm font-medium transition-all"
                      >
                        Item and quantity breakdown by task
                      </TabsTrigger>
                      <TabsTrigger
                        onClick={() => setCurrentTab('user_item_usage')}
                        value="user_item_usage"
                        className="whitespace-nowrap px-3 py-2 text-sm font-medium transition-all"
                      >
                        User item usage in project
                      </TabsTrigger>
                      <TabsTrigger
                        onClick={() => setCurrentTab('item_user_contribution')}
                        value="item_user_contribution"
                        className="whitespace-nowrap px-3 py-2 text-sm font-medium transition-all"
                      >
                        Item usage with user contributions
                      </TabsTrigger>
                      <TabsTrigger
                        onClick={() => setCurrentTab('project_shell_schedule')}
                        value="project_shell_schedule"
                        className="whitespace-nowrap px-3 py-2 text-sm font-medium transition-all"
                      >
                        Specific project shell schedule
                      </TabsTrigger>
                    </div>
                  </TabsList>
                </div>
                <TabsContent value="get_total_item_usage_accross_tasks">
                  <GetTotalItemUsageAccrossTasks />
                </TabsContent>
                <TabsContent value="item_and_quantity_breakdown_by_task">
                  <GetItemTaskBreakdownByTask />
                </TabsContent>
                <TabsContent value="user_item_usage">
                  <GetUserItemUsage />
                </TabsContent>
                <TabsContent value="item_user_contribution">
                  <GetItemUserContributions />
                </TabsContent>
                <TabsContent value="project_shell_schedule">
                  <ProjectShellSchedule />
                </TabsContent>
              </Tabs>
            </div>
          ),
        }}
      </ContentLayout>
    </AdminPanelLayout>
  )
}
