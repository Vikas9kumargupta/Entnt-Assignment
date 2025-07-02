import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Patient, Incident, DashboardStats } from '../types';

interface DataContextType {
  patients: Patient[];
  incidents: Incident[];
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  addIncident: (incident: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateIncident: (id: string, incident: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  getDashboardStats: () => DashboardStats;
  getPatientIncidents: (patientId: string) => Incident[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialPatients: Patient[] = [
  {
    id: "p1",
    name: "Vikas Gupta",
    dob: "1990-05-10",
    contact: "1234567890",
    healthInfo: "No allergies, regular smoker",
    email: "vikasgup074@gmail.com",
    address: "Kondapur, Hyderabad",
    emergencyContact: "Vikas Gupta - 0987654321",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z"
  },
  {
    id: "p2",
    name: "Jane Smith",
    dob: "1985-08-22",
    contact: "2345678901",
    healthInfo: "Allergic to penicillin, diabetes type 2",
    email: "jane@entnt.in",
    address: "456 Oak Ave, Another City, ST 67890",
    emergencyContact: "John Smith - 1234567890",
    createdAt: "2024-02-10T14:30:00.000Z",
    updatedAt: "2024-02-10T14:30:00.000Z"
  },
  {
    id: "p3",
    name: "Mike Johnson",
    dob: "1992-03-15",
    contact: "3456789012",
    healthInfo: "No known allergies, anxiety about dental procedures",
    email: "mike@entnt.in",
    address: "789 Pine Rd, Somewhere, ST 13579",
    emergencyContact: "Lisa Johnson - 2468135790",
    createdAt: "2024-03-05T09:15:00.000Z",
    updatedAt: "2024-03-05T09:15:00.000Z"
  },
  {
    id: "p4",
    name: "Sarah Wilson",
    dob: "1988-11-30",
    contact: "4567890123",
    healthInfo: "Allergic to latex, high blood pressure medication",
    email: "sarah@entnt.in",
    address: "321 Elm St, Elsewhere, ST 24680",
    emergencyContact: "Tom Wilson - 3579246810",
    createdAt: "2024-04-12T16:45:00.000Z",
    updatedAt: "2024-04-12T16:45:00.000Z"
  },
  {
    id: "p5",
    name: "David Brown",
    dob: "1995-07-08",
    contact: "5678901234",
    healthInfo: "No allergies, previous orthodontic treatment",
    email: "david@entnt.in",
    address: "654 Maple Ave, Nowhere, ST 97531",
    emergencyContact: "Mary Brown - 4681357902",
    createdAt: "2024-05-20T11:20:00.000Z",
    updatedAt: "2024-05-20T11:20:00.000Z"
  },
  {
    id: "p6",
    name: "Lisa Davis",
    dob: "1983-12-03",
    contact: "6789012345",
    healthInfo: "Allergic to ibuprofen, pregnant (2nd trimester)",
    email: "lisa@entnt.in",
    address: "987 Cedar Ln, Anywhere, ST 86420",
    emergencyContact: "Mark Davis - 5792468013",
    createdAt: "2024-06-08T13:10:00.000Z",
    updatedAt: "2024-06-08T13:10:00.000Z"
  },
  {
    id: "p7",
    name: "Robert Miller",
    dob: "1978-09-25",
    contact: "7890123456",
    healthInfo: "Heart condition, takes blood thinners, no known allergies",
    email: "robert@entnt.in",
    address: "147 Birch St, Everywhere, ST 75319",
    emergencyContact: "Susan Miller - 6803579124",
    createdAt: "2024-07-15T08:30:00.000Z",
    updatedAt: "2024-07-15T08:30:00.000Z"
  }
];

const initialIncidents: Incident[] = [
  // John Doe's appointments
  {
    id: "i1",
    patientId: "p1",
    title: "Toothache",
    description: "Upper molar pain",
    comments: "Sensitive to cold",
    appointmentDate: "2025-01-15T10:00:00",
    cost: 80,
    treatment: "Root canal therapy",
    status: "Completed",
    nextAppointmentDate: "2025-02-15T10:00:00",
    files: [],
    createdAt: "2024-12-20T10:00:00.000Z",
    updatedAt: "2025-01-15T11:30:00.000Z"
  },
  {
    id: "i2",
    patientId: "p1",
    title: "Dental Cleaning",
    description: "Regular dental cleaning and checkup",
    comments: "Good oral hygiene",
    appointmentDate: "2025-01-20T14:30:00",
    status: "Scheduled",
    files: [],
    createdAt: "2024-12-15T14:30:00.000Z",
    updatedAt: "2024-12-15T14:30:00.000Z"
  },
  
  // Jane Smith's appointments
  {
    id: "i3",
    patientId: "p2",
    title: "Cavity Filling",
    description: "Small cavity in lower left molar",
    comments: "Patient reports mild discomfort",
    appointmentDate: "2025-01-18T09:00:00",
    cost: 120,
    treatment: "Composite filling",
    status: "Completed",
    files: [],
    createdAt: "2024-12-10T09:00:00.000Z",
    updatedAt: "2025-01-18T10:15:00.000Z"
  },
  {
    id: "i4",
    patientId: "p2",
    title: "Crown Preparation",
    description: "Preparation for dental crown on upper right premolar",
    comments: "Temporary crown placed",
    appointmentDate: "2025-01-22T11:00:00",
    cost: 450,
    treatment: "Crown preparation and temporary placement",
    status: "Completed",
    nextAppointmentDate: "2025-02-05T11:00:00",
    files: [],
    createdAt: "2024-12-18T11:00:00.000Z",
    updatedAt: "2025-01-22T12:30:00.000Z"
  },
  
  // Mike Johnson's appointments
  {
    id: "i5",
    patientId: "p3",
    title: "Wisdom Tooth Extraction",
    description: "Impacted wisdom tooth removal",
    comments: "Patient very anxious, sedation recommended",
    appointmentDate: "2025-01-25T15:00:00",
    status: "Scheduled",
    files: [],
    createdAt: "2024-12-22T15:00:00.000Z",
    updatedAt: "2024-12-22T15:00:00.000Z"
  },
  {
    id: "i6",
    patientId: "p3",
    title: "Routine Checkup",
    description: "6-month routine dental examination",
    comments: "No issues found, good oral health",
    appointmentDate: "2024-12-10T10:30:00",
    cost: 75,
    treatment: "Routine examination and cleaning",
    status: "Completed",
    files: [],
    createdAt: "2024-11-15T10:30:00.000Z",
    updatedAt: "2024-12-10T11:45:00.000Z"
  },
  
  // Sarah Wilson's appointments
  {
    id: "i7",
    patientId: "p4",
    title: "Teeth Whitening",
    description: "Professional teeth whitening treatment",
    comments: "Patient wants brighter smile for wedding",
    appointmentDate: "2025-01-28T13:00:00",
    status: "Scheduled",
    files: [],
    createdAt: "2024-12-25T13:00:00.000Z",
    updatedAt: "2024-12-25T13:00:00.000Z"
  },
  {
    id: "i8",
    patientId: "p4",
    title: "Gum Treatment",
    description: "Periodontal therapy for gum disease",
    comments: "Mild gingivitis, improved with treatment",
    appointmentDate: "2024-11-20T14:00:00",
    cost: 200,
    treatment: "Deep cleaning and scaling",
    status: "Completed",
    nextAppointmentDate: "2025-02-20T14:00:00",
    files: [],
    createdAt: "2024-10-25T14:00:00.000Z",
    updatedAt: "2024-11-20T15:30:00.000Z"
  },
  
  // David Brown's appointments
  {
    id: "i9",
    patientId: "p5",
    title: "Retainer Check",
    description: "Post-orthodontic retainer adjustment",
    comments: "Retainer fits well, minor adjustment needed",
    appointmentDate: "2025-02-01T16:00:00",
    status: "Scheduled",
    files: [],
    createdAt: "2024-12-28T16:00:00.000Z",
    updatedAt: "2024-12-28T16:00:00.000Z"
  },
  {
    id: "i10",
    patientId: "p5",
    title: "Dental Cleaning",
    description: "Regular cleaning and checkup",
    comments: "Excellent oral hygiene post-braces",
    appointmentDate: "2024-10-15T09:30:00",
    cost: 85,
    treatment: "Professional cleaning and fluoride treatment",
    status: "Completed",
    files: [],
    createdAt: "2024-09-20T09:30:00.000Z",
    updatedAt: "2024-10-15T10:45:00.000Z"
  },
  
  // Lisa Davis's appointments
  {
    id: "i11",
    patientId: "p6",
    title: "Pregnancy Dental Care",
    description: "Prenatal dental examination",
    comments: "Safe procedures only due to pregnancy",
    appointmentDate: "2025-02-03T10:00:00",
    status: "Scheduled",
    files: [],
    createdAt: "2024-12-30T10:00:00.000Z",
    updatedAt: "2024-12-30T10:00:00.000Z"
  },
  {
    id: "i12",
    patientId: "p6",
    title: "Emergency Visit",
    description: "Broken filling during pregnancy",
    comments: "Temporary filling placed, permanent after delivery",
    appointmentDate: "2024-09-12T12:00:00",
    cost: 95,
    treatment: "Temporary filling replacement",
    status: "Completed",
    files: [],
    createdAt: "2024-09-12T11:30:00.000Z",
    updatedAt: "2024-09-12T13:15:00.000Z"
  },
  
  // Robert Miller's appointments
  {
    id: "i13",
    patientId: "p7",
    title: "Bridge Consultation",
    description: "Consultation for dental bridge replacement",
    comments: "Old bridge needs replacement, heart condition noted",
    appointmentDate: "2025-02-05T14:30:00",
    status: "Scheduled",
    files: [],
    createdAt: "2025-01-02T14:30:00.000Z",
    updatedAt: "2025-01-02T14:30:00.000Z"
  },
  {
    id: "i14",
    patientId: "p7",
    title: "Routine Checkup",
    description: "Regular examination with cardiac precautions",
    comments: "Coordinated with cardiologist, no issues found",
    appointmentDate: "2024-08-20T11:00:00",
    cost: 90,
    treatment: "Examination and gentle cleaning",
    status: "Completed",
    nextAppointmentDate: "2025-02-20T11:00:00",
    files: [],
    createdAt: "2024-07-25T11:00:00.000Z",
    updatedAt: "2024-08-20T12:30:00.000Z"
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    // Initialize data in localStorage
    const existingPatients = localStorage.getItem('dentalPatients');
    const existingIncidents = localStorage.getItem('dentalIncidents');

    if (!existingPatients) {
      localStorage.setItem('dentalPatients', JSON.stringify(initialPatients));
      setPatients(initialPatients);
    } else {
      setPatients(JSON.parse(existingPatients));
    }

    if (!existingIncidents) {
      localStorage.setItem('dentalIncidents', JSON.stringify(initialIncidents));
      setIncidents(initialIncidents);
    } else {
      setIncidents(JSON.parse(existingIncidents));
    }
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    localStorage.setItem('dentalPatients', JSON.stringify(updatedPatients));
  };

  const updatePatient = (id: string, patientData: Partial<Patient>) => {
    const updatedPatients = patients.map(patient =>
      patient.id === id
        ? { ...patient, ...patientData, updatedAt: new Date().toISOString() }
        : patient
    );
    setPatients(updatedPatients);
    localStorage.setItem('dentalPatients', JSON.stringify(updatedPatients));
  };

  const deletePatient = (id: string) => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    const updatedIncidents = incidents.filter(incident => incident.patientId !== id);
    setPatients(updatedPatients);
    setIncidents(updatedIncidents);
    localStorage.setItem('dentalPatients', JSON.stringify(updatedPatients));
    localStorage.setItem('dentalIncidents', JSON.stringify(updatedIncidents));
  };

  const addIncident = (incidentData: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIncident: Incident = {
      ...incidentData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedIncidents = [...incidents, newIncident];
    setIncidents(updatedIncidents);
    localStorage.setItem('dentalIncidents', JSON.stringify(updatedIncidents));
  };

  const updateIncident = (id: string, incidentData: Partial<Incident>) => {
    const updatedIncidents = incidents.map(incident =>
      incident.id === id
        ? { ...incident, ...incidentData, updatedAt: new Date().toISOString() }
        : incident
    );
    setIncidents(updatedIncidents);
    localStorage.setItem('dentalIncidents', JSON.stringify(updatedIncidents));
  };

  const deleteIncident = (id: string) => {
    const updatedIncidents = incidents.filter(incident => incident.id !== id);
    setIncidents(updatedIncidents);
    localStorage.setItem('dentalIncidents', JSON.stringify(updatedIncidents));
  };

  const getDashboardStats = (): DashboardStats => {
    const completedTreatments = incidents.filter(i => i.status === 'Completed').length;
    const pendingTreatments = incidents.filter(i => i.status !== 'Completed').length;
    const totalRevenue = incidents.reduce((sum, i) => sum + (i.cost || 0), 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = incidents
      .filter(i => {
        const incidentDate = new Date(i.appointmentDate);
        return incidentDate.getMonth() === currentMonth && 
               incidentDate.getFullYear() === currentYear &&
               i.status === 'Completed';
      })
      .reduce((sum, i) => sum + (i.cost || 0), 0);

    return {
      totalPatients: patients.length,
      totalAppointments: incidents.length,
      completedTreatments,
      pendingTreatments,
      totalRevenue,
      monthlyRevenue
    };
  };

  const getPatientIncidents = (patientId: string): Incident[] => {
    return incidents.filter(incident => incident.patientId === patientId);
  };

  return (
    <DataContext.Provider value={{
      patients,
      incidents,
      addPatient,
      updatePatient,
      deletePatient,
      addIncident,
      updateIncident,
      deleteIncident,
      getDashboardStats,
      getPatientIncidents
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};