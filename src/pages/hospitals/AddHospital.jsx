import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
const departmentsList = [
  "General Medicine (Internal Medicine)",
  "Pediatrics (Child Care)",
  "Obstetrics & Gynecology (Women’s Health, Maternity)",
  "Orthopedics (Bone & Joint)",
  "Ophthalmology (Eye)",
  "ENT (Ear, Nose, Throat)",
  "Dermatology (Skin)",
  "Psychiatry (Mental Health)",
  "Dentistry",
  "Cardiology (Heart Specialist)",
  "Pulmonology (Chest/Respiratory)",
  "Urology",
  "Gastroenterology (Stomach & Digestive)",
  "Endocrinology (Hormones, Diabetes)",
  "Nephrology (Kidneys)",
];
export default function AddHospital() {
  const [form, setForm] = useState({
    name: "",
    logo: null,
    description: "",
    departments: [],
    area: "",
    city: "",
    pincode: "",
    pocName: "",
    pocPhone: "",
    pocEmail: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleFileChange = (e) => {
    setForm({ ...form, logo: e.target.files[0] });
  };
  const handleDepartmentChange = (dept) => {
    setForm((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }));
  };
  const handleSubmit = () => {
    setShowConfirm(false);
    console.log("Hospital Added:", form);
    alert("Hospital Added Successfully (Dummy Action)");
  };
  return (
    <div className="p-6 bg-[] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Hospital</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospital Name */}
        <div>
          <label className="block mb-1 font-medium">Hospital Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>
        {/* Hospital Logo */}
        <div>
          <label className="block mb-1 font-medium">Hospital Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            maxLength={500}
            onChange={handleChange}
            placeholder="Max 100 words..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-[#4DB6AC] outline-none"
          />
        </div>
        {/* Departments Multi Select */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">Departments</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {departmentsList.map((dept) => (
              <label key={dept} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.departments.includes(dept)}
                  onChange={() => handleDepartmentChange(dept)}
                />
                <span className="text-sm">{dept}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Address Details Heading */}
        <div className="md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Address Details
          </h2>
        </div>
        <div>
          <label className="block mb-1 font-medium">Area</label>
          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        {/* POC Details Heading */}
        <div className="md:col-span-2 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Hospital Admin / POC Details
          </h2>
        </div>
        <div>
          <label className="block mb-1 font-medium">POC Name</label>
          <input
            type="text"
            name="pocName"
            value={form.pocName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">POC Phone</label>
          <input
            type="tel"
            name="pocPhone"
            value={form.pocPhone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">POC Email</label>
          <input
            type="email"
            name="pocEmail"
            value={form.pocEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-6 py-2 bg-[#4DB6AC] hover:bg-[#399D94] text-white rounded-lg shadow transition"
        >
          <PlusCircle size={18} /> Add Hospital
        </button>
      </div>
      {/* Confirm Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">Confirm Add Hospital</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to add this hospital?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#4DB6AC] hover:bg-[#399D94] text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
