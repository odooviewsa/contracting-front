import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../axios/axios";

const MaterialRequestList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [materialRequests, setMaterialRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectsResponse = await axiosInstance.get("/api/projects");
        if (projectsResponse.data && projectsResponse.data.projects) {
          const requests = projectsResponse.data.projects.map(project => ({
            id: project._id,
            requestSequence: `MR-${new Date().getFullYear()}-${String(project._id).slice(-3)}`,
            project: project.projectName,
            workItem: project.workItem || "",
            requestedBy: project.requestedBy || "Not Specified",
            orderDate: project.createdAt,
            deliveryDate: project.deliveryDate,
            status: project.status || "pending",
            emergency: project.emergency || false,
            items: project.items || [],
            amount: project.amount || 0
          }));
          setMaterialRequests(requests);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dashboardMetrics = {
    totalAmount: materialRequests.reduce((sum, r) => sum + (r.amount || 0), 0),
    totalRequests: materialRequests.length,
    pendingRequests: materialRequests.filter(r => r.status === 'pending').length,
    approvedRequests: materialRequests.filter(r => r.status === 'approved').length,
    emergencyRequests: materialRequests.filter(r => r.emergency).length,
    activeProjects: new Set(materialRequests.map(r => r.project)).size,
    totalItems: materialRequests.reduce((sum, r) => sum + (r.items?.length || 0), 0),
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-500",
      approved: "bg-green-500",
      rejected: "bg-red-500",
      draft: "bg-gray-500"
    };

    return (
      <span className={`${styles[status.toLowerCase()] || 'bg-gray-500'} text-white px-2 py-1 rounded-full text-xs`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredRequests = materialRequests.filter(request => 
    Object.values(request).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Dashboard Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-7 divide-x">
            {/* Total Budget */}
            <div className="p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Budget</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">
                  ${dashboardMetrics.totalAmount.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 ml-1">USD</span>
              </div>
            </div>

            {/* Total Requests */}
            <div className="p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Requests</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalRequests}</span>
                <span className="text-xs text-gray-500 ml-1">requests</span>
              </div>
            </div>

            {/* Pending */}
            <div className="p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-yellow-600">{dashboardMetrics.pendingRequests}</span>
                <span className="text-xs text-gray-500 ml-1">awaiting</span>
              </div>
            </div>

            {/* Approved */}
            <div className="p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-green-600">{dashboardMetrics.approvedRequests}</span>
                <span className="text-xs text-gray-500 ml-1">completed</span>
              </div>
            </div>

            {/* Emergency */}
            <div className="p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-red-600">{dashboardMetrics.emergencyRequests}</span>
                <span className="text-xs text-gray-500 ml-1">urgent</span>
              </div>
            </div>

            {/* Active Projects */}
            <div className="p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Projects</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-blue-600">{dashboardMetrics.activeProjects}</span>
                <span className="text-xs text-gray-500 ml-1">in progress</span>
              </div>
            </div>

            {/* Total Items */}
            <div className="p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Items</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalItems}</span>
                <span className="text-xs text-gray-500 ml-1">materials</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Material Requests</h1>
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>

        {/* Table */}
        <div className="bg-white overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Item</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr 
                    key={request.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/material-request/${request.id}`}
                  >
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{request.requestSequence}</div>
                      {request.emergency && (
                        <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Emergency
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-900">{request.project}</td>
                    <td className="p-4 text-gray-500">{request.workItem}</td>
                    <td className="p-4 text-gray-900">{request.requestedBy}</td>
                    <td className="p-4 text-gray-500">{new Date(request.orderDate).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-500">
                      {request.deliveryDate ? new Date(request.deliveryDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-4">{getStatusBadge(request.status)}</td>
                    <td className="p-4 text-right font-medium text-gray-900">{request.items?.length || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    {error ? `Error: ${error}` : 'No material requests found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaterialRequestList;