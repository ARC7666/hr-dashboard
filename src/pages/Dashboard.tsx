
import React from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { employees, teams, tasks } from '@/lib/data';
import { FileText, Users, Calendar, Check, ChartBar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const pendingTasks = employees.flatMap(employee => 
    employee.tasks.filter(task => task.status === 'pending')
  );

  return (
    <Layout>
      <Header 
        title="HR Dashboard" 
        subtitle="Manage employees and review tasks" 
      />
      
      <div className="p-6">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tasks for Review
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Employees
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="animate-fadeIn">
            <Card>
              <CardHeader>
                <CardTitle>Tasks Pending Verification</CardTitle>
                <CardDescription>Review and verify completed tasks or reassign them</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Task</th>
                        <th className="text-left py-3 px-4">Employee</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Priority</th>
                        <th className="text-left py-3 px-4">Tag</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingTasks.map((task, index) => {
                        const employee = employees.find(e => e.id === task.assignedTo);
                        return (
                          <tr key={task.id} className="border-b animate-slideIn" style={{ animationDelay: `${index * 0.1}s` }}>
                            <td className="py-3 px-4">{task.name}</td>
                            <td className="py-3 px-4">{employee?.name}</td>
                            <td className="py-3 px-4">{task.deadline}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs priority-${task.priority}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs tag-${task.tag}`}>
                                {task.tag}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => navigate(`/employee/${employee?.id}`)}
                              >
                                Review
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employees" className="animate-fadeIn">
            <Card>
              <CardHeader>
                <CardTitle>Employee Overview</CardTitle>
                <CardDescription>
                  View and manage all employees within your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {employees.map((employee, index) => (
                    <Card key={employee.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <CardDescription>{employee.position}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">{employee.department}</p>
                        <div className="mt-4 flex justify-between">
                          <span className="text-sm text-gray-500">Performance</span>
                          <span className="text-sm font-medium">{employee.performance.overall}%</span>
                        </div>
                        <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${employee.performance.overall}%` }}
                          ></div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => navigate(`/employee/${employee.id}`)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
