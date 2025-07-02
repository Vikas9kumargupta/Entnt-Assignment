import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';

const CalendarView: React.FC = () => {
  const { incidents, patients } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Get appointments for current month
  const monthAppointments = incidents.filter(incident => {
    const appointmentDate = new Date(incident.appointmentDate);
    return appointmentDate.getMonth() === currentMonth && 
           appointmentDate.getFullYear() === currentYear;
  });

  // Get appointments for selected date
  const selectedDateAppointments = selectedDate
    ? incidents.filter(incident => {
        const appointmentDate = new Date(incident.appointmentDate);
        return appointmentDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const getAppointmentsForDate = (date: number) => {
    const targetDate = new Date(currentYear, currentMonth, date);
    return monthAppointments.filter(incident => {
      const appointmentDate = new Date(incident.appointmentDate);
      return appointmentDate.toDateString() === targetDate.toDateString();
    });
  };

  const isToday = (date: number) => {
    return today.getDate() === date && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear;
  };

  const isSelected = (date: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === date && 
           selectedDate.getMonth() === currentMonth && 
           selectedDate.getFullYear() === currentYear;
  };

  const handleDateClick = (date: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, date));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="h-20"></div>;
              }

              const dayAppointments = getAppointmentsForDate(day);
              const hasAppointments = dayAppointments.length > 0;

              return (
                <div
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`h-20 p-1 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isToday(day) ? 'bg-blue-50 border-blue-300' : ''
                  } ${
                    isSelected(day) ? 'bg-blue-100 border-blue-400' : ''
                  }`}
                >
                  <div className={`text-sm font-medium ${
                    isToday(day) ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  {hasAppointments && (
                    <div className="mt-1">
                      {dayAppointments.slice(0, 2).map((appointment, idx) => (
                        <div
                          key={idx}
                          className="text-xs p-1 bg-blue-600 text-white rounded truncate mb-1"
                        >
                          {new Date(appointment.appointmentDate).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} - {appointment.title}
                        </div>
                      ))}
                      {dayAppointments.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayAppointments.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">
              {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Select a date'}
            </h3>
          </div>

          {selectedDate && (
            <div className="space-y-3">
              {selectedDateAppointments.length > 0 ? (
                selectedDateAppointments.map(appointment => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  return (
                    <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(appointment.appointmentDate).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{patient?.name}</p>
                      <p className="text-sm text-gray-500">{appointment.description}</p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No appointments scheduled for this date
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;