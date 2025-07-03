import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText,
  UserCircle
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const adminNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/patients', icon: Users, label: 'Patients' },
    { to: '/appointments', icon: FileText, label: 'Appointments' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
  ];

  const patientNavItems = [
    { to: '/patient-dashboard', icon: LayoutDashboard, label: 'My Dashboard' },
    { to: '/my-appointments', icon: FileText, label: 'My Appointments' },
    { to: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  const navItems = user?.role === 'Admin' ? adminNavItems : patientNavItems;

  return (
    <div className="w-64 bg-gray-50 min-h-screen border-r border-gray-200">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;