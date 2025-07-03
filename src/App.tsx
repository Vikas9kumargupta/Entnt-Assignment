import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import PatientList from './components/Patients/PatientList';
import AppointmentList from './components/Appointments/AppointmentList';
import CalendarView from './components/Calendar/CalendarView';
import MyAppointments from './components/Patient/MyAppointments';
import Profile from './components/Patient/Profile';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === 'Admin' ? '/dashboard' : '/patient-dashboard'} replace /> : <Login />} />
      
      {/* Admin Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="Admin">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
      </Route>
      
      <Route path="/patients" element={
        <ProtectedRoute requiredRole="Admin">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<PatientList />} />
      </Route>
      
      <Route path="/appointments" element={
        <ProtectedRoute requiredRole="Admin">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<AppointmentList />} />
      </Route>
      
      <Route path="/calendar" element={
        <ProtectedRoute requiredRole="Admin">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<CalendarView />} />
      </Route>

      {/* Patient Routes */}
      <Route path="/patient-dashboard" element={
        <ProtectedRoute requiredRole="Patient">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<PatientDashboard />} />
      </Route>
      
      <Route path="/my-appointments" element={
        <ProtectedRoute requiredRole="Patient">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<MyAppointments />} />
      </Route>
      
      <Route path="/profile" element={
        <ProtectedRoute requiredRole="Patient">
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Profile />} />
      </Route>

      {/* Redirect root to appropriate dashboard */}
      <Route path="/" element={
        user ? (
          <Navigate to={user.role === 'Admin' ? '/dashboard' : '/patient-dashboard'} replace />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <AppContent />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;