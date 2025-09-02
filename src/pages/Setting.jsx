import { useState } from "react";
import CustModal from "./components/CustModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
export default function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // :eye: toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    console.log("Deleting ID:", selectedRow?.id);
    setIsModalOpen(false);
    setSelectedRow(null);
  };
  const formik = useFormik({
    initialValues: { password: "", confirm: "" },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number"),
      confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert("Password changed (mock)");
      console.log("New password:", values.password);
      resetForm();
    },
  });
  return (
    <div className="overflow-x-hidden mt-16 p-6">
      <div className="mx-auto">
        <h1 className="text-xl leading-tight text-[#000000] font-semibold mb-8">
          Settings
        </h1>
        <div className="grid grid-cols-12 gap-x-10">
          <section className="col-span-12 md:col-span-6 lg:col-span-6">
            <h2 className="text-lg font-medium text-gray-900 mb-5">
              Change Password
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Password field */}
              <div className="relative w-[90%] max-w-[280px] md:w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter New Password"
                  className={`w-full h-11 px-4 pr-10 rounded-md border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-400"
                      : "border-gray-300"
                  } bg-white placeholder-[#495057] text-[#495057] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-6 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              {/* Confirm Password field */}
              <div className="relative w-[90%] max-w-[280px] md:w-full">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Re-Enter New Password"
                  className={`w-full h-11 px-4 pr-10 rounded-md border ${
                    formik.touched.confirm && formik.errors.confirm
                      ? "border-red-400"
                      : "border-gray-300"
                  } bg-white placeholder-[#495057] text-[#495057] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-6 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                {formik.touched.confirm && formik.errors.confirm && (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.confirm}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-md px-5 py-2 bg-primary hover:bg-teal-600 text-white text-sm font-medium shadow-sm transition"
              >
                Change Password
              </button>
            </form>
          </section>
          {/* Divider */}
          <div className="col-span-12 border-t border-[#E1E1E1] my-10" />
          {/* Delete Account */}
          <div className="col-span-12 md:col-span-4">
            <button
              onClick={handleDeleteClick}
              className="rounded-md border-2 border-red-300 text-red-500 px-4 py-2 text-sm font-medium hover:bg-red-400 hover:text-white transition text-nowrap"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <CustModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
}
