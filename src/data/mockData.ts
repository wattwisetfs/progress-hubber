
export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'doc' | 'sheet' | 'image' | 'pdf';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  dueDate: string;
  teamMembers: string[];
  documentsCount: number;
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  resourceType: 'document' | 'project' | 'comment';
  resourceId: string;
  timestamp: string;
}

export const users: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    role: "Product Manager"
  },
  {
    id: "user2",
    name: "Sam Taylor",
    avatar: "/placeholder.svg",
    role: "UI Designer"
  },
  {
    id: "user3",
    name: "Jordan Lee",
    avatar: "/placeholder.svg",
    role: "Developer"
  },
  {
    id: "user4",
    name: "Casey Morgan",
    avatar: "/placeholder.svg",
    role: "Content Writer"
  }
];

export const projects: Project[] = [
  {
    id: "project1",
    name: "Website Redesign",
    description: "Revamp of the company website with modern UI/UX principles",
    progress: 65,
    dueDate: "2023-12-15",
    teamMembers: ["user1", "user2", "user3"],
    documentsCount: 8
  },
  {
    id: "project2",
    name: "Mobile App Development",
    description: "Creating a new mobile app for customer engagement",
    progress: 30,
    dueDate: "2024-02-28",
    teamMembers: ["user1", "user3", "user4"],
    documentsCount: 12
  },
  {
    id: "project3",
    name: "Content Strategy",
    description: "Developing content guidelines and marketing materials",
    progress: 80,
    dueDate: "2023-11-30",
    teamMembers: ["user2", "user4"],
    documentsCount: 5
  },
  {
    id: "project4",
    name: "Product Launch",
    description: "Planning and execution of Q1 product launch",
    progress: 10,
    dueDate: "2024-03-15",
    teamMembers: ["user1", "user2", "user3", "user4"],
    documentsCount: 3
  }
];

export const documents: Document[] = [
  {
    id: "doc1",
    title: "Website Mockups",
    type: "image",
    createdAt: "2023-10-12T09:00:00Z",
    updatedAt: "2023-10-15T14:30:00Z",
    createdBy: "user2",
    projectId: "project1"
  },
  {
    id: "doc2",
    title: "Project Requirements",
    type: "doc",
    createdAt: "2023-10-05T11:20:00Z",
    updatedAt: "2023-10-18T16:45:00Z",
    createdBy: "user1",
    projectId: "project1"
  },
  {
    id: "doc3",
    title: "Development Timeline",
    type: "sheet",
    createdAt: "2023-10-08T10:15:00Z",
    updatedAt: "2023-10-17T13:10:00Z",
    createdBy: "user3",
    projectId: "project1"
  },
  {
    id: "doc4",
    title: "Mobile App Wireframes",
    type: "pdf",
    createdAt: "2023-10-20T15:30:00Z",
    updatedAt: "2023-10-21T09:45:00Z",
    createdBy: "user2",
    projectId: "project2"
  },
  {
    id: "doc5",
    title: "Content Calendar",
    type: "sheet",
    createdAt: "2023-10-11T08:20:00Z",
    updatedAt: "2023-10-19T11:05:00Z",
    createdBy: "user4",
    projectId: "project3"
  },
  {
    id: "doc6",
    title: "Launch Strategy",
    type: "doc",
    createdAt: "2023-10-22T16:40:00Z",
    updatedAt: "2023-10-22T16:40:00Z",
    createdBy: "user1",
    projectId: "project4"
  }
];

export const activities: Activity[] = [
  {
    id: "activity1",
    userId: "user2",
    action: "created",
    resourceType: "document",
    resourceId: "doc1",
    timestamp: "2023-10-12T09:00:00Z"
  },
  {
    id: "activity2",
    userId: "user1",
    action: "updated",
    resourceType: "document",
    resourceId: "doc2",
    timestamp: "2023-10-18T16:45:00Z"
  },
  {
    id: "activity3",
    userId: "user3",
    action: "commented on",
    resourceType: "document",
    resourceId: "doc3",
    timestamp: "2023-10-17T14:30:00Z"
  },
  {
    id: "activity4",
    userId: "user1",
    action: "created",
    resourceType: "project",
    resourceId: "project4",
    timestamp: "2023-10-21T11:20:00Z"
  },
  {
    id: "activity5",
    userId: "user4",
    action: "updated",
    resourceType: "document",
    resourceId: "doc5",
    timestamp: "2023-10-19T11:05:00Z"
  },
  {
    id: "activity6",
    userId: "user2",
    action: "created",
    resourceType: "document",
    resourceId: "doc4",
    timestamp: "2023-10-20T15:30:00Z"
  }
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Helper function to get document by ID
export const getDocumentById = (id: string): Document | undefined => {
  return documents.find(doc => doc.id === id);
};

// Helper function to get recent activities
export const getRecentActivities = (limit: number = 10): Activity[] => {
  return [...activities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

// Helper function to get documents for a project
export const getDocumentsByProjectId = (projectId: string): Document[] => {
  return documents.filter(doc => doc.projectId === projectId);
};
