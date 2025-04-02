import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, Filter, FileText } from 'lucide-react';
import { DocumentItem } from '@/components/DocumentItem';
import { documents as mockDocuments } from '@/data/mockData';

interface LocalDocument {
  id: string;
  title: string;
  type: string;
  category: string;
  owner: string;
  lastModified: string;
  size: string;
  tags: string[];
}

interface AppDocument {
  id: string;
  title: string;
  type: 'doc' | 'sheet' | 'image' | 'pdf';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  projectId: string;
}

const initialDocuments: LocalDocument[] = [
  {
    id: '1',
    title: 'Project Requirements.docx',
    type: 'docx',
    category: 'Planning',
    owner: 'Alex Johnson',
    lastModified: '2023-07-28',
    size: '256 KB',
    tags: ['Requirements', 'Planning']
  },
  {
    id: '2',
    title: 'Marketing Strategy.pdf',
    type: 'pdf',
    category: 'Marketing',
    owner: 'Sarah Miller',
    lastModified: '2023-07-25',
    size: '1.2 MB',
    tags: ['Marketing', 'Strategy']
  },
  {
    id: '3',
    title: 'Budget Plan.xlsx',
    type: 'xlsx',
    category: 'Finance',
    owner: 'John Doe',
    lastModified: '2023-07-20',
    size: '890 KB',
    tags: ['Finance', 'Budget']
  },
  {
    id: '4',
    title: 'Wireframes.fig',
    type: 'fig',
    category: 'Design',
    owner: 'Emma Wilson',
    lastModified: '2023-07-18',
    size: '3.5 MB',
    tags: ['Design', 'UI/UX']
  },
  {
    id: '5',
    title: 'Meeting Notes.docx',
    type: 'docx',
    category: 'Meetings',
    owner: 'Alex Johnson',
    lastModified: '2023-07-15',
    size: '124 KB',
    tags: ['Meetings', 'Notes']
  },
  {
    id: '6',
    title: 'API Documentation.md',
    type: 'md',
    category: 'Development',
    owner: 'John Doe',
    lastModified: '2023-07-10',
    size: '450 KB',
    tags: ['Development', 'Documentation']
  },
  {
    id: '7',
    title: 'Q2 Report.pdf',
    type: 'pdf',
    category: 'Reports',
    owner: 'Sarah Miller',
    lastModified: '2023-07-05',
    size: '2.1 MB',
    tags: ['Reports', 'Quarterly']
  }
];

const Documents = () => {
  const [documents, setDocuments] = useState<LocalDocument[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  
  const categories = ['All', 'Planning', 'Marketing', 'Finance', 'Design', 'Meetings', 'Development', 'Reports'];
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = currentCategory === 'All' || doc.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });

  const mapToAppDocument = (doc: LocalDocument): AppDocument => {
    let docType: 'doc' | 'sheet' | 'image' | 'pdf' = 'doc';
    
    if (doc.type.includes('doc')) {
      docType = 'doc';
    } else if (doc.type.includes('xls')) {
      docType = 'sheet';
    } else if (['jpg', 'png', 'gif', 'svg', 'fig'].some(ext => doc.type.includes(ext))) {
      docType = 'image';
    } else if (doc.type.includes('pdf')) {
      docType = 'pdf';
    }

    return {
      id: doc.id,
      title: doc.title,
      type: docType,
      createdAt: new Date().toISOString(),
      updatedAt: doc.lastModified || new Date().toISOString(),
      createdBy: 'user1',
      projectId: 'project1'
    };
  };

  const uploadDocument = () => {
    const newDocument: LocalDocument = {
      id: Date.now().toString(),
      title: 'New Document.pdf',
      type: 'pdf',
      category: 'Uncategorized',
      owner: 'Current User',
      lastModified: new Date().toISOString().split('T')[0],
      size: '0 KB',
      tags: []
    };
    
    setDocuments([...documents, newDocument]);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
              <p className="text-muted-foreground">
                Store and manage all your team's documents
              </p>
            </div>
            <Button onClick={uploadDocument}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  {currentCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setCurrentCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Card>
            <CardHeader className="py-4">
              <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground">
                <div className="col-span-6">NAME</div>
                <div className="col-span-2">OWNER</div>
                <div className="col-span-2">LAST MODIFIED</div>
                <div className="col-span-1">SIZE</div>
                <div className="col-span-1"></div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredDocuments.length > 0 ? (
                <div className="divide-y">
                  {mockDocuments.map((doc) => (
                    <DocumentItem key={doc.id} document={doc} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">No documents found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Documents;
