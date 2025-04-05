
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { employees } from '@/lib/data';
import { Search, ChartBar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <Header 
        title="Employee List" 
        subtitle="View and manage employees in your organization" 
      />
      
      <div className="p-6">
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search employees..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => (
            <Card 
              key={employee.id} 
              className="animate-fadeIn hover:shadow-md transition-shadow duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>{employee.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => navigate(`/employee/${employee.id}?tab=performance`)}
                  >
                    <ChartBar className="h-4 w-4" />
                    <span className="sr-only">View performance</span>
                  </Button>
                </CardTitle>
                <p className="text-sm text-gray-500">{employee.position}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-gray-500">{employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tasks</p>
                    <p className="text-sm text-gray-500">{employee.tasks.length} assigned</p>
                  </div>
                  <div className="pt-2">
                    <Button 
                      className="w-full" 
                      onClick={() => navigate(`/employee/${employee.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No employees found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmployeeList;
