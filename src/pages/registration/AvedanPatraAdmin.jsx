import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock, FaEye, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function AvedanPatraAdmin() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, underReview: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/avedan-patra`, {
          params: { search: search || undefined, status: filter !== "all" ? filter : undefined },
        }),
        axios.get(`${API_URL}/avedan-patra/stats/dashboard`),
      ]);
      setApplications(appsRes.data.data || []);
      setStats(statsRes.data.stats || {});
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/avedan-patra/${id}/status`, {
        status,
        reviewedBy: "Admin",
      });
      fetchData();
      setSelectedApp(null);
    } catch (error) {
      alert("Error updating status");
    }
  };

  const deleteApp = async (id) => {
    if (!window.confirm("क्या आप वाकई इस आवेदन को हटाना चाहते हैं? (Are you sure?)")) return;
    try {
      await axios.delete(`${API_URL}/avedan-patra/${id}`);
      fetchData();
    } catch (error) {
      alert("Error deleting");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-600" />;
      case "rejected":
        return <FaTimesCircle className="text-red-600" />;
      case "under_review":
        return <FaClock className="text-yellow-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">आवेदन पत्र प्रबंधन</h1>
          <p className="text-gray-600">Avedan Patra Applications Management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "कुल (Total)", value: stats.total, color: "bg-blue-500", icon: <FaUsers /> },
            { label: "लंबित (Pending)", value: stats.pending, color: "bg-gray-500", icon: <FaClock /> },
            { label: "समीक्षा में (Review)", value: stats.underReview, color: "bg-yellow-500", icon: <FaClock /> },
            { label: "स्वीकृत (Approved)", value: stats.approved, color: "bg-green-500", icon: <FaCheckCircle /> },
            { label: "अस्वीकृत (Rejected)", value: stats.rejected, color: "bg-red-500", icon: <FaTimesCircle /> },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} text-white p-4 rounded-xl shadow-lg`}>
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="नाम, मोबाइल या गांव से खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 bg-white">
              <option value="all">सभी (All)</option>
              <option value="pending">लंबित (Pending)</option>
              <option value="under_review">समीक्षा में (Under Review)</option>
              <option value="approved">स्वीकृत (Approved)</option>
              <option value="rejected">अस्वीकृत (Rejected)</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">लोड हो रहा है... (Loading...)</div>
          ) : applications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">कोई आवेदन नहीं मिला (No applications found)</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">क्र. (Sr.)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">किसान का नाम (Farmer)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">गांव (Village)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">मोबाइल (Mobile)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">स्थिति (Status)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">तारीख (Date)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">कार्रवाई (Actions)</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, idx) => (
                    <tr key={app._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{app.farmerName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{app.village}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{app.mobile}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status === "pending" && "लंबित"}
                          {app.status === "under_review" && "समीक्षा में"}
                          {app.status === "approved" && "स्वीकृत"}
                          {app.status === "rejected" && "अस्वीकृत"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(app.createdAt).toLocaleDateString("hi-IN")}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedApp(app)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition" title="View">
                            <FaEye />
                          </button>
                          <button onClick={() => deleteApp(app._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition" title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-green-800">आवेदन विवरण (Application Details)</h2>
              <button onClick={() => setSelectedApp(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-500 text-sm">किसान का नाम:</span> <span className="font-medium">{selectedApp.farmerName}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">पिता/पति का नाम:</span> <span className="font-medium">{selectedApp.fatherName}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">गांव:</span> <span className="font-medium">{selectedApp.village}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">जिला:</span> <span className="font-medium">{selectedApp.district}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">मोबाइल:</span> <span className="font-medium">{selectedApp.mobile}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">ईमेल:</span> <span className="font-medium">{selectedApp.email || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">कुल भूमि:</span> <span className="font-medium">{selectedApp.totalLandArea} हेक्टेयर</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">जैविक भूमि:</span> <span className="font-medium">{selectedApp.organicLandArea} हेक्टेयर</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-green-700 mb-2">स्थिति अपडेट करें (Update Status)</h3>
                <div className="flex gap-3">
                  <button onClick={() => updateStatus(selectedApp._id, "under_review")} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                    समीक्षा में
                  </button>
                  <button onClick={() => updateStatus(selectedApp._id, "approved")} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    स्वीकृत करें
                  </button>
                  <button onClick={() => updateStatus(selectedApp._id, "rejected")} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    अस्वीकृत करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
