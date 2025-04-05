
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { employees, projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart2, Mail, Phone, User } from 'lucide-react';

// Create a tasks array since it's missing in data.ts
const tasks = [
  { id: '1', title: 'Review Frontend Updates', status: 'In Progress', deadline: '2023-05-15' },
  { id: '2', title: 'Complete API Integration', status: 'Completed', deadline: '2023-05-10' },
  { id: '3', title: 'Fix UI Responsiveness', status: 'Pending', deadline: '2023-05-20' },
  { id: '4', title: 'Update Documentation', status: 'In Progress', deadline: '2023-05-18' },
  { id: '5', title: 'Testing Security Features', status: 'Pending', deadline: '2023-05-25' },
];

const EmployeeDetail = () => {
  const { id } = useParams();
  const employee = employees.find(emp => emp.id === id) || employees[0];
  
  const employeeTasks = tasks.slice(0, 3); // Just using the first 3 tasks for this employee
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  };
  
  return (
    <Layout>
      <Header 
        title={employee.name} 
        subtitle={employee.position} 
      />
      
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="animate-fadeIn">
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`/avatars/${employee.id}.png`} />
                    <AvatarFallback className="text-lg">{getInitials(employee.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{employee.name}</h3>
                    <p className="text-muted-foreground">{employee.position}</p>
                    <Badge className="mt-1" variant="outline">{employee.department}</Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm">{employee.email || 'employee@company.com'}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm">{employee.phone || '(555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-sm">Employee ID: {employee.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fadeIn delay-100">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Performance Summary</CardTitle>
                <Button variant="outline" size="sm">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Productivity</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Team Collaboration</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Task Completion</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="animate-fadeIn delay-200">
              <CardHeader>
                <CardTitle>Current Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employeeTasks.map(task => (
                    <div key={task.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge variant={
                          task.status === 'Completed' ? 'default' : 
                          task.status === 'In Progress' ? 'secondary' : 
                          'outline'
                        }>
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                      <div className="mt-2 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button size="sm">Reassign</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fadeIn delay-300">
              <CardHeader>
                <CardTitle>Project Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 3).map(project => (
                    <div key={project.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">Role: {
                        ['Developer', 'Designer', 'QA Analyst'][Math.floor(Math.random() * 3)]
                      }</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Contribution: {Math.floor(Math.random() * 30) + 70}%
                        </span>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
