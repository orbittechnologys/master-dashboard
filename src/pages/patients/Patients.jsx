import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import loading from "../../assets/lottie-json/Loading.json";
import Lottie from "lottie-react";
import CustTable from "../components/CustTable";
export default function Patients() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const lottieRef = useRef();
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5); // Half the normal speed
    }
  }, []);
  // Dummy Patients Data
  const patients = [
    {
      opid: "OP001",
      name: "Amit Sharma",
      age: 42,
      gender: "Male",
      phone: "9876543210",
      lastVisit: "2025-07-15",
      phi: "Diabetes",
      totalAppts: 8,
    },
    {
      opid: "OP002",
      name: "Priya Iyer",
      age: 29,
      gender: "Female",
      phone: "9123456780",
      lastVisit: "2025-06-28",
      phi: "Fever",
      totalAppts: 3,
    },
    {
      opid: "OP003",
      name: "Rohit Verma",
      age: 35,
      gender: "Male",
      phone: "9812345678",
      lastVisit: "2025-05-20",
      phi: "Hypertension",
      totalAppts: 5,
    },
    {
      opid: "OP004",
      name: "Sneha Reddy",
      age: 26,
      gender: "Female",
      phone: "9988776655",
      lastVisit: "2025-07-02",
      phi: "Viral Infection",
      totalAppts: 2,
    },
    {
      opid: "OP005",
      name: "Arjun Nair",
      age: 40,
      gender: "Male",
      phone: "9876123450",
      lastVisit: "2025-06-10",
      phi: "Asthma",
      totalAppts: 7,
    },
    {
      opid: "OP006",
      name: "Meera Gupta",
      age: 33,
      gender: "Female",
      phone: "9765432109",
      lastVisit: "2025-05-29",
      phi: "Thyroid",
      totalAppts: 4,
    },
    {
      opid: "OP007",
      name: "Karan Singh",
      age: 37,
      gender: "Male",
      phone: "9823456712",
      lastVisit: "2025-07-05",
      phi: "Fever",
      totalAppts: 6,
    },
    {
      opid: "OP008",
      name: "Neha Menon",
      age: 31,
      gender: "Female",
      phone: "9898765432",
      lastVisit: "2025-06-15",
      phi: "Migraine",
      totalAppts: 3,
    },
    {
      opid: "OP009",
      name: "Vikram Patil",
      age: 45,
      gender: "Male",
      phone: "9753124680",
      lastVisit: "2025-07-08",
      phi: "Diabetes",
      totalAppts: 9,
    },
    {
      opid: "OP010",
      name: "Ritu Kapoor",
      age: 28,
      gender: "Female",
      phone: "9811112233",
      lastVisit: "2025-07-01",
      phi: "Fever",
      totalAppts: 2,
    },
    {
      opid: "OP011",
      name: "Anil Joshi",
      age: 50,
      gender: "Male",
      phone: "9722223344",
      lastVisit: "2025-05-18",
      phi: "Heart Disease",
      totalAppts: 10,
    },
    {
      opid: "OP012",
      name: "Pooja Desai",
      age: 34,
      gender: "Female",
      phone: "9844556677",
      lastVisit: "2025-06-12",
      phi: "Thyroid",
      totalAppts: 5,
    },
    {
      opid: "OP013",
      name: "Suresh Kumar",
      age: 39,
      gender: "Male",
      phone: "9812349876",
      lastVisit: "2025-07-06",
      phi: "Viral Infection",
      totalAppts: 4,
    },
    {
      opid: "OP014",
      name: "Lakshmi Pillai",
      age: 41,
      gender: "Female",
      phone: "9878901234",
      lastVisit: "2025-06-09",
      phi: "Arthritis",
      totalAppts: 6,
    },
    {
      opid: "OP015",
      name: "Rahul Chawla",
      age: 36,
      gender: "Male",
      phone: "9765123489",
      lastVisit: "2025-07-10",
      phi: "Asthma",
      totalAppts: 3,
    },
  ];
  const filteredPatients = patients.filter((p) =>
    Object.values(p).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );
  // Define table columns
  const columns = [
    { key: "opid", label: "OPID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "phone", label: "Phone" },
    { key: "lastVisit", label: "Last Visit" },
    { key: "phi", label: "PHI" },
    { key: "totalAppts", label: "Total Appts" },
  ];
  // Define table actions
  const actions = [
    {
      label: "View Details",
      icon: (
        <ArrowRight size={18} className="text-[#4DB6AC] hover:text-[#399D94]" />
      ),
      onClick: (patient) => setSelectedPatient(patient),
    },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Patients</h1>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
        />
      </div>
      {/* Table using CustTable */}
      <div className="rounded-lg overflow-hidden">
        <CustTable
          columns={columns}
          data={filteredPatients}
          actions={actions}
          rowsPerPage={10}
        />
      </div>
      {/* Popup */}
      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <button
              onClick={() => setSelectedPatient(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h1 className="text-xl font-semibold mb-2">
              Summarizing Patient Profile
            </h1>
            <h2 className="text-lg font-semibold mb-2">
              {selectedPatient.name}
            </h2>
            <Lottie
              lottieRef={lottieRef}
              animationData={loading}
              loop
              autoplay
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-sm text-center text-gray-600 mb-4">
              Coming soon — Powered by{" "}
              <span className="font-semibold text-[#4DB6AC]">Orbit AI</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
