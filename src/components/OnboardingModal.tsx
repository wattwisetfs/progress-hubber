
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface OnboardingModalProps {
  onComplete: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleComplete = () => {
    setOpen(false);
    onComplete();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Welcome to ProgressHub</DialogTitle>
          <DialogDescription>
            Let's get you started with our platform. Follow this quick guide to learn the basics.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>Step {currentStep} of {totalSteps}</span>
          <Button variant="link" className="p-0" onClick={handleComplete}>
            Skip tutorial
          </Button>
        </div>

        <Tabs value={`step-${currentStep}`} className="w-full">
          <TabsContent value="step-1">
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Getting Started</h3>
              <p className="text-sm text-muted-foreground">
                ProgressHub is a comprehensive project management platform designed to help teams 
                organize projects, track progress, and collaborate effectively.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Projects</h4>
                  <p className="text-sm text-muted-foreground">Create and manage all your projects in one place</p>
                </div>
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Teams</h4>
                  <p className="text-sm text-muted-foreground">Invite and collaborate with team members</p>
                </div>
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Documents</h4>
                  <p className="text-sm text-muted-foreground">Store and share important files and information</p>
                </div>
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Reports</h4>
                  <p className="text-sm text-muted-foreground">Generate insights and track performance</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-2">
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Creating Your First Project</h3>
              <p className="text-sm text-muted-foreground">
                Projects are the core of ProgressHub. Learn how to create your first project and set it up for success.
              </p>
              <div className="space-y-4 mt-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Click "New Project" button</h4>
                    <p className="text-sm text-muted-foreground">Find it on the dashboard or projects page</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Fill in project details</h4>
                    <p className="text-sm text-muted-foreground">Name, description, timeline, and other key information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Invite team members</h4>
                    <p className="text-sm text-muted-foreground">Add collaborators to your project</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Create tasks and milestones</h4>
                    <p className="text-sm text-muted-foreground">Break down your project into manageable pieces</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-3">
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                ProgressHub is designed for teams. Learn how to invite team members and collaborate effectively.
              </p>
              <div className="border rounded-md p-4 space-y-4 mt-4">
                <h4 className="font-medium">Inviting Team Members</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Go to the Team page from the sidebar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Click "Invite Member" button</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Enter email address and select role</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Send invitation</span>
                  </li>
                </ul>

                <h4 className="font-medium pt-2">Communication Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Project comments for context-specific discussions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Direct messages for one-on-one communication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Team channels for group discussions</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="step-4">
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Next Steps</h3>
              <p className="text-sm text-muted-foreground">
                You're all set! Here are some next steps to make the most of ProgressHub.
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Customize Your Profile</h4>
                  <p className="text-sm text-muted-foreground">Add your photo, contact information, and preferences</p>
                  <Button variant="link" className="px-0">Go to profile settings</Button>
                </div>
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Explore Templates</h4>
                  <p className="text-sm text-muted-foreground">Use pre-built templates to jumpstart your projects</p>
                  <Button variant="link" className="px-0">Browse templates</Button>
                </div>
                <div className="border rounded-md p-4 space-y-2">
                  <h4 className="font-medium">Set Up Notifications</h4>
                  <p className="text-sm text-muted-foreground">Configure how and when you receive updates</p>
                  <Button variant="link" className="px-0">Notification settings</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={nextStep}>
              {currentStep < totalSteps ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Get Started'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
