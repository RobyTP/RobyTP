import { Client, Freelancer, Job, Message, Conversation, Project, Proposal } from '../types';

// Mock Users - Freelancers
export const mockFreelancers: Freelancer[] = [
  {
    id: 'f1',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    userType: 'freelancer',
    title: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    hourlyRate: 45,
    rating: 4.9,
    jobsCompleted: 47,
    description: 'Experienced full stack developer with 7+ years specializing in React and Node.js applications.',
    portfolio: [
      {
        id: 'p1',
        title: 'E-commerce Platform',
        description: 'Built a full-featured e-commerce platform with React, Node.js, and MongoDB',
        imageUrl: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg',
        link: 'https://example.com/ecommerce'
      },
      {
        id: 'p2',
        title: 'Task Management App',
        description: 'Developed a task management application with real-time collaboration',
        imageUrl: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg',
        link: 'https://example.com/taskapp'
      }
    ],
    availability: 'available',
    createdAt: '2023-05-10T14:30:00Z'
  },
  {
    id: 'f2',
    name: 'Thomas Walker',
    email: 'thomas.walker@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    userType: 'freelancer',
    title: 'UX/UI Designer',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    hourlyRate: 50,
    rating: 4.8,
    jobsCompleted: 63,
    description: 'Creative UI/UX designer with a passion for crafting beautiful and functional interfaces.',
    portfolio: [
      {
        id: 'p3',
        title: 'Finance App Redesign',
        description: 'Complete redesign of a financial management application',
        imageUrl: 'https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg',
        link: 'https://example.com/finance-redesign'
      }
    ],
    availability: 'part-time',
    createdAt: '2023-06-22T09:15:00Z'
  },
  {
    id: 'f3',
    name: 'Emma Chen',
    email: 'emma.chen@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    userType: 'freelancer',
    title: 'Digital Marketing Specialist',
    skills: ['SEO', 'Content Marketing', 'Social Media', 'Google Analytics'],
    hourlyRate: 35,
    rating: 4.7,
    jobsCompleted: 39,
    description: 'Digital marketing expert specializing in SEO and content strategy to drive organic growth.',
    portfolio: [
      {
        id: 'p4',
        title: 'E-commerce SEO Campaign',
        description: 'Improved organic traffic by 150% for an e-commerce platform',
        imageUrl: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
        link: 'https://example.com/seo-case-study'
      }
    ],
    availability: 'available',
    createdAt: '2023-04-05T11:45:00Z'
  }
];

// Mock Users - Clients
export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'David Müller',
    email: 'david.muller@techcorp.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    userType: 'client',
    company: 'TechCorp Solutions',
    industry: 'Software Development',
    jobsPosted: 12,
    description: 'TechCorp specializes in custom software solutions for enterprises.',
    website: 'https://techcorp-example.com',
    createdAt: '2023-01-15T08:00:00Z'
  },
  {
    id: 'c2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@artify.com',
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    userType: 'client',
    company: 'Artify Creative',
    industry: 'Digital Marketing',
    jobsPosted: 8,
    description: 'Creative agency focusing on brand identity and digital marketing campaigns.',
    website: 'https://artify-example.com',
    createdAt: '2023-02-20T10:30:00Z'
  },
  {
    id: 'c3',
    name: 'Michael Wong',
    email: 'michael.wong@retailpro.com',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    userType: 'client',
    company: 'RetailPro',
    industry: 'E-commerce',
    jobsPosted: 5,
    description: 'Online retail platform specializing in consumer electronics.',
    website: 'https://retailpro-example.com',
    createdAt: '2023-03-10T14:15:00Z'
  }
];

// Combine all users
export const mockUsers = [...mockFreelancers, ...mockClients];

