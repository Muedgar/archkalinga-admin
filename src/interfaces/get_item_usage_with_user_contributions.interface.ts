interface IUserContributions {
  userId: string;
  userName: string;
  contributions: {
    taskId: string;
    taskName: string;
    amount: number;
    unit: string;
  }[];
}

export interface IItemUsageWithUserContributions {
  id: string
  project: string
  item: string
  unit: string
  totalUsage: number
  userContributions: IUserContributions[]
}
