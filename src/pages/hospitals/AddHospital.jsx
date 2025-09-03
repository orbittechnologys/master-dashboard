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
  const [errors, setErrors] = useState({});

  // Regex patterns
  const regex = {
    pincode: /^[1-9][0-9]{5}$/, // Indian Pincode (6 digits)
    phone: /^[6-9]\d{9}$/, // Indian phone numbers (10 digits starting 6-9)
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email regex
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
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

  const validateForm = () => {
    let newErrors = {};

    if (!regex.pincode.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }
    if (!regex.phone.test(form.pocPhone)) {
      newErrors.pocPhone = "Enter a valid 10-digit phone number";
    }
    if (!regex.email.test(form.pocEmail)) {
      newErrors.pocEmail = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setShowConfirm(false);
    console.log("Hospital Added:", form);
    alert("Hospital Added Successfully (Dummy Action)");
  };

  return (
    <div className="mt-16 min-h-screen">
      <div className="mx-auto shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-teal-700 border-b pb-3">
          Add Hospital
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hospital Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Hospital Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          {/* Hospital Logo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Hospital Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              maxLength={500}
              onChange={handleChange}
              placeholder="Max 100 words..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          {/* Departments Multi Select */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">
              Departments
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
              {departmentsList.map((dept) => (
                <label key={dept} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.departments.includes(dept)}
                    onChange={() => handleDepartmentChange(dept)}
                  />
                  <span className="text-sm text-gray-700">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Address Details Heading */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Address Details
            </h2>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* POC Details Heading */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Hospital Admin / POC Details
            </h2>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              POC Name
            </label>
            <input
              type="text"
              name="pocName"
              value={form.pocName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              POC Phone
            </label>
            <input
              type="tel"
              name="pocPhone"
              value={form.pocPhone}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.pocPhone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.pocPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.pocPhone}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              POC Email
            </label>
            <input
              type="email"
              name="pocEmail"
              value={form.pocEmail}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.pocEmail ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.pocEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.pocEmail}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md transition"
          >
            <PlusCircle size={18} /> Add Hospital
          </button>
        </div>
      </div>

      {/* Confirm Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Add Hospital
            </h2>
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
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
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
