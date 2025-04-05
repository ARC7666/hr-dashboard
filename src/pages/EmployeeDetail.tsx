import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { employees } from '@/lib/data';
import { ArrowLeft, ChartBar } from 'lucide-react';

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tab = searchParams.get('tab') || 'details';

  // Find the employee by ID
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return (
      <Layout>
        <div>Employee not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header
        title={employee.name}
        subtitle={`Details for ${employee.position}`}
      />

      <div className="p-6">
        <Button onClick={() => navigate('/employee-list')} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employee List
        </Button>

        <div className="flex gap-4 mb-4">
          <Button onClick={() => navigate(`/employee/${id}?tab=details`)} variant={tab === 'details' ? 'default' : 'outline'}>
            Details
          </Button>
          <Button onClick={() => navigate(`/employee/${id}?tab=performance`)} variant={tab === 'performance' ? 'default' : 'outline'}>
            Performance
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Department</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
            {/* Removed phone property as it does not exist in the Employee type */}
            <div>
              <p className="text-sm font-medium">Tasks</p>
              <p className="text-sm text-gray-500">{employee.tasks.length} assigned</p>
            </div>
          </CardContent>
        </Card>

        {tab === 'performance' && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Productivity</p>
                <p className="text-sm text-gray-500">{employee.performance.productivity}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Quality</p>
                <p className="text-sm text-gray-500">{employee.performance.quality}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Teamwork</p>
                <p className="text-sm text-gray-500">{employee.performance.teamwork}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Innovation</p>
                <p className="text-sm text-gray-500">{employee.performance.innovation}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Overall</p>
                <p className="text-sm text-gray-500">{employee.performance.overall}%</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default EmployeeDetail;
