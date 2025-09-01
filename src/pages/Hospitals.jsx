import { useState } from "react";
import { Search, Phone, Mail, Plus } from "lucide-react";
import manipal from "@/assets/manipal.jpg";
import sakra from "@/assets/sakra.webp";
import suchirayu from "@/assets/suchirayu.png"
import hssh from "@/assets/hssh.png";
import { useNavigate } from "react-router-dom";

const hospitalsData = [
  {
    id: 1,
    name: "Manipal Hospital",
    address: "Old Airport Road, Hebbal, Varthur Road",
    city: "Bangalore",
    logo: manipal,
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 2,
    name: "Apollo Hospital",
    address: "Bannerghatta Road",
    city: "Bangalore",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Apollo_Hospitals_Logo.svg/800px-Apollo_Hospitals_Logo.svg.png",
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 3,
    name: "Aster CMI Hospital",
    address: "Hebbal",
    city: "Bangalore",
    logo: "https://www.practo.com/consumer-ui/_next/image?url=https%3A%2F%2Fimages1-fabric.practo.com%2Fpractices%2F1146244%2Faster-cmi-hospital-bangalore-5915951d6f98b.jpg&w=3840&q=75",
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 4,
    name: "Fortis Hospital",
    address: "Bannerghatta Road, Cunningham Road",
    city: "Bangalore",
    logo: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/022011/fortis_logo.png?itok=uP3_kVd8",
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 5,
    name: "Sakra World Hospital",
    address: "Outer Ring Road, Marathahalli",
    city: "Bangalore",
    logo: sakra,
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 6,
    name: "HCG Suchirayu Hospital",
    address: "Gokul Road",
    city: "Hubli",
    logo: suchirayu,
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 7,
    name: "Secure Hospital",
    address: "Gokul Road",
    city: "Hubli",
    logo: "https://www.securehospital.in/wp-content/uploads/2021/07/logo.png",
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 8,
    name: "Karatagi Super Speciality Hospital",
    address: "Dharmaraj, Kotilinga Nagar",
    city: "Hubli",
    logo: "https://karatagihospital.com/images/drramchandra700.jpeg",
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 9,
    name: "Hubli Super Speciality Hospital (HSSH)",
    address: "Opp. KIMS, Vidyanagar, Unkal",
    city: "Hubli",
    logo: hssh,
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
  {
    id: 10,
    name: "Sushruta Multispeciality Hospital (NABH)",
    address: "Near Shrayyasinagar, Vidyanagar",
    city: "Hubli",
    logo: "https://sushrutahospitals.com/media/images/logo.png",
    phone: "+91 9660887107",
    email: "contact@citycare.com",
    appointments: 240,
  },
];

export default function Hospital() {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = ["All", ...new Set(hospitalsData.map((h) => h.city))];

  const filteredHospitals = hospitalsData.filter((h) => {
    const matchesSearch = h.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity =
      selectedCity === "" || selectedCity === "All" || h.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
   <div className="flex flex-col min-h-screen p-4 md:p-6 bg-[#f9fdfc] w-full">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
      All Hospitals
    </h1>
    <button
      onClick={() => navigate("/addhospital")}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4db6ac] hover:bg-[#399d94] text-white rounded-lg shadow transition w-full sm:w-auto"
    >
      <Plus size={18} /> Add Hospital
    </button>
  </div>

  {/* Search + Filter */}
  <div className="flex flex-col md:flex-row gap-4 mb-6">
    <div className="relative flex-1">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search hospitals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4db6ac] focus:outline-none text-sm"
      />
    </div>
    <select
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4db6ac] focus:outline-none text-sm w-full md:w-auto"
    >
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

  {/* Hospital Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 flex-1 overflow-y-auto">
    {filteredHospitals.map((hospital) => (
      <div
        key={hospital.id}
        className="flex flex-col sm:flex-row bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
      >
        {/* Logo Section */}
        <div className="flex-shrink-0 w-full sm:w-1/3 bg-gray-50 flex items-center justify-center p-4">
          <img
            src={hospital.logo}
            alt={hospital.name}
            className="h-20 sm:h-24 w-auto object-contain"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between p-4 flex-1">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-gray-800">
              {hospital.name}
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              {hospital.address}
            </p>
            <p className="text-xs md:text-sm mt-1 text-gray-600">
              Total Appointments:{" "}
              <span className="font-medium">{hospital.appointments}</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <a
              href={`tel:${hospital.phone}`}
              className="flex items-center gap-1 px-3 py-1 bg-[#4db6ac] text-white rounded-lg text-sm hover:bg-[#399d94] transition w-full sm:w-auto justify-center"
            >
              <Phone size={14} /> Call
            </a>
            <a
              href={`mailto:${hospital.email}`}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition w-full sm:w-auto justify-center"
            >
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
