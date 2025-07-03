import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Activity, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const adminCredentials = [
    { role: 'Admin', name: 'Dr. Sarah Johnson', email: 'admin@entnt.in', password: 'admin123' },
    { role: 'Admin', name: 'Dr. Rahul Gupta', email: 'dr.rahul@entnt.in', password: 'dental123' },
    { role: 'Admin', name: 'Dr. Asif Naqvi', email: 'asifnaqvi64@entnt.in', password: 'dental123' },
  ];

  const patientCredentials = [
    { role: 'Patient', name: 'Vikas Gupta', email: 'vikasgup074@entnt.in', password: 'patient123' },
    { role: 'Patient', name: 'Jane Smith', email: 'jane@entnt.in', password: 'patient123' },
    { role: 'Patient', name: 'Mike Johnson', email: 'mike@entnt.in', password: 'patient123' },
    { role: 'Patient', name: 'Sarah Joseph', email: 'sarah@entnt.in', password: 'patient123' },
    { role: 'Patient', name: 'David Brown', email: 'david@entnt.in', password: 'patient123' },
    { role: 'Patient', name: 'Lisa Davis', email: 'lisa@entnt.in', password: 'patient123' },
    { role: 'Patient', name: 'Robert Miller', email: 'robert@entnt.in', password: 'patient123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Activity className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Dental Center
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Credentials (Dental Professionals)</h3>
            <div className="space-y-3">
              {adminCredentials.map((cred, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900">{cred.name}</p>
                  <p className="text-xs text-blue-700 mt-1">
                    <span className="font-medium">Email:</span> {cred.email}
                  </p>
                  <p className="text-xs text-blue-700">
                    <span className="font-medium">Password:</span> {cred.password}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Credentials</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {patientCredentials.map((cred, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-900">{cred.name}</p>
                  <p className="text-xs text-green-700 mt-1">
                    <span className="font-medium">Email:</span> {cred.email}
                  </p>
                  <p className="text-xs text-green-700">
                    <span className="font-medium">Password:</span> {cred.password}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Note:</span> All patient accounts use the same password for demo purposes. 
              Admin accounts have different passwords for security demonstration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;