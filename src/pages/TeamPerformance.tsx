
import React from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { teams } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const TeamPerformance = () => {
  // Prepare data for bar chart
  const barChartData = teams.map(team => ({
    name: team.name,
    overall: team.performance.overall,
    projectCompletion: team.performance.projectCompletion,
    qualityScore: team.performance.qualityScore,
    onTimeDelivery: team.performance.onTimeDelivery,
    clientSatisfaction: team.performance.clientSatisfaction
  }));
  
  return (
    <Layout>
      <Header 
        title="Team Performance" 
        subtitle="Analyze and compare team metrics" 
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="animate-fadeIn">
            <CardHeader>
              <CardTitle>Overall Performance</CardTitle>
              <CardDescription>
                Comparative analysis of team performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="overall" name="Overall Performance" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fadeIn delay-100">
            <CardHeader>
              <CardTitle>Performance Breakdown</CardTitle>
              <CardDescription>
                Detailed performance metrics across all teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="projectCompletion" name="Project Completion" fill="#8B5CF6" />
                    <Bar dataKey="qualityScore" name="Quality Score" fill="#10B981" />
                    <Bar dataKey="onTimeDelivery" name="On-Time Delivery" fill="#F59E0B" />
                    <Bar dataKey="clientSatisfaction" name="Client Satisfaction" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teams.map((team, index) => {
            const radarData = [
              { subject: 'Project Completion', A: team.performance.projectCompletion, fullMark: 100 },
              { subject: 'Quality Score', A: team.performance.qualityScore, fullMark: 100 },
              { subject: 'On-Time Delivery', A: team.performance.onTimeDelivery, fullMark: 100 },
              { subject: 'Client Satisfaction', A: team.performance.clientSatisfaction, fullMark: 100 },
              { subject: 'Overall', A: team.performance.overall, fullMark: 100 },
            ];
            
            return (
              <Card 
                key={team.id} 
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader>
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>
                    Managed by {team.manager.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Performance" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">Team Size</p>
                      <p className="text-gray-500">{team.employees.length} members</p>
                    </div>
                    <div>
                      <p className="font-medium">Projects</p>
                      <p className="text-gray-500">{team.projects.length} active</p>
                    </div>
                    <div className="col-span-2 mt-2">
                      <p className="font-medium">Overall Performance</p>
                      <div className="mt-1 flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${team.performance.overall}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium">{team.performance.overall}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default TeamPerformance;
