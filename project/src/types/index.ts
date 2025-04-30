export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userType: 'freelancer' | 'client';
  createdAt: string;
}

export interface Freelancer extends User {
  userType: 'freelancer';
  title: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  jobsCompleted: number;
  description: string;
  portfolio: PortfolioItem[];
  availability: 'available' | 'part-time' | 'not-available';
}

export interface Client extends User {
  userType: 'client';
  company: string;
  industry: string;
  jobsPosted: number;
  description: string;
  website?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budget: {
    type: 'fixed' | 'hourly';
    amount: number;
    currency: string;
  };
  clientId: string;
  client: Client;
  createdAt: string;
  deadline?: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  proposals: number;
  category: string;
  experience: 'entry' | 'intermediate' | 'expert';
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  proposedBudget: number;
  estimatedDuration: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'in-progress' | 'completed' | 'paid';
  dueDate?: string;
  completedDate?: string;
}

export interface Project {
  id: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  milestones: Milestone[];
  totalAmount: number;
}