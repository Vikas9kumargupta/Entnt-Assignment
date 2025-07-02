import React from 'react';
import { useData } from '../../context/DataContext';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp,
  FileText,
  UserPlus
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { patients, incidents, getDashboardStats } = useData();
  const stats = getDashboardStats();

  const upcomingAppointments = incidents
    .filter(i => i.status === 'Scheduled' && new Date(i.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 10);

  const recentPatients = patients
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend?: string;
  }> = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="bg-blue-500"
          trend="+12% from last month"
        />
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon={Calendar}
          color="bg-teal-500"
          trend="+8% from last month"
        />
        <StatCard
          title="Completed Treatments"
          value={stats.completedTreatments}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={DollarSign}
          color="bg-purple-500"
          trend="+15% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patientId);
                return (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{patient?.name}</p>
                      <p className="text-sm text-gray-600">{appointment.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.appointmentDate).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
            <UserPlus className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-600">{patient.contact}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <UserPlus className="h-6 w-6 text-blue-600 mr-3" />
            <span className="font-medium text-blue-700">Add New Patient</span>
          </button>
          <button className="flex items-center p-4 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
            <Calendar className="h-6 w-6 text-teal-600 mr-3" />
            <span className="font-medium text-teal-700">Schedule Appointment</span>
          </button>
          <button className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <FileText className="h-6 w-6 text-purple-600 mr-3" />
            <span className="font-medium text-purple-700">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;