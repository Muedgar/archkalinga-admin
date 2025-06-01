import {
  BoxesIcon,
  BrickWallIcon,
  ClipboardCheckIcon,
  FolderArchiveIcon,
  FolderKanbanIcon,
  LucideIcon,
  Users,
} from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: 'App',
      menus: [
        {
          href: '/admin/projects',
          label: 'Projects',
          icon: FolderKanbanIcon,
        },
        {
          href: '/admin/tasks',
          label: 'Tasks',
          icon: ClipboardCheckIcon,
        },
        {
          href: '/admin/shell',
          label: 'Materials Schedules',
          icon: BrickWallIcon,
          submenus: [
            {
              href: '/admin/shell',
              label: 'Shell',
            },
          ],
        },
      ],
    },
    {
      groupLabel: 'Reports',
      menus: [
        {
          href: '/admin/reports/shell',
          label: 'Shell schedule',
          icon: FolderArchiveIcon,
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/admin/users',
          label: 'Users',
          icon: Users,
        },
        {
          href: '/admin/roles',
          label: 'Roles',
          icon: BoxesIcon,
        },
      ],
    },
  ]
}
