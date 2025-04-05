
import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { employees, tasks } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Check, X, FileText, ChartBar } from 'lucide-react';

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'tasks';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const employee = employees.find(emp => emp.id === id);
  
  if (!employee) {
    return (
      <Layout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold">Employee not found</h2>
          <Button className="mt-4" onClick={() => navigate('/employee-list')}>
            Back to Employee List
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleVerify = (taskId: string) => {
    toast({
      title: "Task verified",
      description: "The task has been verified successfully.",
    });
  };
  
  const handleReassign = (taskId: string) => {
    toast({
      title: "Task reassigned",
      description: "The task has been reassigned to the employee.",
    });
  };
  
  return (
    <Layout>
      <Header title={employee.name} subtitle={employee.position} />
      
      <div className="p-6">
        <div className="mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 animate-fadeIn">
            <CardHeader>
              <CardTitle>Employee Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Department</h3>
                <p className="text-sm text-gray-500">{employee.department}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Tasks</h3>
                <p className="text-sm text-gray-500">{employee.tasks.length} assigned</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Overall Performance</h3>
                <div className="flex items-center mt-1">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${employee.performance.overall}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{employee.performance.overall}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-3 animate-fadeIn delay-100">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="tasks" className="flex-1 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Tasks Review
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex-1 flex items-center gap-2">
                  <ChartBar className="h-4 w-4" />
                  Performance Analysis
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tasks" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>
                      Review employee tasks and provide feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {employee.tasks.length > 0 ? (
                      <div className="space-y-6">
                        {employee.tasks.map(task => (
                          <Card key={task.id} className="animate-slideIn">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-lg">{task.name}</CardTitle>
                                <div className="flex items-center space-x-2">
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs priority-${task.priority}`}>
                                    {task.priority}
                                  </span>
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs tag-${task.tag}`}>
                                    {task.tag}
                                  </span>
                                </div>
                              </div>
                              <CardDescription>Due: {task.deadline}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-700">{task.description}</p>
                              
                              <div className="mt-6">
                                <h4 className="text-sm font-medium mb-2">Your Feedback</h4>
                                <Textarea
                                  placeholder="Provide feedback on this task..."
                                  className="resize-none min-h-[100px]"
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                />
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                className="flex items-center gap-2"
                                onClick={() => handleReassign(task.id)}
                              >
                                <X className="h-4 w-4" />
                                Reassign
                              </Button>
                              <Button 
                                className="flex items-center gap-2"
                                onClick={() => handleVerify(task.id)}
                              >
                                <Check className="h-4 w-4" />
                                Verify
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No tasks assigned to this employee.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="performance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analysis</CardTitle>
                    <CardDescription>
                      Detailed breakdown of employee performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 animate-fadeIn">
                      <div>
                        <div className="flex justify-between mb-1">
                          <h4 className="text-sm font-medium">Productivity</h4>
                          <span className="text-sm">{employee.performance.productivity}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${employee.performance.productivity}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="animate-fadeIn delay-100">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-sm font-medium">Quality</h4>
                          <span className="text-sm">{employee.performance.quality}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-purple-600 rounded-full"
                            style={{ width: `${employee.performance.quality}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="animate-fadeIn delay-200">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-sm font-medium">Teamwork</h4>
                          <span className="text-sm">{employee.performance.teamwork}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${employee.performance.teamwork}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="animate-fadeIn delay-300">
                        <div className="flex justify-between mb-1">
                          <h4 className="text-sm font-medium">Innovation</h4>
                          <span className="text-sm">{employee.performance.innovation}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-amber-600 rounded-full"
                            style={{ width: `${employee.performance.innovation}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t animate-fadeIn">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium">Overall Performance</h4>
                          <span className="font-medium">{employee.performance.overall}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${employee.performance.overall}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
