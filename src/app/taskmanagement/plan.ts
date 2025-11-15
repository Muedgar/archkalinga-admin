enum TaskStatus {
    STARTED = 'STARTED',
    IN_PROCESS = 'IN_PROCESS'
}
interface Project {
    id: string;
    name: string;
    description: string;
    projectType: ProjectType
    owner: Organization;
    lead: User;
    // currency: Currency;
}

interface File {
    id: string;
    project: Project;
    uploadedBy: User;
    uploadedDate: Date;
    path: string;
    description: string;
}


interface Organization {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
}


interface User {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    organization: Organization;

}

interface ProjectType {
    id: string;
    name: string;
}


interface TaskBoard {
    id: string;
    name: string;
    project: Project;
    statuses: string[]
}

interface ProjectTask {
    id: string;
    board: TaskBoard;
    author: User;
    name: string;
    assignee?: User;
    description: string;
    status: TaskStatus;
    parent?: ProjectTask;
    startDate?: Date;
    dueDate?: Date;
    durationEstimate?: Duration;
}

interface Duration {
    unit: "weeks" | "days" | "hours";
    quantity: number;
}


interface TaskComments {
    id: string;
    task: ProjectTask;
    author: User;
    createdDate: Date;
    updatedDate: Date;
    comment: string;
}

interface TaskFiles {
    id: string;
    task: ProjectTask;
    File: File;
}

