import { Home, Building2, Users, Settings, Calendar, DollarSign, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

function Dashboard() {


  const barData = [
    { name: "Jan", appointments: 400 },
    { name: "Feb", appointments: 320 },
    { name: "Mar", appointments: 500 },
    { name: "Apr", appointments: 450 },
  ];

  const pieData = [
    { name: "General", value: 400 },
    { name: "Emergency", value: 300 },
    { name: "Surgery", value: 300 },
    { name: "Diagnostics", value: 200 },
  ];

  const topHospitalsData = [
    { name: "CityCare Hospital", appointments: 320 },
    { name: "Green Valley Health", appointments: 280 },
    { name: "Sunrise Medical", appointments: 250 },
    { name: "Hopewell Clinic", appointments: 200 },
  ];

  const COLORS = ["#4DB6AC", "#81C784", "#64B5F6", "#FFD54F"];

  const DashboardContent = () => (
    <div className="p-6 flex flex-col gap-6 w-full">
      {/* Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-[#4DB6AC]">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hospitals Onboarded</p>
              <h2 className="text-3xl font-bold">128</h2>
            </div>
            <Building2 size={36} className="text-[#4DB6AC]"/>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-[#64B5F6]">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Appointments</p>
              <h2 className="text-3xl font-bold">5,432</h2>
            </div>
            <Calendar size={36} className="text-[#64B5F6]"/>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-[#FFD54F]">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <h2 className="text-3xl font-bold">86</h2>
            </div>
            <Users size={36} className="text-[#FFD54F]"/>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl p-4 border-t-4 border-[#81C784]">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h2 className="text-3xl font-bold">$12,840</h2>
            </div>
            <DollarSign size={36} className="text-[#81C784]"/>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-4 shadow-md rounded-2xl col-span-2">
          <h3 className="text-lg font-semibold mb-4">Appointments Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#888"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="appointments" fill="#4DB6AC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 shadow-md rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">Appointment Types</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Hospitals */}
      <Card className="p-4 shadow-md rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Award size={20} className="text-[#4DB6AC]"/> Top Hospitals by Appointment Count</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topHospitalsData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name"/>
            <Tooltip/>
            <Bar dataKey="appointments" fill="#64B5F6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f9fdfc]">
       <DashboardContent />
    </div>
  );
}

export default Dashboard;