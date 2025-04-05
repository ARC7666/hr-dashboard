
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
import { managers, employees } from '@/lib/data';
import { Check, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

// Team Information Schema
const teamSchema = z.object({
  teamId: z.string().min(1, 'Team ID is required'),
  teamName: z.string().min(1, 'Team name is required'),
  manager: z.string().min(1, 'Manager is required'),
  employees: z.array(z.string()).min(1, 'At least one employee is required'),
});

const CreateTeam = () => {
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
  
  const onTeamSubmit = (data: z.infer<typeof teamSchema>) => {
    // In a real app, you would send this data to your backend
    console.log('Team form data:', data);
    
    toast({
      title: "Team created!",
      description: `Successfully created team "${data.teamName}"`,
    });
    
    // Reset the form
    teamForm.reset();
  };
  
  return (
    <Layout>
      <Header 
        title="Create Team" 
        subtitle="Set up a new team" 
      />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
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
                    Save Team
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTeam;
