
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

// Start with empty arrays
export const users: User[] = [];
export const projects: Project[] = [];
export const documents: Document[] = [];
export const activities: Activity[] = [];

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
