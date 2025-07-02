import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  DollarSign,
  Download
} from 'lucide-react';

const MyAppointments: React.FC = () => {
  const { user } = useAuth();
  const { getPatientIncidents } = useData();
  
  const appointments = getPatientIncidents(user?.patientId || '');
  
  const upcomingAppointments = appointments
    .filter(a => a.status === 'Scheduled' && new Date(a.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  const pastAppointments = appointments
    .filter(a => a.status === 'Completed' || new Date(a.appointmentDate) < new Date())
    .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Cancelled':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleDownload = (file: any) => {
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
        
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{appointment.description}</p>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span className="text-sm font-medium">{appointment.status}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {appointment.comments && (
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Notes:</span>
                      <span className="text-gray-600 ml-1">{appointment.comments}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
        )}
      </div>

      {/* Past Appointments */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment History</h2>
        
        {pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.map(appointment => (
              <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{appointment.description}</p>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span className="text-sm font-medium">{appointment.status}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  {appointment.cost && (
                    <div className="flex items-center space-x-1 text-green-600 font-medium">
                      <DollarSign className="h-4 w-4" />
                      <span>${appointment.cost}</span>
                    </div>
                  )}
                </div>

                {appointment.treatment && (
                  <div className="bg-green-50 p-3 rounded border border-green-200 mb-3">
                    <p className="text-sm">
                      <span className="font-medium text-green-800">Treatment:</span>
                      <span className="text-green-700 ml-1">{appointment.treatment}</span>
                    </p>
                  </div>
                )}

                {appointment.comments && (
                  <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Notes:</span>
                      <span className="text-gray-600 ml-1">{appointment.comments}</span>
                    </p>
                  </div>
                )}

                {appointment.files && appointment.files.length > 0 && (
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      <FileText className="h-4 w-4 inline mr-1" />
                      Attachments:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {appointment.files.map((file, index) => (
                        <button
                          key={index}
                          onClick={() => handleDownload(file)}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded transition-colors"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          {file.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {appointment.nextAppointmentDate && (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-sm text-blue-600">
                      <span className="font-medium">Next Appointment:</span>
                      <span className="ml-1">
                        {new Date(appointment.nextAppointmentDate).toLocaleDateString()} at{' '}
                        {new Date(appointment.nextAppointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No appointment history</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;