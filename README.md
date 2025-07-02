# 🦷 Dental Center Management System

<div align="center">

![Dental Center Logo](https://img.shields.io/badge/🦷-Dental%20Center-blue?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

*A comprehensive dental practice management solution built for ENTNT*

</div>

---

## 🌟 Overview

The **Dental Center Management System** is a modern, full-featured web application designed to streamline dental practice operations. Built with React and TypeScript, it provides comprehensive patient management, appointment scheduling, and treatment tracking capabilities for dental professionals and their patients.

### 🎯 Project Goals

- **Efficiency**: Streamline dental practice workflows
- **Accessibility**: Provide easy access to patient information
- **Security**: Implement role-based access control
- **User Experience**: Deliver intuitive interfaces for both staff and patients
- **Scalability**: Built with modern, maintainable technologies

---

## ✨ Key Features

### 👨‍⚕️ **Admin (Dental Professional) Features**

<details>
<summary><strong>🏥 Comprehensive Dashboard</strong></summary>

- **Real-time KPIs**: Patient count, appointments, revenue tracking
- **Quick Stats**: Completed treatments, pending appointments
- **Upcoming Appointments**: Next 10 scheduled appointments
- **Recent Patients**: Latest patient registrations
- **Revenue Analytics**: Monthly and total revenue insights

</details>

<details>
<summary><strong>👥 Patient Management</strong></summary>

- **Complete Patient Profiles**: Personal info, medical history, contact details
- **Health Information Tracking**: Allergies, medications, medical conditions
- **Emergency Contacts**: Quick access to patient emergency information
- **Search & Filter**: Advanced patient search capabilities
- **CRUD Operations**: Add, edit, delete patient records

</details>

<details>
<summary><strong>📅 Appointment & Incident Management</strong></summary>

- **Flexible Scheduling**: Date/time appointment booking
- **Treatment Documentation**: Detailed treatment records
- **Cost Tracking**: Treatment pricing and billing
- **Status Management**: Scheduled → In Progress → Completed workflow
- **File Attachments**: Upload invoices, X-rays, treatment photos
- **Follow-up Scheduling**: Next appointment planning

</details>

<details>
<summary><strong>📆 Interactive Calendar</strong></summary>

- **Monthly View**: Visual appointment overview
- **Day Details**: Click any date to see scheduled treatments
- **Appointment Visualization**: Color-coded appointment status
- **Quick Navigation**: Easy month-to-month browsing

</details>

### 🧑‍💼 **Patient Features**

<details>
<summary><strong>📊 Personal Dashboard</strong></summary>

- **Appointment Overview**: Upcoming and completed treatments
- **Health Summary**: Personal health statistics
- **Cost Tracking**: Treatment expenses and spending history

</details>

<details>
<summary><strong>📋 Appointment History</strong></summary>

- **Complete History**: All past and future appointments
- **Treatment Details**: Comprehensive treatment information
- **File Downloads**: Access to treatment documents and images
- **Status Tracking**: Real-time appointment status updates

</details>

<details>
<summary><strong>👤 Profile Management</strong></summary>

- **Editable Information**: Update personal and contact details
- **Health Information**: Manage allergies and medical conditions
- **Emergency Contacts**: Update emergency contact information

</details>

---

## 🛠️ Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- Modern web browser

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/dental-center-management.git
cd dental-center-management

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser
# Navigate to http://localhost:5173
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 User Interfaces

### 🏥 **Admin Interface**

<details>
<summary><strong>Dashboard Overview</strong></summary>

The admin dashboard provides a comprehensive view of practice operations:

- **Statistics Cards**: Key metrics with trend indicators
- **Upcoming Appointments**: Next 10 scheduled appointments with patient details
- **Recent Patients**: Latest patient registrations
- **Quick Actions**: Fast access to common tasks

</details>

<details>
<summary><strong>Patient Management</strong></summary>

- **Patient Grid**: Card-based layout with essential information
- **Search Functionality**: Real-time search across all patient fields
- **Patient Forms**: Comprehensive forms for adding/editing patients
- **Health Information**: Detailed medical history tracking

</details>

<details>
<summary><strong>Appointment System</strong></summary>

- **Appointment List**: Filterable list with status indicators
- **Scheduling Form**: Comprehensive appointment booking
- **File Management**: Upload and manage treatment documents
- **Status Workflow**: Visual status progression

</details>

### 🧑‍💼 **Patient Interface**

<details>
<summary><strong>Personal Dashboard</strong></summary>

- **Appointment Summary**: Upcoming and completed treatments
- **Health Overview**: Personal statistics and information
- **Quick Access**: Easy navigation to key features

</details>

<details>
<summary><strong>Appointment History</strong></summary>

- **Chronological View**: All appointments in timeline format
- **Treatment Details**: Comprehensive treatment information
- **File Access**: Download treatment documents and images

</details>

---

## 🔧 Technical Implementation

### 🔐 **Authentication System**

### 📊 **State Management**

### 🗄️ **Data Persistence**

### 🛡️ **Security Features**

---

## 📊 Data Management

### 👥 **Patient Data Structure**

### 📅 **Appointment Data Structure**

### 📁 **File Management**

---

## 🔍 **Project Structure**

```
dental-center-management/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Auth/         # Authentication components
│   │   ├── Dashboard/    # Dashboard components
│   │   ├── Layout/       # Layout components
│   │   ├── Patient/      # Patient-specific components
│   │   ├── Patients/     # Patient management
│   │   ├── Appointments/ # Appointment management
│   │   └── Calendar/     # Calendar components
│   ├── context/          # React Context providers
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md            # Project documentation
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📝 **Commit Convention**

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

---

## 📞 **Support & Contact**

- **Email**: vikasgup074@gmail.com
- **Documentation**: This README file

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by Vikas Kumar Gupta**

*Streamlining dental practice management with modern technology*

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

</div>
