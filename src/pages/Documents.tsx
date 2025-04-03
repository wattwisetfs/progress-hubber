
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  CalendarDays,
  ChevronDown, 
  File, 
  FileText, 
  Filter, 
  FolderOpen, 
  Image, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Share, 
  Star,
  Upload,
  File as FileIcon,
  FileImage,
  FilePdf,
  FileSpreadsheet,
  FileText as FileTextIcon,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Documents = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const documents = [
    {
      id: '1',
      name: 'Project Proposal.docx',
      type: 'document',
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      size: '1.2 MB',
      modified: 'Today',
      shared: true,
      owner: { name: 'Alex J', avatar: '' },
    },
    {
      id: '2',
      name: 'Requirements Specification.pdf',
      type: 'pdf',
      icon: <FilePdf className="h-6 w-6 text-red-500" />,
      size: '3.5 MB',
      modified: 'Yesterday',
      shared: true,
      owner: { name: 'Sarah M', avatar: '' },
    },
    {
      id: '3',
      name: 'Design Assets',
      type: 'folder',
      icon: <FolderOpen className="h-6 w-6 text-yellow-500" />,
      size: '8 items',
      modified: '3 days ago',
      shared: true,
      owner: { name: 'Emily C', avatar: '' },
    },
    {
      id: '4',
      name: 'Marketing Plan.xlsx',
      type: 'spreadsheet',
      icon: <FileSpreadsheet className="h-6 w-6 text-green-500" />,
      size: '890 KB',
      modified: 'Last week',
      shared: false,
      owner: { name: 'David L', avatar: '' },
    },
    {
      id: '5',
      name: 'Project Logo.png',
      type: 'image',
      icon: <FileImage className="h-6 w-6 text-purple-500" />,
      size: '2.1 MB',
      modified: '2 weeks ago',
      shared: false,
      owner: { name: 'Alex J', avatar: '' },
    },
    {
      id: '6',
      name: 'Budget Estimates.xlsx',
      type: 'spreadsheet',
      icon: <FileSpreadsheet className="h-6 w-6 text-green-500" />,
      size: '1.5 MB',
      modified: 'Last month',
      shared: false,
      owner: { name: 'Michael B', avatar: '' },
    },
  ];

  const recentDocuments = documents.slice(0, 3);
  const sharedDocuments = documents.filter(doc => doc.shared);

  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === documents.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(documents.map(doc => doc.id));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
            <p className="text-muted-foreground">
              Store, organize, and share important project files.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>
                    Enter a name for your new folder.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="folderName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="folderName"
                      placeholder="New Folder"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Folder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Files</DialogTitle>
                  <DialogDescription>
                    Upload files to your document storage.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Drag & Drop Files</h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse from your computer
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Upload Files</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Recently accessed documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center p-2 rounded-md hover:bg-secondary/20">
                    {doc.icon}
                    <div className="ml-3 flex-1 truncate">
                      <p className="text-sm font-medium leading-none">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.modified}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Shared with Me</CardTitle>
              <CardDescription>Documents shared by others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sharedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center p-2 rounded-md hover:bg-secondary/20">
                    {doc.icon}
                    <div className="ml-3 flex-1 truncate">
                      <p className="text-sm font-medium leading-none">{doc.name}</p>
                      <div className="flex items-center mt-1">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarFallback className="text-[10px]">
                            {doc.owner.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">{doc.owner.name}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Storage</CardTitle>
              <CardDescription>Your storage usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>3.5 GB used</span>
                  <span className="text-muted-foreground">10 GB total</span>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm flex-1">Documents</span>
                    <span className="text-sm">1.2 GB</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm flex-1">Spreadsheets</span>
                    <span className="text-sm">0.8 GB</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm flex-1">Images</span>
                    <span className="text-sm">1.5 GB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-full pl-8"
            />
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Select>
              <SelectTrigger className="w-36 h-9">
                <div className="flex items-center">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Types" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="folder">Folders</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="trash">Trash</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">
                          <div className="flex items-center">
                            <Checkbox 
                              checked={selectedItems.length === documents.length && documents.length > 0}
                              onCheckedChange={handleSelectAll}
                              aria-label="Select all"
                              className="mr-2"
                            />
                            Name
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium">Size</th>
                        <th className="text-left py-3 px-4 font-medium">Modified</th>
                        <th className="text-left py-3 px-4 font-medium">Owner</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Checkbox 
                                checked={selectedItems.includes(doc.id)}
                                onCheckedChange={() => toggleItemSelection(doc.id)}
                                aria-label={`Select ${doc.name}`}
                                className="mr-2"
                              />
                              {doc.icon}
                              <span className="ml-3">{doc.name}</span>
                              {doc.shared && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  Shared
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {doc.size}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {doc.modified}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="text-xs">
                                  {doc.owner.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {doc.owner.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Star className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Download</DropdownMenuItem>
                                  <DropdownMenuItem>Rename</DropdownMenuItem>
                                  <DropdownMenuItem>Move To</DropdownMenuItem>
                                  <DropdownMenuItem>Share</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shared">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">
                          <div className="flex items-center">
                            <Checkbox 
                              checked={false}
                              aria-label="Select all"
                              className="mr-2"
                            />
                            Name
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium">Size</th>
                        <th className="text-left py-3 px-4 font-medium">Modified</th>
                        <th className="text-left py-3 px-4 font-medium">Owner</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sharedDocuments.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Checkbox 
                                checked={false}
                                aria-label={`Select ${doc.name}`}
                                className="mr-2"
                              />
                              {doc.icon}
                              <span className="ml-3">{doc.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {doc.size}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {doc.modified}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="text-xs">
                                  {doc.owner.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {doc.owner.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Star className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Download</DropdownMenuItem>
                                  <DropdownMenuItem>Copy to My Files</DropdownMenuItem>
                                  <DropdownMenuItem>Share</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="starred">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mx-auto rounded-full bg-primary/10 p-6 mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">No Starred Files</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                You haven't starred any files yet. Click the star icon on files you want to access quickly.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="trash">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mx-auto rounded-full bg-primary/10 p-6 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary"></div>
              </div>
              <h3 className="text-xl font-semibold">Trash is Empty</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                Items in trash will be automatically deleted after 30 days.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Management Toolkit</CardTitle>
            <CardDescription>
              Tools to help you manage documents more efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Document Scanner</h3>
                <p className="text-sm text-muted-foreground">
                  Scan physical documents and convert to digital files
                </p>
                <Button variant="outline" className="w-full">Open Scanner</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Version History</h3>
                <p className="text-sm text-muted-foreground">
                  Track changes and restore previous versions
                </p>
                <Button variant="outline" className="w-full">View History</Button>
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <h3 className="font-medium">Document Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Use templates to create standardized documents
                </p>
                <Button variant="outline" className="w-full">Browse Templates</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Documents;
