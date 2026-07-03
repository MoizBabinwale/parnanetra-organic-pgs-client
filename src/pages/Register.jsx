import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaBuilding, FaUsers, FaLeaf, FaShoppingBasket, FaTractor } from "react-icons/fa";

const categories = [
  { value: "facilitating_agency", label: "सुविधा एजेंसी", eng: "Facilitating Agency", icon: <FaBuilding /> },
  { value: "local_group", label: "स्थानीय समूह", eng: "Local Group", icon: <FaUsers /> },
  { value: "farmer_consumer_group", label: "किसान उपभोक्ता समूह", eng: "Farmer Consumer Group", icon: <FaLeaf /> },
  { value: "farmer_member", label: "किसान सदस्य", eng: "Farmer Member", icon: <FaTractor /> },
  { value: "consumer_member", label: "उपभोक्ता सदस्य", eng: "Consumer Member", icon: <FaShoppingBasket /> },
];

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedCategory = searchParams.get("category");
  const { register } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    category: preSelectedCategory || "",
    organizationName: "",
    registrationNumber: "",
    address: "",
    village: "",
    district: "",
    state: "Maharashtra",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.password) {
      setError("कृपया सभी आवश्यक फील्ड भरें (Please fill all required fields)");
      return false;
    }
    if (formData.password.length < 6) {
      setError("पासवर्ड कम से कम 6 अक्षर का होना चाहिए");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("पासवर्ड मेल नहीं खाते (Passwords don't match)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = formData;
      // If no category selected, default to "user"
      if (!submitData.category) submitData.category = "user";

      await register(submitData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "पंजीकरण विफल! (Registration failed)");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (cat) => {
    const found = categories.find((c) => c.value === cat);
    return found?.icon || <FaUser />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">पंजीकरण (Registration)</h1>
          <p className="text-green-600 mt-1">Parnanetra Organic PGS - नया खाता बनाएं</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-green-700 px-6 py-4">
            <div className="flex items-center justify-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-white text-green-700" : "bg-green-600 text-green-200"}`}>1</div>
              <div className="w-16 h-0.5 bg-green-600" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-white text-green-700" : "bg-green-600 text-green-200"}`}>2</div>
            </div>
            <p className="text-center text-green-100 text-sm mt-2">{step === 1 ? "मूल जानकारी (Basic Info)" : "अतिरिक्त जानकारी (Additional Info)"}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

            {step === 1 ? (
              <>
                {/* Category Selection - CRITICAL FIELD */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    पंजीकरण श्रेणी (Registration Category) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <label
                        key={cat.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                          formData.category === cat.value ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <input type="radio" name="category" value={cat.value} checked={formData.category === cat.value} onChange={handleChange} className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 text-lg">{cat.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{cat.label}</p>
                          <p className="text-xs text-gray-500">{cat.eng}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {!formData.category && (
                    <p className="text-xs text-amber-600">⚠️ कोई श्रेणी नहीं चुनी गई - डिफ़ॉल्ट "सदस्य" (User) के रूप में पंजीकृत होगा (No category selected - will register as default "User")</p>
                  )}
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    पूरा नाम (Full Name) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="अपना पूरा नाम दर्ज करें"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Email & Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      ईमेल (Email) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      मोबाइल (Mobile) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder="9876543210"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      पासवर्ड (Password) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      पासवर्ड की पुष्टि (Confirm Password) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <button type="button" onClick={() => validateStep1() && setStep(2)} className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-semibold">
                  आगे बढ़ें (Continue) →
                </button>
              </>
            ) : (
              <>
                {/* Step 2: Additional Info */}
                <div className="space-y-4">
                  {/* Organization Name (if applicable) */}
                  {(formData.category === "facilitating_agency" || formData.category === "local_group" || formData.category === "farmer_consumer_group") && (
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">संगठन का नाम (Organization Name)</label>
                      <div className="relative">
                        <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="organizationName"
                          value={formData.organizationName}
                          onChange={handleChange}
                          placeholder="संगठन/समूह का नाम"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">पता (Address)</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="पूरा पता"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">गांव (Village)</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="village"
                          value={formData.village}
                          onChange={handleChange}
                          placeholder="गांव का नाम"
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">जिला (District)</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="जिला"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">राज्य (State)</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">पिन कोड (Pincode)</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="411057"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
                    ← वापस (Back)
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-semibold disabled:opacity-50">
                    {loading ? "पंजीकरण हो रहा है..." : "पंजीकरण करें (Register)"}
                  </button>
                </div>
              </>
            )}

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 pt-2">
              पहले से खाता है?{" "}
              <Link to="/login" className="text-green-700 font-semibold hover:text-green-800">
                लॉगिन करें (Login)
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
