
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';
import { Project, projects as mockProjects } from '@/data/mockData';
import { toast } from 'sonner';

// Interface to handle the projects data structure internally within this component
interface ProjectState {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  progress: number;
  members: string[];
}

// Helper function to convert between the two Project types
const mapToProjectState = (project: Project): ProjectState => {
  return {
    id: project.id,
    title: project.name,
    description: project.description,
    status: project.progress < 25 ? 'planning' : project.progress < 75 ? 'in-progress' : project.progress === 100 ? 'completed' : 'on-hold',
    dueDate: project.dueDate,
    progress: project.progress,
    members: project.teamMembers.map(id => id)
  };
};

// Helper function to convert back to the mockData Project type
const mapToMockProject = (project: ProjectState): Project => {
  return {
    id: project.id,
    name: project.title,
    description: project.description,
    progress: project.progress,
    dueDate: project.dueDate,
    teamMembers: project.members,
    documentsCount: 0 // Default value
  };
};

const Projects = () => {
  // Initialize with mapped mock projects
  const initialProjectsState = mockProjects.map(mapToProjectState);
  const [projects, setProjects] = useState<ProjectState[]>(initialProjectsState);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<ProjectState[]>(projects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(term.toLowerCase()) ||
      project.description.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredProjects(filtered);
  };

  const createNewProject = () => {
    const newProject: ProjectState = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      status: 'planning',
      dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      progress: 0,
      members: []
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setFilteredProjects(searchTerm ? 
      updatedProjects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) : 
      updatedProjects
    );
    
    toast.success('New project created successfully!');
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    setFilteredProjects(searchTerm ? 
      updatedProjects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) : 
      updatedProjects
    );
    
    toast.success('Project deleted successfully!');
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
              <p className="text-muted-foreground">
                Manage all your team's projects in one place
              </p>
            </div>
            <Button onClick={createNewProject}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchTerm ? filteredProjects : projects).map((project) => (
              <ProjectCard 
                key={project.id} 
                project={mapToMockProject(project)}
                onDelete={() => deleteProject(project.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
