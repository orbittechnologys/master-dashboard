import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import axios from "axios";
import loading from "../../assets/lottie-json/Loading.json";
import Lottie from "lottie-react";
import CustTable from "../components/CustTable";
import { BASE_URL } from "../../constants";

export default function Patients() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5); // Half the normal speed
    }
  }, []);

  // Fetch patients data from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get token from sessionStorage
        const token = sessionStorage.getItem("authToken");
        
        if (!token) {
          setError("Authentication token not found. Please login again.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/patient/fetchAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (response.data.success) {
          // Transform API data to match the table format
          const transformedData = response.data.data.map(patient => ({
            id: patient.id,
            opid: patient.OPID,
            name: `${patient.firstName} ${patient.lastName}`,
            age: patient.age,
            gender: patient.gender,
            phone: patient.emergencyContact?.phone || "N/A",
            lastVisit: "N/A", // Not provided in API response
            phi: "N/A", // Not provided in API response
            totalAppts: "N/A", // Not provided in API response
            // Keep original data for detailed view
            originalData: patient
          }));
          setPatients(transformedData);
        } else {
          setError("Failed to fetch patients data");
        }
      } catch (err) {
        // Handle authentication errors specifically
        if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
          // Optionally redirect to login
          // navigate("/login");
        } else {
          setError(err.response?.data?.message || err.response?.data?.msg || "Error fetching patients data");
        }
        console.error("Error fetching patients:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

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

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 bg-background min-h-screen mt-16 flex items-center justify-center">
        <div className="text-center">
          <Lottie
            animationData={loading}
            loop
            autoplay
            style={{ width: "200px", height: "200px" }}
          />
          <p className="text-gray-600 mt-4">Loading patients...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-background min-h-screen mt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#4DB6AC] text-white px-4 py-2 rounded-lg hover:bg-[#399D94]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen mt-16">
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
        {patients.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No patients found.
          </div>
        ) : (
          <CustTable
            columns={columns}
            data={filteredPatients}
            actions={actions}
            rowsPerPage={10}
          />
        )}
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
            
            {/* Display additional patient info if available */}
            {selectedPatient.originalData && (
              <div className="mb-4 text-sm text-gray-600">
                <p><strong>Blood Group:</strong> {selectedPatient.originalData.bloodGroup}</p>
                <p><strong>DOB:</strong> {new Date(selectedPatient.originalData.DOB).toLocaleDateString()}</p>
                <p><strong>Address:</strong> {selectedPatient.originalData.address?.city}, {selectedPatient.originalData.address?.state}</p>
                <p><strong>Emergency Contact:</strong> {selectedPatient.originalData.emergencyContact?.name} ({selectedPatient.originalData.emergencyContact?.relation})</p>
              </div>
            )}
            
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