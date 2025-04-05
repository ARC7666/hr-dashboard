
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { managers, employees } from '@/lib/data';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, CalendarIcon, ChevronRight, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Step 1: Team Information
const teamSchema = z.object({
  teamId: z.string().min(1, 'Team ID is required'),
  teamName: z.string().min(1, 'Team name is required'),
  manager: z.string().min(1, 'Manager is required'),
  employees: z.array(z.string()).min(1, 'At least one employee is required'),
});

// Step 2: Project Information
const projectSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  deadline: z.date({
    required_error: 'Deadline is required',
  }),
  description: z.string().min(1, 'Project description is required'),
});

const CreateTeam = () => {
  const [step, setStep] = useState(1);
  const [teamData, setTeamData] = useState<z.infer<typeof teamSchema> | null>(null);
  const { toast } = useToast();
  
  const teamForm = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamId: '',
      teamName: '',
      manager: '',
      employees: [],
    },
  });
  
  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      description: '',
    },
  });
  
  const onTeamSubmit = (data: z.infer<typeof teamSchema>) => {
    setTeamData(data);
    setStep(2);
  };
  
  const onProjectSubmit = (data: z.infer<typeof projectSchema>) => {
    // Combine team and project data
    const fullData = {
      ...teamData,
      ...data,
    };
    
    // In a real app, you would send this data to your backend
    console.log('Full form data:', fullData);
    
    toast({
      title: "Team and project created!",
      description: `Created team "${fullData.teamName}" with project "${fullData.projectName}"`,
    });
    
    // Reset forms and go back to step 1
    teamForm.reset();
    projectForm.reset();
    setTeamData(null);
    setStep(1);
  };

  const handleBack = () => {
    setStep(1);
  };
  
  return (
    <Layout>
      <Header 
        title="Create Team" 
        subtitle="Set up a new team and assign a project" 
      />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                1
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className={`h-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ width: step === 1 ? '0%' : '100%', transition: 'width 0.5s ease-in-out' }}></div>
              </div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                2
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="pl-2">Team Details</span>
              <span className="pr-2">Project Assignment</span>
            </div>
          </div>
          
          {step === 1 && (
            <Card className="animate-fadeIn">
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <Form {...teamForm}>
                <form onSubmit={teamForm.handleSubmit(onTeamSubmit)}>
                  <CardContent className="space-y-6">
                    <FormField
                      control={teamForm.control}
                      name="teamId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter team ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter team name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="manager"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manager</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a manager" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {managers.map(manager => (
                                <SelectItem key={manager.id} value={manager.id}>
                                  {manager.name} - {manager.position}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This person will be responsible for the team.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="employees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employees</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className="w-full justify-between"
                                >
                                  {field.value.length > 0
                                    ? `${field.value.length} employees selected`
                                    : "Select employees"}
                                  <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-0" align="start">
                              <div className="p-4 space-y-4">
                                {employees.map(employee => {
                                  const isSelected = field.value.includes(employee.id);
                                  return (
                                    <div 
                                      key={employee.id} 
                                      className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                                      onClick={() => {
                                        const newValue = isSelected
                                          ? field.value.filter(id => id !== employee.id)
                                          : [...field.value, employee.id];
                                        field.onChange(newValue);
                                      }}
                                    >
                                      <div className={`w-5 h-5 rounded-sm border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                        {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                                      </div>
                                      <div>
                                        <p className="font-medium">{employee.name}</p>
                                        <p className="text-sm text-gray-500">{employee.position}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Select the employees who will be part of this team.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto">
                      Next Step
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          )}
          
          {step === 2 && (
            <Card className="animate-fadeIn">
              <CardHeader>
                <CardTitle>Project Assignment</CardTitle>
              </CardHeader>
              <Form {...projectForm}>
                <form onSubmit={projectForm.handleSubmit(onProjectSubmit)}>
                  <CardContent className="space-y-6">
                    <FormField
                      control={projectForm.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={projectForm.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Deadline</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            The deadline for completing this project.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={projectForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter project details and requirements" 
                              className="resize-none min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div>
                      <Label>Project Documents</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                          >
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX up to 10MB
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button type="submit">
                      Create Team & Assign Project
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreateTeam;
