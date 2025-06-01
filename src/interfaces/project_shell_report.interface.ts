interface ShellScheduleLeaf {
  id: string
  quantity: number
  taskName?: string
  userName?: string
}

interface ShellScheduleNode {
  id: string // e.g., Project Name, Phase Name, etc.
  children: Array<ShellScheduleNode | ShellScheduleLeaf>
}

export interface IShellScheduleTree {
  id: string // Project name
  children: Array<ShellScheduleNode | ShellScheduleLeaf> // Typically only nodes
}