// Mock Jobs
export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Front-end Developer for E-commerce Platform',
    description: 'We are looking for an experienced front-end developer to help us enhance our e-commerce platform. The ideal candidate will have strong React skills and experience with state management libraries.',
    skills: ['React', 'JavaScript', 'CSS', 'Redux'],
    budget: {
      type: 'fixed',
      amount: 3000,
      currency: 'USD'
    },
    clientId: 'c1',
    client: mockClients[0],
    createdAt: '2023-06-01T09:00:00Z',
    deadline: '2023-07-15T00:00:00Z',
    status: 'open',
    proposals: 12,
    category: 'Web Development',
    experience: 'intermediate'
  },
  {
    id: 'j2',
    title: 'UI/UX Designer for Mobile App',
    description: 'Looking for a talented UI/UX designer to redesign our mobile application. You will be responsible for creating user-centered designs and improving the overall user experience.',
    skills: ['UI Design', 'UX Design', 'Figma', 'Mobile Design'],
    budget: {
      type: 'hourly',
      amount: 45,
      currency: 'USD'
    },
    clientId: 'c2',
    client: mockClients[1],
    createdAt: '2023-06-05T14:30:00Z',
    deadline: '2023-07-20T00:00:00Z',
    status: 'open',
    proposals: 8,
    category: 'Design',
    experience: 'expert'
  },
  {
    id: 'j3',
    title: 'Content Writer for Blog Articles',
    description: 'We are seeking a content writer to create engaging blog articles for our marketing campaigns. Topics will focus on digital marketing trends and best practices.',
    skills: ['Content Writing', 'SEO', 'Blogging', 'Research'],
    budget: {
      type: 'fixed',
      amount: 500,
      currency: 'USD'
    },
    clientId: 'c3',
    client: mockClients[2],
    createdAt: '2023-06-10T11:15:00Z',
    deadline: '2023-06-30T00:00:00Z',
    status: 'open',
    proposals: 15,
    category: 'Writing',
    experience: 'entry'
  },
  {
    id: 'j4',
    title: 'Full Stack Developer for CRM System',
    description: 'Seeking a full stack developer to build a custom CRM system for our sales team. The ideal candidate will have experience with React, Node.js, and database design.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    budget: {
      type: 'fixed',
      amount: 5000,
      currency: 'USD'
    },
    clientId: 'c1',
    client: mockClients[0],
    createdAt: '2023-06-12T08:45:00Z',
    deadline: '2023-08-15T00:00:00Z',
    status: 'open',
    proposals: 7,
    category: 'Web Development',
    experience: 'expert'
  },
  {
    id: 'j5',
    title: 'Social Media Campaign Manager',
    description: 'We need a social media expert to plan and execute a marketing campaign across multiple platforms. The campaign will run for 3 months and focus on increasing brand awareness.',
    skills: ['Social Media Marketing', 'Content Creation', 'Campaign Planning', 'Analytics'],
    budget: {
      type: 'hourly',
      amount: 30,
      currency: 'USD'
    },
    clientId: 'c2',
    client: mockClients[1],
    createdAt: '2023-06-15T13:20:00Z',
    deadline: '2023-07-01T00:00:00Z',
    status: 'open',
    proposals: 10,
    category: 'Marketing',
    experience: 'intermediate'
  }
];

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: 'pr1',
    jobId: 'j1',
    freelancerId: 'f1',
    coverLetter: 'I am very interested in this project as I have extensive experience with React and e-commerce platforms. I have previously built similar solutions and understand the challenges involved.',
    proposedBudget: 2800,
    estimatedDuration: '3 weeks',
    status: 'pending',
    createdAt: '2023-06-02T10:15:00Z'
  },
  {
    id: 'pr2',
    jobId: 'j2',
    freelancerId: 'f2',
    coverLetter: 'As a UI/UX designer with over 5 years of experience in mobile app design, I believe I am a perfect fit for this project. I have attached some relevant examples from my portfolio.',
    proposedBudget: 40,
    estimatedDuration: '80 hours',
    status: 'accepted',
    createdAt: '2023-06-06T09:30:00Z'
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'c1',
    receiverId: 'f1',
    content: 'Hello, I saw your proposal for my front-end project. Can we discuss more details?',
    createdAt: '2023-06-03T14:25:00Z',
    read: true
  },
  {
    id: 'm2',
    senderId: 'f1',
    receiverId: 'c1',
    content: 'Hi David, I would be happy to discuss the project details. When would be a good time for you?',
    createdAt: '2023-06-03T15:10:00Z',
    read: true
  },
  {
    id: 'm3',
    senderId: 'c2',
    receiverId: 'f2',
    content: 'Your proposal looks promising. I would like to set up a call to discuss the design approach.',
    createdAt: '2023-06-07T11:00:00Z',
    read: true
  },
  {
    id: 'm4',
    senderId: 'f2',
    receiverId: 'c2',
    content: 'That sounds great! I am available tomorrow between 2-5pm EST or anytime Thursday.',
    createdAt: '2023-06-07T11:45:00Z',
    read: false
  }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['c1', 'f1'],
    lastMessage: mockMessages[1],
    updatedAt: '2023-06-03T15:10:00Z'
  },
  {
    id: 'conv2',
    participants: ['c2', 'f2'],
    lastMessage: mockMessages[3],
    updatedAt: '2023-06-07T11:45:00Z'
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'proj1',
    jobId: 'j2',
    clientId: 'c2',
    freelancerId: 'f2',
    title: 'UI/UX Designer for Mobile App',
    description: 'Redesign of the mobile application with focus on improving user experience and visual appeal.',
    status: 'active',
    startDate: '2023-06-10T00:00:00Z',
    milestones: [
      {
        id: 'ms1',
        title: 'Initial Wireframes',
        description: 'Create wireframes for all key screens of the application',
        amount: 500,
        status: 'completed',
        dueDate: '2023-06-17T00:00:00Z',
        completedDate: '2023-06-16T14:30:00Z'
      },
      {
        id: 'ms2',
        title: 'High-fidelity Design',
        description: 'Develop detailed visual designs based on approved wireframes',
        amount: 1000,
        status: 'in-progress',
        dueDate: '2023-07-01T00:00:00Z'
      },
      {
        id: 'ms3',
        title: 'Prototype and Handoff',
        description: 'Create interactive prototype and prepare design files for developers',
        amount: 800,
        status: 'pending',
        dueDate: '2023-07-15T00:00:00Z'
      }
    ],
    totalAmount: 2300
  }
];

// Skills for filters and search
export const skillsList = [
  'JavaScript', 'React', 'Node.js', 'TypeScript', 'Vue.js', 'Angular',
  'HTML/CSS', 'UI Design', 'UX Design', 'Figma', 'Adobe XD', 'Sketch',
  'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'PHP', 'Laravel',
  'WordPress', 'Mobile Development', 'iOS', 'Android', 'React Native', 'Flutter',
  'SEO', 'Content Writing', 'Copywriting', 'Social Media Marketing', 'Digital Marketing',
  'Google Analytics', 'Data Analysis', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL',
  'DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git',
  'Project Management', 'Agile', 'Scrum', 'Product Management',
  'Graphic Design', 'Logo Design', '3D Modeling', 'Video Editing', 'Animation'
];

// Categories for filters
export const categoriesList = [
  'Web Development', 'Mobile Development', 'Design', 'Writing',
  'Marketing', 'Data Science', 'DevOps', 'Business', 'Customer Service',
  'Sales', 'Accounting', 'Legal', 'Admin Support', 'Engineering'
];