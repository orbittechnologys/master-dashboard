import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserDoctor } from "react-icons/fa6";

import {
  BadgeIndianRupee,
  ClipboardClock,
  IdCard,
  Network,
  Award,
  Hospital,
  CalendarDays,
  Banknote,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BASE_URL } from "../../constants";

const CustStatsCard = ({
  title,
  count,
  icon,
  iconColor,
  iconBg,
  isCurrency = false,
}) => (
  <div className="bg-white shadow-sm p-8 border border-gray-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-semibold">{title}</p>
        <h3 className="text-2xl font-bold mt-2">
          {isCurrency ? `₹${count.toLocaleString()}` : count.toLocaleString()}
        </h3>
      </div>
      <div className={`rounded-sm p-2 ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
    </div>
    {/* <a
      href={linkTo}
      className="text-blue-600 text-sm mt-4 inline-block hover:underline"
    >
      {linkText} →
    </a> */}
  </div>
);

const Dashboard = () => {
  // Data for charts
  const areaChartData = [
    { name: "Jan", appointments: 400, revenue: 2400 },
    { name: "Feb", appointments: 300, revenue: 1398 },
    { name: "Mar", appointments: 200, revenue: 9800 },
    { name: "Apr", appointments: 278, revenue: 3908 },
    { name: "May", appointments: 189, revenue: 4800 },
    { name: "Jun", appointments: 239, revenue: 3800 },
    { name: "Jul", appointments: 349, revenue: 4300 },
  ];

  const barData = [
    { name: "Cardiology", appointments: 400 },
    { name: "Dermatology", appointments: 320 },
    { name: "Neurology", appointments: 500 },
    { name: "Pediatrics", appointments: 450 },
    { name: "Orthopedics", appointments: 380 },
  ];

  const pieData = [
    { name: "Completed", value: 75 },
    { name: "Scheduled", value: 15 },
    { name: "Cancelled", value: 10 },
  ];

  const COLORS = ["#4DB6AC", "#64B5F6", "#EF4256"];
  const token = sessionStorage.getItem("authToken");

  const [hospitalCount, setHospitalCount] = useState(0);


useEffect(() => {
  const fetchHospitalData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}hospital/fetchAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setHospitalCount(response.data.pagination.total);
      }

      console.log("Hospital data:", response.data);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  fetchHospitalData();
}, [token]);
  // Table data
  // const columns = [
  //   { key: "name", label: "Doctor Name" },
  //   { key: "qualification", label: "Qualification", className: "text-center" },
  //   { key: "department", label: "Department" },
  //   {
  //     key: "totalAppointments",
  //     label: "Total Appointment",
  //     className: "text-center",
  //   },
  //   { key: "joiningDate", label: "Joining Date", className: "text-center" },
  //   {
  //     key: "yearsinPractice",
  //     label: "Years in Practice",
  //     className: "text-center",
  //   },
  // ];

  return (
    <div className="p-6 bg-background min-h-screen mt-16">
      <h2 className="mb-5 text-gray-800 font-semibold text-xl">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <CustStatsCard
          title="Hospital Onboarded"
          count={hospitalCount} 
          //   linkText="View All Doctors"
          //   linkTo="/alldoctors"
          icon={<Hospital trokeWidth={1.25} />}
          iconColor="text-[#287FC4]"
          iconSize={32}
          iconBg="bg-[#287FC4]/20"
        />

        {/* <CustStatsCard
          title="Total Appointments"
          count={67}
          linkText="View All Appointments"
          linkTo="/allappointments"
          icon={<CalendarDays strokeWidth={1.25} />}
          iconColor="text-[#EE7526]"
          iconSize={32}
          iconBg="bg-[#EE7526]/20"
        />

        <CustStatsCard
          title="Today's Appointments"
          count={217}
          linkText="View All Staff"
          linkTo="/allstaff"
          icon={<IdCard strokeWidth={1.25} />}
          iconColor="text-[#EF4256]"
          iconSize={32}
          iconBg="bg-[#EF4256]/20"
        />

        <CustStatsCard
          title="Revenue"
          count={23}
          linkText="View All Appointments"
          linkTo="/allappointments"
          icon={<Banknote strokeWidth={1.25} />}
          iconColor="text-[#E5AD01]"
          iconSize={32}
          iconBg="bg-[#E5AD01]/20"
        /> */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Area Chart */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award size={20} className="text-blue-500" /> Appointments & Revenue
            Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="appointments"
                stroke="#4DB6AC"
                fill="#4DB6AC"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Appointment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Appointments by Department
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="appointments" fill="#64B5F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Doctors Table */}
    </div>
  );
};

export default Dashboard;
