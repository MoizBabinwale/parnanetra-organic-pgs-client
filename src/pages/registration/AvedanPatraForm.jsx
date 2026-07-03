import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaPrint, FaUser, FaUsers, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaSeedling, FaWater, FaTractor, FaCow, FaFileUpload } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function AvedanPatraForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    // Section 1: Basic Info
    groupName: "",
    farmerName: "",
    fatherName: "",
    address: "",
    village: "",
    taluka: "",
    district: "",
    pincode: "",
    mobile: "",
    email: "",
    aadharNumber: "",
    dateOfBirth: "",
    gender: "",
    category: "",
    education: "",

    // Section 2: Family Members
    familyMembers: [
      { name: "", age: "", relation: "", occupation: "" },
      { name: "", age: "", relation: "", occupation: "" },
      { name: "", age: "", relation: "", occupation: "" },
    ],

    // Section 3: Land Details
    totalLandArea: "",
    organicLandArea: "",
    surveyNumber: "",
    plots: [
      { plotNo: "", area: "", crop: "", irrigation: "" },
      { plotNo: "", area: "", crop: "", irrigation: "" },
      { plotNo: "", area: "", crop: "", irrigation: "" },
    ],
    landMapAttached: false,

    // Section 4: Last Chemical Use
    lastChemicalDate: "",
    lastChemicalName: "",
    lastChemicalQuantity: "",

    // Section 5: Last 3 Years Crops
    year1Crops: { kharif: "", rabi: "", summer: "", fertilizer: "" },
    year2Crops: { kharif: "", rabi: "", summer: "", fertilizer: "" },
    year3Crops: { kharif: "", rabi: "", summer: "", fertilizer: "" },

    // Section 6: Soil & Water Testing
    soilTestDone: "no",
    soilTestReport: null,
    waterTestDone: "no",
    waterTestReport: null,

    // Section 7: Irrigation
    irrigationSource: "",
    irrigationType: "",

    // Section 8: Machinery
    ownsTractor: false,
    tractorDetails: "",
    ownsEquipment: false,
    equipmentDetails: "",

    // Section 9: Livestock
    livestock: [
      { animal: "", count: "", feedDetails: "", medicineDetails: "" },
      { animal: "", count: "", feedDetails: "", medicineDetails: "" },
    ],

    // Section 10: Pollution Control
    pollutionControl: "",

    // Section 11: Storage
    storageAvailable: "no",
    storageDetails: "",

    // Section 12: Processing
    processingFacility: "no",
    processingDetails: "",

    // Section 13: Conversion Plan
    conversionPlan: "",
    conversionTimeline: "",

    // Section 14: Declarations
    declaration: false,
    groupChiefName: "",
    groupChiefPlace: "",
    groupChiefDate: "",
    groupChiefSignature: "",
    memberSignatures: [
      { name: "", memberNo: "", signature: "" },
      { name: "", memberNo: "", signature: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFamilyChange = (index, field, value) => {
    const updated = [...formData.familyMembers];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, familyMembers: updated }));
  };

  const handlePlotChange = (index, field, value) => {
    const updated = [...formData.plots];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, plots: updated }));
  };

  const handleYearCropChange = (year, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [year]: { ...prev[year], [field]: value },
    }));
  };

  const handleLivestockChange = (index, field, value) => {
    const updated = [...formData.livestock];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, livestock: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await axios.post(`${API_URL}/avedan-patra`, formData);
      setMessage({ type: "success", text: "आवेदन सफलतापूर्वक जमा किया गया! (Application submitted successfully!)" });
      setTimeout(() => navigate("/registration/farmer-member"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "कुछ गलत हुआ! (Something went wrong!)" });
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const SectionTitle = ({ number, title, hindiTitle }) => (
    <div className="bg-green-700 text-white px-4 py-3 rounded-lg mt-8 mb-4 flex items-center gap-3">
      <span className="bg-white text-green-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">{number}</span>
      <div>
        <h3 className="font-bold text-lg">{hindiTitle}</h3>
        <p className="text-green-100 text-sm">{title}</p>
      </div>
    </div>
  );

  const InputField = ({ label, hindiLabel, name, type = "text", value, onChange, required = false, placeholder = "" }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {hindiLabel} <span className="text-gray-500 text-xs">({label})</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-sm"
      />
    </div>
  );

  const SelectField = ({ label, hindiLabel, name, value, onChange, options, required = false }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {hindiLabel} <span className="text-gray-500 text-xs">({label})</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-sm bg-white"
      >
        <option value="">चुनें (Select)</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.hindi} ({opt.label})
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">अभिनव किसान क्लब पी.जी.एस.</h1>
          <h2 className="text-xl text-green-100">ABHINAV FARMER'S CLUB PGS</h2>
          <p className="text-green-200 mt-2 text-sm">बोडकेवाडी, मान रोड, पुणे, महाराष्ट्र - 411057</p>
          <div className="mt-4 inline-block bg-white/20 px-6 py-2 rounded-full">
            <h3 className="text-2xl font-bold">आवेदन पत्र</h3>
            <p className="text-sm">Application Form for Farmer Membership</p>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mx-6 mt-4 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section 1: Basic Information */}
          <SectionTitle number="1" title="Basic Information" hindiTitle="मूल जानकारी" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="Group Name" hindiLabel="समूह का नाम" name="groupName" value={formData.groupName} onChange={handleChange} required />
            <InputField label="Farmer Name" hindiLabel="किसान का नाम" name="farmerName" value={formData.farmerName} onChange={handleChange} required />
            <InputField label="Father's/Husband's Name" hindiLabel="पिता/पति का नाम" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            <div className="md:col-span-2">
              <InputField label="Address" hindiLabel="पता" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <InputField label="Village" hindiLabel="गांव" name="village" value={formData.village} onChange={handleChange} required />
            <InputField label="Taluka" hindiLabel="तालुका" name="taluka" value={formData.taluka} onChange={handleChange} />
            <InputField label="District" hindiLabel="जिला" name="district" value={formData.district} onChange={handleChange} required />
            <InputField label="Pincode" hindiLabel="पिन कोड" name="pincode" value={formData.pincode} onChange={handleChange} />
            <InputField label="Mobile Number" hindiLabel="मोबाइल नंबर" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required />
            <InputField label="Email" hindiLabel="ईमेल" name="email" type="email" value={formData.email} onChange={handleChange} />
            <InputField label="Aadhar Number" hindiLabel="आधार नंबर" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />
            <InputField label="Date of Birth" hindiLabel="जन्म तिथि" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            <SelectField
              label="Gender"
              hindiLabel="लिंग"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: "male", hindi: "पुरुष", label: "Male" },
                { value: "female", hindi: "महिला", label: "Female" },
                { value: "other", hindi: "अन्य", label: "Other" },
              ]}
            />
            <SelectField
              label="Category"
              hindiLabel="वर्ग"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: "general", hindi: "सामान्य", label: "General" },
                { value: "sc", hindi: "अनुसूचित जाति", label: "SC" },
                { value: "st", hindi: "अनुसूचित जनजाति", label: "ST" },
                { value: "obc", hindi: "अन्य पिछड़ा वर्ग", label: "OBC" },
              ]}
            />
            <SelectField
              label="Education"
              hindiLabel="शिक्षा"
              name="education"
              value={formData.education}
              onChange={handleChange}
              options={[
                { value: "illiterate", hindi: "अनपढ़", label: "Illiterate" },
                { value: "primary", hindi: "प्राथमिक", label: "Primary" },
                { value: "secondary", hindi: "माध्यमिक", label: "Secondary" },
                { value: "graduate", hindi: "स्नातक", label: "Graduate" },
                { value: "postgraduate", hindi: "स्नातकोत्तर", label: "Post Graduate" },
              ]}
            />
          </div>

          {/* Section 2: Family Members */}
          <SectionTitle number="2" title="Family Members" hindiTitle="परिवार के सदस्य" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-gray-300 px-3 py-2 text-sm">क्र. (Sr.)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">नाम (Name)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">उम्र (Age)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">नाता (Relation)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">पेशा (Occupation)</th>
                </tr>
              </thead>
              <tbody>
                {formData.familyMembers.map((member, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input value={member.name} onChange={(e) => handleFamilyChange(idx, "name", e.target.value)} className="w-full px-2 py-1 border-0 outline-none text-sm" placeholder="नाम" />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        value={member.age}
                        onChange={(e) => handleFamilyChange(idx, "age", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="उम्र"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        value={member.relation}
                        onChange={(e) => handleFamilyChange(idx, "relation", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="नाता"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        value={member.occupation}
                        onChange={(e) => handleFamilyChange(idx, "occupation", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="पेशा"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: Land Details */}
          <SectionTitle number="3" title="Land Details (7/12 Extract)" hindiTitle="जमीन का विवरण (7/12 निकाल)" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Total Land Area (Hectares)"
              hindiLabel="कुल क्षेत्र (हेक्टेयर)"
              name="totalLandArea"
              type="number"
              step="0.01"
              value={formData.totalLandArea}
              onChange={handleChange}
              required
            />
            <InputField
              label="Organic Farming Area (Hectares)"
              hindiLabel="जैविक खेती क्षेत्र (हेक्टेयर)"
              name="organicLandArea"
              type="number"
              step="0.01"
              value={formData.organicLandArea}
              onChange={handleChange}
            />
            <InputField label="Survey Number" hindiLabel="सर्वेक्षण क्रमांक" name="surveyNumber" value={formData.surveyNumber} onChange={handleChange} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-gray-300 px-3 py-2 text-sm">प्लॉट नं. (Plot No.)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">क्षेत्र (Area)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">फसल (Crop)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">सिंचाई (Irrigation)</th>
                </tr>
              </thead>
              <tbody>
                {formData.plots.map((plot, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-2 py-1">
                      <input value={plot.plotNo} onChange={(e) => handlePlotChange(idx, "plotNo", e.target.value)} className="w-full px-2 py-1 border-0 outline-none text-sm" placeholder="प्लॉट नं." />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input value={plot.area} onChange={(e) => handlePlotChange(idx, "area", e.target.value)} className="w-full px-2 py-1 border-0 outline-none text-sm" placeholder="क्षेत्र" />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input value={plot.crop} onChange={(e) => handlePlotChange(idx, "crop", e.target.value)} className="w-full px-2 py-1 border-0 outline-none text-sm" placeholder="फसल" />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        value={plot.irrigation}
                        onChange={(e) => handlePlotChange(idx, "irrigation", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="सिंचाई"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="landMapAttached" checked={formData.landMapAttached} onChange={handleChange} className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
            <label className="text-sm text-gray-700">भूमि का नक्शा संलग्न है (Land map attached)</label>
          </div>

          {/* Section 4: Last Chemical Use */}
          <SectionTitle number="4" title="Last Chemical Use" hindiLabel="अंतिम रासायनिक उपयोग" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Date" hindiLabel="तारीख" name="lastChemicalDate" type="date" value={formData.lastChemicalDate} onChange={handleChange} />
            <InputField label="Chemical Name" hindiLabel="रसायन का नाम" name="lastChemicalName" value={formData.lastChemicalName} onChange={handleChange} />
            <InputField label="Quantity" hindiLabel="मात्रा" name="lastChemicalQuantity" value={formData.lastChemicalQuantity} onChange={handleChange} />
          </div>

          {/* Section 5: Last 3 Years Crops */}
          <SectionTitle number="5" title="Last 3 Years Crop History" hindiTitle="पिछले 3 वर्षों की फसलें" />
          {[
            { year: "year1Crops", label: "वर्ष 1 (Year 1)" },
            { year: "year2Crops", label: "वर्ष 2 (Year 2)" },
            { year: "year3Crops", label: "वर्ष 3 (Year 3)" },
          ].map((yr) => (
            <div key={yr.year} className="bg-gray-50 p-4 rounded-lg mb-3">
              <h4 className="font-semibold text-green-700 mb-2">{yr.label}</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  placeholder="खरीफ (Kharif)"
                  value={formData[yr.year].kharif}
                  onChange={(e) => handleYearCropChange(yr.year, "kharif", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="रबी (Rabi)"
                  value={formData[yr.year].rabi}
                  onChange={(e) => handleYearCropChange(yr.year, "rabi", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="ग्रीष्म (Summer)"
                  value={formData[yr.year].summer}
                  onChange={(e) => handleYearCropChange(yr.year, "summer", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="उर्वरक/दवा (Fertilizer)"
                  value={formData[yr.year].fertilizer}
                  onChange={(e) => handleYearCropChange(yr.year, "fertilizer", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          ))}

          {/* Section 6: Soil & Water Testing */}
          <SectionTitle number="6" title="Soil & Water Testing" hindiTitle="मिट्टी और पानी की जांच" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">क्या मिट्टी की जांच हुई? (Soil test done?)</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="soilTestDone" value="yes" checked={formData.soilTestDone === "yes"} onChange={handleChange} className="text-green-600" />
                  <span className="text-sm">हाँ (Yes)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="soilTestDone" value="no" checked={formData.soilTestDone === "no"} onChange={handleChange} className="text-green-600" />
                  <span className="text-sm">नहीं (No)</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">क्या पानी की जांच हुई? (Water test done?)</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="waterTestDone" value="yes" checked={formData.waterTestDone === "yes"} onChange={handleChange} className="text-green-600" />
                  <span className="text-sm">हाँ (Yes)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="waterTestDone" value="no" checked={formData.waterTestDone === "no"} onChange={handleChange} className="text-green-600" />
                  <span className="text-sm">नहीं (No)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 7: Irrigation */}
          <SectionTitle number="7" title="Irrigation System" hindiTitle="सिंचाई प्रणाली" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Irrigation Source"
              hindiLabel="सिंचाई का स्रोत"
              name="irrigationSource"
              value={formData.irrigationSource}
              onChange={handleChange}
              options={[
                { value: "rain", hindi: "वर्षा", label: "Rain" },
                { value: "well", hindi: "कुआं", label: "Well" },
                { value: "borewell", hindi: "बोरवेल", label: "Borewell" },
                { value: "canal", hindi: "नहर", label: "Canal" },
                { value: "river", hindi: "नदी", label: "River" },
                { value: "drip", hindi: "ड्रिप", label: "Drip" },
              ]}
            />
            <InputField label="Irrigation Type" hindiLabel="सिंचाई का प्रकार" name="irrigationType" value={formData.irrigationType} onChange={handleChange} />
          </div>

          {/* Section 8: Machinery */}
          <SectionTitle number="8" title="Machinery & Equipment" hindiTitle="मशीनरी और उपकरण" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="ownsTractor" checked={formData.ownsTractor} onChange={handleChange} className="w-4 h-4 text-green-600 rounded" />
                <label className="text-sm text-gray-700">ट्रैक्टर है (Owns Tractor)</label>
              </div>
              {formData.ownsTractor && (
                <input
                  name="tractorDetails"
                  value={formData.tractorDetails}
                  onChange={handleChange}
                  placeholder="ट्रैक्टर का विवरण"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="ownsEquipment" checked={formData.ownsEquipment} onChange={handleChange} className="w-4 h-4 text-green-600 rounded" />
                <label className="text-sm text-gray-700">अन्य उपकरण हैं (Other Equipment)</label>
              </div>
              {formData.ownsEquipment && (
                <input
                  name="equipmentDetails"
                  value={formData.equipmentDetails}
                  onChange={handleChange}
                  placeholder="उपकरणों का विवरण"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>
          </div>

          {/* Section 9: Livestock */}
          <SectionTitle number="9" title="Livestock Details" hindiLabel="पशुधन का विवरण" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-50">
                  <th className="border border-gray-300 px-3 py-2 text-sm">पशु (Animal)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">संख्या (Count)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">चारा/भोजन (Feed)</th>
                  <th className="border border-gray-300 px-3 py-2 text-sm">दवाइयां (Medicine)</th>
                </tr>
              </thead>
              <tbody>
                {formData.livestock.map((animal, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        value={animal.animal}
                        onChange={(e) => handleLivestockChange(idx, "animal", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="पशु"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        value={animal.count}
                        onChange={(e) => handleLivestockChange(idx, "count", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="संख्या"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        value={animal.feedDetails}
                        onChange={(e) => handleLivestockChange(idx, "feedDetails", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="चारा"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        value={animal.medicineDetails}
                        onChange={(e) => handleLivestockChange(idx, "medicineDetails", e.target.value)}
                        className="w-full px-2 py-1 border-0 outline-none text-sm"
                        placeholder="दवाइयां"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 10: Pollution Control */}
          <SectionTitle number="10" title="Pollution Control Measures" hindiTitle="प्रदूषण नियंत्रण उपाय" />
          <textarea
            name="pollutionControl"
            value={formData.pollutionControl}
            onChange={handleChange}
            rows="3"
            placeholder="बफर जोन, रासायनिक खेतों से दूरी आदि का विवरण..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />

          {/* Section 11: Storage */}
          <SectionTitle number="11" title="Storage Facilities" hindiLabel="भंडारण सुविधाएं" />
          <div className="space-y-2">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="storageAvailable" value="yes" checked={formData.storageAvailable === "yes"} onChange={handleChange} className="text-green-600" />
                <span className="text-sm">हाँ (Yes)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="storageAvailable" value="no" checked={formData.storageAvailable === "no"} onChange={handleChange} className="text-green-600" />
                <span className="text-sm">नहीं (No)</span>
              </label>
            </div>
            {formData.storageAvailable === "yes" && (
              <textarea
                name="storageDetails"
                value={formData.storageDetails}
                onChange={handleChange}
                rows="2"
                placeholder="भंडारण का विवरण..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            )}
          </div>

          {/* Section 12: Processing */}
          <SectionTitle number="12" title="Processing Facilities" hindiLabel="प्रसंस्करण सुविधाएं" />
          <div className="space-y-2">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="processingFacility" value="yes" checked={formData.processingFacility === "yes"} onChange={handleChange} className="text-green-600" />
                <span className="text-sm">हाँ (Yes)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="processingFacility" value="no" checked={formData.processingFacility === "no"} onChange={handleChange} className="text-green-600" />
                <span className="text-sm">नहीं (No)</span>
              </label>
            </div>
            {formData.processingFacility === "yes" && (
              <textarea
                name="processingDetails"
                value={formData.processingDetails}
                onChange={handleChange}
                rows="2"
                placeholder="प्रसंस्करण का विवरण..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            )}
          </div>

          {/* Section 13: Conversion Plan */}
          <SectionTitle number="13" title="Organic Conversion Plan" hindiTitle="जैविक रूपांतरण योजना" />
          <div className="space-y-3">
            <textarea
              name="conversionPlan"
              value={formData.conversionPlan}
              onChange={handleChange}
              rows="3"
              placeholder="चरण-दर-चरण रूपांतरण योजना का विवरण..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <InputField label="Conversion Timeline" hindiLabel="रूपांतरण समयसीमा" name="conversionTimeline" value={formData.conversionTimeline} onChange={handleChange} placeholder="उदा: 2 वर्ष" />
          </div>

          {/* Section 14: Declaration */}
          <SectionTitle number="14" title="Declaration & Signatures" hindiTitle="घोषणा और हस्ताक्षर" />
          <div className="bg-green-50 p-4 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} required className="w-5 h-5 text-green-600 rounded mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                मैं घोषणा करता हूं कि मुझे दी गई जानकारी मेरे सर्वोत्तम ज्ञान के अनुसार सत्य है। मैंने ऐसी कोई जानकारी नहीं छिपाई है जो भविष्य में मेरी प्राकृतिक खेती (पर्णनेत्र सेंद्रिय पी.जी.एस) को
                नुकसान पहुंचाए। मैं पर्णनेत्र सेंद्रिय पी.जी.एस मानकों का पालन करूंगा।
                <br />
                <span className="text-gray-500 italic">I declare that the information provided is true to the best of my knowledge. I will follow Parnanetra Organic PGS standards.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-green-200">
              <InputField label="Group Chief Name" hindiLabel="समूह प्रमुख का नाम" name="groupChiefName" value={formData.groupChiefName} onChange={handleChange} />
              <InputField label="Place" hindiLabel="स्थान" name="groupChiefPlace" value={formData.groupChiefPlace} onChange={handleChange} />
              <InputField label="Date" hindiLabel="तारीख" name="groupChiefDate" type="date" value={formData.groupChiefDate} onChange={handleChange} />
            </div>

            <div className="pt-4 border-t border-green-200">
              <h4 className="font-semibold text-green-700 mb-2">समूह के अन्य सदस्यों के हस्ताक्षर (Other Members' Signatures)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.memberSignatures.map((member, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">सदस्य {idx + 1}</p>
                    <div className="space-y-2">
                      <input
                        placeholder="नाम (Name)"
                        value={member.name}
                        onChange={(e) => {
                          const updated = [...formData.memberSignatures];
                          updated[idx].name = e.target.value;
                          setFormData((prev) => ({ ...prev, memberSignatures: updated }));
                        }}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        placeholder="सदस्य नं. (Member No.)"
                        value={member.memberNo}
                        onChange={(e) => {
                          const updated = [...formData.memberSignatures];
                          updated[idx].memberNo = e.target.value;
                          setFormData((prev) => ({ ...prev, memberSignatures: updated }));
                        }}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FaSave />
              {loading ? "जमा किया जा रहा है... (Submitting...)" : "आवेदन जमा करें (Submit Application)"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300 font-semibold flex items-center justify-center gap-2"
            >
              <FaPrint />
              प्रिंट करें (Print)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
