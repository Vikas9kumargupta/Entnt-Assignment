import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Calendar, FileText, Clock, CheckCircle, DollarSign } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { patients, getPatientIncidents } = useData();
  
  const patient = patients.find(p => p.id === user?.patientId);
  const appointments = getPatientIncidents(user?.patientId || '');
  
  const upcomingAppointments = appointments
    .filter(a => a.status === 'Scheduled' && new Date(a.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  const completedAppointments = appointments.filter(a => a.status === 'Completed');
  const totalCost = completedAppointments.reduce((sum, a) => sum + (a.cost || 0), 0);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {patient?.name}</h1>
        <p className="text-gray-600">Here's your dental care overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value={upcomingAppointments.length}
          icon={Clock}
          color="bg-blue-500"
        />
        <StatCard
          title="Completed Treatments"
          value={completedAppointments.length}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Total Spending"
          value={`$${totalCost}`}
          icon={DollarSign}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{appointment.description}</p>
                      {appointment.comments && (
                        <p className="text-sm text-gray-500 mt-1">Note: {appointment.comments}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-700">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-blue-600">
                        {new Date(appointment.appointmentDate).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Treatments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Treatments</h2>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {completedAppointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{appointment.treatment}</p>
                    {appointment.cost && (
                      <p className="text-sm font-medium text-green-700 mt-1">
                        Cost: ${appointment.cost}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-700">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Personal Details</h3>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Email:</span> {patient?.email}</p>
              <p className="text-sm"><span className="font-medium">Phone:</span> {patient?.contact}</p>
              <p className="text-sm"><span className="font-medium">Date of Birth:</span> {patient?.dob}</p>
              <p className="text-sm"><span className="font-medium">Address:</span> {patient?.address}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Health Information</h3>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Health Info:</span> {patient?.healthInfo}</p>
              <p className="text-sm"><span className="font-medium">Emergency Contact:</span> {patient?.emergencyContact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;