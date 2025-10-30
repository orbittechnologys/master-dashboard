import { useState, useEffect } from "react";
import axios from "axios";
import { Hospital } from "lucide-react";
import { BASE_URL } from "../../constants";
import CustTable from "../components/CustTable";

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
  </div>
);

const Dashboard = () => {
  const token = sessionStorage.getItem("authToken");

  const [hospitalCount, setHospitalCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const columns = [
    { key: "hospitalName", label: "Hospital Name" },
    { key: "totalAppointments", label: "Appointments" },
    { key: "uniquePatientsCount", label: "Patients" },
  ];

  // 🔹 Fetch total hospitals
  useEffect(() => {
    const fetchHospitalCount = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/hospital/fetchAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.data.success) {
          setHospitalCount(res.data.pagination.total);
        }
      } catch (err) {
        console.error("Error fetching hospital count:", err);
      }
    };

    fetchHospitalCount();
  }, [token]);

  const fetchHospitalStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/appointment/getHospitalPatientStats?filter=${filter}&page=${page}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success && Array.isArray(res.data.data)) {
        setTableData(res.data.data);
        setTotalPages(res.data.pagination?.totalPages || 1);
      } else {
        setTableData([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching hospital stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalStats();
  }, [filter, page]);

  const filters = ["all", "today", "week", "month", "quarter", "year"];

  return (
    <div className="p-6 bg-background min-h-screen mt-16">
      <h2 className="mb-5 text-gray-800 font-semibold text-xl">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <CustStatsCard
          title="Hospitals Onboarded"
          count={hospitalCount}
          icon={<Hospital strokeWidth={1.25} />}
          iconColor="text-[#287FC4]"
          iconBg="bg-[#287FC4]/20"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setPage(1);
            }}
            className={`px-4 py-2 text-sm rounded-md border transition ${
              filter === f
                ? "bg-primary text-white border-pribg-primary"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-10 text-gray-500">
          Loading data...
        </div>
      ) : (
        <CustTable
          columns={columns}
          data={tableData}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default Dashboard;
