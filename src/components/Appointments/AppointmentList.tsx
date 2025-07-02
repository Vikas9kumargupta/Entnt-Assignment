import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react';
import AppointmentForm from './AppointmentForm';

const AppointmentList: React.FC = () => {
  const { incidents, patients, deleteIncident } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingIncident, setEditingIncident] = useState<string | null>(null);

  const filteredIncidents = incidents.filter(incident => {
    const patient = patients.find(p => p.id === incident.patientId);
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || incident.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (incidentId: string) => {
    setEditingIncident(incidentId);
    setShowForm(true);
  };

  const handleDelete = (incidentId: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteIncident(incidentId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingIncident(null);
  };

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

  if (showForm) {
    return (
      <AppointmentForm
        incidentId={editingIncident}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => {
          const patient = patients.find(p => p.id === incident.patientId);
          return (
            <div key={incident.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{patient?.name}</h3>
                      <p className="text-sm text-gray-500">{patient?.contact}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-1">{incident.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                    {incident.comments && (
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Notes:</span> {incident.comments}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(incident.appointmentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{new Date(incident.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {incident.cost && (
                      <div className="text-green-600 font-medium">
                        ${incident.cost}
                      </div>
                    )}
                  </div>

                  {incident.treatment && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium text-green-800">Treatment:</span>
                        <span className="text-green-700 ml-1">{incident.treatment}</span>
                      </p>
                    </div>
                  )}

                  {incident.files && incident.files.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {incident.files.map((file, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {file.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-3">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(incident.status)}`}>
                    {getStatusIcon(incident.status)}
                    <span className="text-sm font-medium">{incident.status}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(incident.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(incident.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter ? 'Try adjusting your search or filters' : 'Get started by scheduling your first appointment'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;