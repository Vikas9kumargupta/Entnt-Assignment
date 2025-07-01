export interface User {
  id: string;
  role: 'Admin' | 'Patient';
  email: string;
  password: string;
  patientId?: string;
  name?: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  healthInfo: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileAttachment {
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Incident {
  id: string;
  patientId: string;
  title: string;
  description: string;
  comments: string;
  appointmentDate: string;
  cost?: number;
  treatment?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  nextAppointmentDate?: string;
  files: FileAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  completedTreatments: number;
  pendingTreatments: number;
  totalRevenue: number;
  monthlyRevenue: number;
}