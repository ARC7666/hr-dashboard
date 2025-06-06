
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  tasks: Task[];
  performance: Performance;
}

export interface Manager {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  manager: Manager;
  employees: Employee[];
  projects: Project[];
  performance: TeamPerformance;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  team: string;
  documents: string[];
}

export interface Task {
  id: string;
  name: string;
  assignedTo: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'verified';
  priority: 'high' | 'medium' | 'low';
  tag: 'design' | 'development' | 'management' | 'research';
  description: string;
}

export interface Performance {
  productivity: number;
  quality: number;
  teamwork: number;
  innovation: number;
  overall: number;
}

export interface TeamPerformance {
  projectCompletion: number;
  qualityScore: number;
  onTimeDelivery: number;
  clientSatisfaction: number;
  overall: number;
}

// Mock Managers
export const managers: Manager[] = [
  {
    id: 'm1',
    name: 'Manager 1',
    position: 'Senior Engineering Manager',
    department: 'Engineering',
    email: 'manager1@floww.com'
  },
  {
    id: 'm2',
    name: 'Manager 2',
    position: 'Design Director',
    department: 'Design',
    email: 'manager2@floww.com'
  },
  {
    id: 'm3',
    name: 'Manager 3',
    position: 'Product Manager',
    department: 'Product',
    email: 'manager3@floww.com'
  },
  {
    id: 'm4',
    name: 'Manager 4',
    position: 'Marketing Lead',
    department: 'Marketing',
    email: 'manager4@floww.com'
  }
];

// Mock Employees
export const employees: Employee[] = [
  {
    id: 'e1',
    name: 'Employee 1',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'employee1@floww.com',
    tasks: [
      {
        id: 't1',
        name: 'Finish monthly reporting',
        assignedTo: 'e1',
        deadline: '2025-04-08',
        status: 'pending',
        priority: 'high',
        tag: 'research',
        description: 'Complete the monthly KPI report for the engineering department'
      }
    ],
    performance: {
      productivity: 85,
      quality: 90,
      teamwork: 75,
      innovation: 80,
      overall: 82
    }
  },
  {
    id: 'e2',
    name: 'Employee 2',
    position: 'UX Designer',
    department: 'Design',
    email: 'employee2@floww.com',
    tasks: [
      {
        id: 't2',
        name: 'UX research results',
        assignedTo: 'e2',
        deadline: '2025-04-08',
        status: 'pending',
        priority: 'high',
        tag: 'design',
        description: 'Compile and present findings from the recent user research study'
      }
    ],
    performance: {
      productivity: 90,
      quality: 95,
      teamwork: 85,
      innovation: 92,
      overall: 90
    }
  },
  {
    id: 'e3',
    name: 'Employee 3',
    position: 'Backend Developer',
    department: 'Engineering',
    email: 'employee3@floww.com',
    tasks: [
      {
        id: 't3',
        name: 'API integration',
        assignedTo: 'e3',
        deadline: '2025-04-08',
        status: 'pending',
        priority: 'medium',
        tag: 'development',
        description: 'Integrate the payment gateway API with the backend services'
      }
    ],
    performance: {
      productivity: 88,
      quality: 82,
      teamwork: 90,
      innovation: 75,
      overall: 84
    }
  },
  {
    id: 'e4',
    name: 'Employee 4',
    position: 'Project Manager',
    department: 'Product',
    email: 'employee4@floww.com',
    tasks: [
      {
        id: 't4',
        name: 'Sprint planning',
        assignedTo: 'e4',
        deadline: '2025-04-10',
        status: 'pending',
        priority: 'low',
        tag: 'management',
        description: 'Prepare and facilitate the sprint planning session for next sprint'
      }
    ],
    performance: {
      productivity: 92,
      quality: 88,
      teamwork: 95,
      innovation: 80,
      overall: 89
    }
  },
  {
    id: 'e5',
    name: 'Employee 5',
    position: 'Frontend Developer',
    department: 'Engineering',
    email: 'employee5@floww.com',
    tasks: [],
    performance: {
      productivity: 78,
      quality: 85,
      teamwork: 80,
      innovation: 75,
      overall: 79
    }
  },
  {
    id: 'e6',
    name: 'Employee 6',
    position: 'Content Strategist',
    department: 'Marketing',
    email: 'employee6@floww.com',
    tasks: [],
    performance: {
      productivity: 86,
      quality: 90,
      teamwork: 85,
      innovation: 88,
      overall: 87
    }
  },
  {
    id: 'e7',
    name: 'Employee 7',
    position: 'QA Engineer',
    department: 'Engineering',
    email: 'employee7@floww.com',
    tasks: [],
    performance: {
      productivity: 82,
      quality: 95,
      teamwork: 75,
      innovation: 70,
      overall: 80
    }
  },
  {
    id: 'e8',
    name: 'Employee 8',
    position: 'Product Designer',
    department: 'Design',
    email: 'employee8@floww.com',
    tasks: [],
    performance: {
      productivity: 88,
      quality: 92,
      teamwork: 85,
      innovation: 94,
      overall: 90
    }
  }
];

// Mock Teams
export const teams: Team[] = [
  {
    id: 'team1',
    name: 'Core Platform Team',
    manager: managers[0],
    employees: [employees[0], employees[2], employees[4], employees[6]],
    projects: [],
    performance: {
      projectCompletion: 85,
      qualityScore: 90,
      onTimeDelivery: 80,
      clientSatisfaction: 88,
      overall: 86
    }
  },
  {
    id: 'team2',
    name: 'Product Design Team',
    manager: managers[1],
    employees: [employees[1], employees[7]],
    projects: [],
    performance: {
      projectCompletion: 92,
      qualityScore: 95,
      onTimeDelivery: 85,
      clientSatisfaction: 92,
      overall: 91
    }
  },
  {
    id: 'team3',
    name: 'Product Management Team',
    manager: managers[2],
    employees: [employees[3]],
    projects: [],
    performance: {
      projectCompletion: 88,
      qualityScore: 86,
      onTimeDelivery: 90,
      clientSatisfaction: 85,
      overall: 87
    }
  }
];

// Mock Projects
export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Platform Redesign',
    description: 'Redesign the core platform UI and improve user experience',
    deadline: '2025-05-15',
    status: 'in-progress',
    team: 'team2',
    documents: ['specs.pdf', 'wireframes.fig']
  },
  {
    id: 'p2',
    name: 'API Modernization',
    description: 'Update and modernize our backend APIs',
    deadline: '2025-06-30',
    status: 'pending',
    team: 'team1',
    documents: ['api_specs.pdf']
  }
];
