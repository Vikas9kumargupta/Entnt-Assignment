import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { X, Save, Calendar, Upload, Trash2 } from 'lucide-react';
import { Incident, FileAttachment } from '../../types';

interface AppointmentFormProps {
  incidentId?: string | null;
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ incidentId, onClose }) => {
  const { incidents, patients, addIncident, updateIncident } = useData();
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: 'Scheduled' as 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled',
    nextAppointmentDate: '',
    files: [] as FileAttachment[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!incidentId;

  useEffect(() => {
    if (isEditing && incidentId) {
      const incident = incidents.find(i => i.id === incidentId);
      if (incident) {
        setFormData({
          patientId: incident.patientId,
          title: incident.title,
          description: incident.description,
          comments: incident.comments,
          appointmentDate: incident.appointmentDate.slice(0, 16),
          cost: incident.cost?.toString() || '',
          treatment: incident.treatment || '',
          status: incident.status,
          nextAppointmentDate: incident.nextAppointmentDate?.slice(0, 16) || '',
          files: incident.files || []
        });
      }
    }
  }, [isEditing, incidentId, incidents]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId) {
      newErrors.patientId = 'Please select a patient';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required';
    }

    if (formData.cost && isNaN(Number(formData.cost))) {
      newErrors.cost = 'Cost must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const incidentData = {
        ...formData,
        cost: formData.cost ? Number(formData.cost) : undefined,
        nextAppointmentDate: formData.nextAppointmentDate || undefined
      };

      if (isEditing && incidentId) {
        updateIncident(incidentId, incidentData);
      } else {
        addIncident(incidentData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile: FileAttachment = {
          name: file.name,
          url: event.target?.result as string,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString()
        };
        
        setFormData(prev => ({
          ...prev,
          files: [...prev.files, newFile]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Appointment' : 'Schedule New Appointment'}
          </h1>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
                Patient *
              </label>
              <select
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.patientId ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.contact}
                  </option>
                ))}
              </select>
              {errors.patientId && <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., Dental Cleaning, Root Canal"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date & Time *
              </label>
              <input
                type="datetime-local"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.appointmentDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.appointmentDate && <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>}
            </div>

            <div>
              <label htmlFor="nextAppointmentDate" className="block text-sm font-medium text-gray-700 mb-2">
                Next Appointment Date & Time
              </label>
              <input
                type="datetime-local"
                id="nextAppointmentDate"
                name="nextAppointmentDate"
                value={formData.nextAppointmentDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe the issue or treatment needed"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
              Comments / Notes
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes or comments"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-2">
                Cost ($)
              </label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.cost ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter treatment cost"
              />
              {errors.cost && <p className="mt-1 text-sm text-red-600">{errors.cost}</p>}
            </div>

            <div>
              <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-2">
                Treatment Provided
              </label>
              <input
                type="text"
                id="treatment"
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Composite filling, Scaling"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Attachments
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload files (invoices, X-rays, images, etc.)
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
              >
                Choose Files
              </label>
            </div>

            {formData.files.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : (isEditing ? 'Update Appointment' : 'Schedule Appointment')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;