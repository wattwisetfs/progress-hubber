
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  progress: number;
  members: string[];
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete overhaul of company website with modern UI/UX',
    status: 'in-progress',
    dueDate: '2023-08-15',
    progress: 65,
    members: ['Alex Johnson', 'Sarah Miller']
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Create native iOS and Android apps for our service',
    status: 'planning',
    dueDate: '2023-09-30',
    progress: 20,
    members: ['John Doe', 'Emma Wilson']
  },
  {
    id: '3',
    title: 'Marketing Campaign',
    description: 'Q3 digital marketing campaign across social platforms',
    status: 'completed',
    dueDate: '2023-07-10',
    progress: 100,
    members: ['Sarah Miller', 'Alex Johnson']
  },
  {
    id: '4',
    title: 'Database Migration',
    description: 'Migrate from legacy system to new cloud database',
    status: 'on-hold',
    dueDate: '2023-10-05',
    progress: 35,
    members: ['John Doe']
  },
  {
    id: '5',
    title: 'Client Portal',
    description: 'Self-service portal for client account management',
    status: 'planning',
    dueDate: '2023-11-20',
    progress: 15,
    members: ['Emma Wilson', 'Alex Johnson']
  },
  {
    id: '6',
    title: 'Security Audit',
    description: 'Comprehensive security review of all systems',
    status: 'in-progress',
    dueDate: '2023-08-30',
    progress: 50,
    members: ['John Doe', 'Sarah Miller']
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

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
    const newProject: Project = {
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
