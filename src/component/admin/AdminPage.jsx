import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../config';
import axios from 'axios';
import { 
  FaUsers, 
  FaUserMd, 
  FaCalendarCheck, 
  FaMoneyBillWave,
  FaUserPlus,
  FaStethoscope,
  FaHospital,
  FaChartLine,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaStar,
  FaAmbulance,
  FaPills,
  FaHeartbeat,
  FaSyringe,
  FaFileMedical,
  FaProcedures,
  FaUserInjured,
  FaPrescription,
  FaClipboardList,
  FaWheelchair,
  FaNotesMedical,
  FaMicroscope,
  FaXRay
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    newPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalDepartments: 0,
    activeDoctors: 0,
    inactiveDoctors: 0,
    totalPrescriptions: 0,
    totalMedicalRecords: 0,
    emergencyCases: 0,
    criticalPatients: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [doctorPerformance, setDoctorPerformance] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch all data in parallel
      const [
        doctorsRes,
        patientsRes,
        appointmentsRes,
        revenueRes,
        monthlyStatsRes,
        departmentsRes,
        activitiesRes
      ] = await Promise.all([
        axios.get(apiBaseUrl + '/doctors'),
        axios.get(apiBaseUrl + '/patients'),
        axios.get(apiBaseUrl + '/appointments'),
        axios.get(apiBaseUrl + '/revenue'),
        axios.get(apiBaseUrl + '/monthly-stats'),
        axios.get(apiBaseUrl + '/departments'),
        axios.get(apiBaseUrl + '/recent-activities')
      ]);

      // Process data
      const doctors = doctorsRes.data.data || [];
      const patients = patientsRes.data.data || [];
      const appointments = appointmentsRes.data.data || [];
      
      const today = new Date().toDateString();
      const todayAppointments = appointments.filter(apt => 
        new Date(apt.date).toDateString() === today
      );

      setStats({
        totalDoctors: doctors.length,
        totalPatients: patients.length,
        totalAppointments: appointments.length,
        totalRevenue: revenueRes.data.total || 0,
        newPatients: patients.filter(p => {
          const days = (Date.now() - new Date(p.created_at).getTime()) / (1000 * 60 * 60 * 24);
          return days <= 7;
        }).length,
        todayAppointments: todayAppointments.length,
        pendingAppointments: appointments.filter(apt => apt.status === 'pending').length,
        completedAppointments: appointments.filter(apt => apt.status === 'completed').length,
        totalDepartments: departmentsRes.data.length || 0,
        activeDoctors: doctors.filter(d => d.status === 1).length,
        inactiveDoctors: doctors.filter(d => d.status === 0).length,
        totalPrescriptions: 0,
        totalMedicalRecords: 0,
        emergencyCases: 0,
        criticalPatients: 0
      });

      setAppointmentData(appointments.slice(0, 10));
      setDepartmentData(departmentsRes.data || []);
      setMonthlyData(monthlyStatsRes.data || generateMonthlyData());
      setRecentActivities(activitiesRes.data || generateRecentActivities());
      setDoctorPerformance(doctors.slice(0, 5).map(d => ({
        name: d.name,
        patients: Math.floor(Math.random() * 50) + 10,
        rating: (Math.random() * 2 + 3).toFixed(1)
      })));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data if API fails
      setStats({
        totalDoctors: 25,
        totalPatients: 1250,
        totalAppointments: 350,
        totalRevenue: 125000,
        newPatients: 45,
        todayAppointments: 18,
        pendingAppointments: 32,
        completedAppointments: 280,
        totalDepartments: 12,
        activeDoctors: 20,
        inactiveDoctors: 5,
        totalPrescriptions: 890,
        totalMedicalRecords: 3200,
        emergencyCases: 15,
        criticalPatients: 8
      });
      setAppointmentData(generateAppointmentData());
      setDepartmentData(generateDepartmentData());
      setMonthlyData(generateMonthlyData());
      setRecentActivities(generateRecentActivities());
      setLoading(false);
    }
  };

  // Mock data generators
  const generateAppointmentData = () => {
    return [
      { time: '9:00 AM', patients: 4 },
      { time: '10:00 AM', patients: 3 },
      { time: '11:00 AM', patients: 5 },
      { time: '12:00 PM', patients: 2 },
      { time: '2:00 PM', patients: 4 },
      { time: '3:00 PM', patients: 6 },
      { time: '4:00 PM', patients: 3 }
    ];
  };

  const generateDepartmentData = () => {
    return [
      { name: 'Cardiology', patients: 45 },
      { name: 'Neurology', patients: 30 },
      { name: 'Orthopedics', patients: 25 },
      { name: 'Pediatrics', patients: 38 },
      { name: 'Dermatology', patients: 20 },
      { name: 'Gynecology', patients: 28 }
    ];
  };

  const generateMonthlyData = () => {
    return [
      { month: 'Jan', patients: 65, appointments: 40 },
      { month: 'Feb', patients: 75, appointments: 45 },
      { month: 'Mar', patients: 85, appointments: 55 },
      { month: 'Apr', patients: 70, appointments: 48 },
      { month: 'May', patients: 90, appointments: 60 },
      { month: 'Jun', patients: 95, appointments: 68 },
      { month: 'Jul', patients: 80, appointments: 50 },
      { month: 'Aug', patients: 100, appointments: 72 },
      { month: 'Sep', patients: 110, appointments: 78 },
      { month: 'Oct', patients: 95, appointments: 65 },
      { month: 'Nov', patients: 85, appointments: 55 },
      { month: 'Dec', patients: 78, appointments: 48 }
    ];
  };

  const generateRecentActivities = () => {
    const activities = [
      { id: 1, icon: 'user', text: 'New patient registered: John Doe', time: '5 mins ago', type: 'patient' },
      { id: 2, icon: 'calendar', text: 'Appointment scheduled with Dr. Smith', time: '15 mins ago', type: 'appointment' },
      { id: 3, icon: 'money', text: 'Payment received: $250', time: '30 mins ago', type: 'payment' },
      { id: 4, icon: 'doctor', text: 'Dr. Johnson updated patient records', time: '1 hour ago', type: 'doctor' },
      { id: 5, icon: 'prescription', text: 'New prescription issued for Jane Doe', time: '2 hours ago', type: 'prescription' }
    ];
    return activities;
  };

  const StatCard = ({ icon, title, value, color, subtitle }) => (
    <div className="col-lg-3 col-6">
      <div className={`small-box bg-${color}`}>
        <div className="inner">
          <h3>{value}</h3>
          <p>{title}</p>
     
        </div>
        <div className="icon">
          <i className={`fas fa-${icon}`}></i>
        </div>
        <a href="#" className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right" />
        </a>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Dashboard</h1>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2">Loading dashboard data...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-sm-6">
              <h1 className="m-0">
                <FaHeartbeat className="text-danger mr-2" />
                Medical Dashboard
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          {/* Statistics Cards */}
          <div className="row">
            <StatCard 
              icon="user-md" 
              title="Total Doctors" 
              value={stats.totalDoctors} 
              color="info"
              subtitle={`${stats.activeDoctors} Active`}
            />
            <StatCard 
              icon="users" 
              title="Total Patients" 
              value={stats.totalPatients} 
              color="success"
              subtitle={`${stats.newPatients} New this week`}
            />
            <StatCard 
              icon="calendar-check" 
              title="Appointments" 
              value={stats.totalAppointments} 
              color="warning"
              subtitle={`${stats.todayAppointments} Today`}
            />
            <StatCard 
              icon="money-bill-wave" 
              title="Revenue" 
              value={`$${stats.totalRevenue.toLocaleString()}`} 
              color="danger"
            />
          </div>

          {/* Second Row of Stats */}
          <div className="row">
            <StatCard 
              icon="clipboard-list" 
              title="Pending Appointments" 
              value={stats.pendingAppointments} 
              color="secondary"
            />
            <StatCard 
              icon="check-double" 
              title="Completed Appointments" 
              value={stats.completedAppointments} 
              color="success"
            />
            <StatCard 
              icon="hospital" 
              title="Departments" 
              value={stats.totalDepartments} 
              color="info"
            />
            <StatCard 
              icon="ambulance" 
              title="Emergency Cases" 
              value={stats.emergencyCases} 
              color="danger"
            />
          </div>

          {/* Charts Row */}
          <div className="row">
            {/* Monthly Statistics Chart */}
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <FaChartLine className="text-primary mr-2" />
                    Monthly Statistics
                  </h3>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="patients" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="appointments" 
                        stackId="1"
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Department Distribution */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <FaHospital className="text-info mr-2" />
                    Department Stats
                  </h3>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="patients"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][index % 6]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities and Doctor Performance */}
        

          {/* Quick Actions */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <FaProcedures className="text-success mr-2" />
                    Quick Actions
                  </h3>
                </div>
                <div className="card-body belos">
                  <div className="row">
                    <div className="col-md-2 col-6">
                      <a href="#" className="mts btn btn-info btn-block btn-lg">
                        <FaUserPlus className="d-block mb-1" />
                        New Patient
                      </a>
                    </div>
                    <div className="col-md-2 col-6">
                      <a href="#" className="mts btn btn-success btn-block btn-lg">
                        <FaCalendarCheck className="d-block mb-1" />
                        Book Appointment
                      </a>
                    </div>
                    <div className="col-md-2 col-6">
                      <a href="#" className="mts btn btn-warning btn-block btn-lg">
                        <FaPrescription className="d-block mb-1" />
                        Prescription
                      </a>
                    </div>
                    <div className="col-md-2 col-6">
                      <a href="#" className="mts btn btn-danger btn-block btn-lg">
                        <FaAmbulance className="d-block mb-1" />
                        Emergency
                      </a>
                    </div>
                    <div className="col-md-2 col-6">
                      <a href="#" className="mts btn btn-primary btn-block btn-lg">
                        <FaFileMedical className="d-block mb-1" />
                        Medical Records
                      </a>
                    </div>
                    <div className="col-md-2 col-6">
                      <a href="#" className="mts btn btn-secondary btn-block btn-lg">
                        <FaClipboardList className="d-block mb-1" />
                        Reports
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;