import React, { useState } from 'react';
import { FaSearch, FaFilePdf, FaFileExcel, FaPrint, FaCalendarAlt } from 'react-icons/fa';

const AttendanceReports = () => {
  // Mock data
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Monthly Attendance Report - August 2024',
      period: '2024-08-01 to 2024-08-31',
      class: '10',
      section: 'A',
      generatedOn: '2024-08-26',
      type: 'Monthly',
      status: 'Generated'
    },
    {
      id: 2,
      title: 'Weekly Attendance - Week 34',
      period: '2024-08-19 to 2024-08-25',
      class: '9',
      section: 'B',
      generatedOn: '2024-08-25',
      type: 'Weekly',
      status: 'Generated'
    }
  ]);

  const [filters, setFilters] = useState({
    class: '',
    section: '',
    type: '',
    dateRange: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Filter reports based on filters
  const filteredReports = reports.filter(report => {
    return (
      (filters.class ? report.class === filters.class : true) &&
      (filters.section ? report.section === filters.section : true) &&
      (filters.type ? report.type === filters.type : true)
    );
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate new report
  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        title: `Custom Report - ${new Date().toLocaleDateString()}`,
        period: 'Custom Range',
        class: filters.class || 'All',
        section: filters.section || 'All',
        generatedOn: new Date().toISOString().split('T')[0],
        type: filters.type || 'Custom',
        status: 'Generated'
      };
      setReports([newReport, ...reports]);
      setIsGenerating(false);
    }, 1500);
  };

  // Export report
  const exportReport = (format, reportId) => {
    const report = reports.find(r => r.id === reportId);
    alert(`Exporting report "${report.title}" as ${format.toUpperCase()}`);
    // Actual export logic would go here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Attendance Reports</h1>
              <p className="mt-1 text-sm text-gray-500">
                View and manage attendance reports
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">Filter Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  name="class"
                  value={filters.class}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">All Classes</option>
                  {['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(cls => (
                    <option key={cls} value={cls}>
                      {cls === 'Nursery' || cls === 'LKG' || cls === 'UKG' ? cls : `Class ${cls}`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  name="section"
                  value={filters.section}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">All Sections</option>
                  {['A', 'B', 'C', 'D'].map(sec => (
                    <option key={sec} value={sec}>Section {sec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">All Types</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Term">Term</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Select date range"
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class & Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated On</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.length > 0 ? (
                  filteredReports.map(report => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{report.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {report.class === 'Nursery' || report.class === 'LKG' || report.class === 'UKG' 
                            ? report.class 
                            : `Class ${report.class}`}
                          {report.section && ` - Sec ${report.section}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${report.type === 'Monthly' ? 'bg-blue-100 text-blue-800' : 
                            report.type === 'Weekly' ? 'bg-purple-100 text-purple-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(report.generatedOn).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => exportReport('pdf', report.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Export as PDF"
                          >
                            <FaFilePdf className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => exportReport('excel', report.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Export as Excel"
                          >
                            <FaFileExcel className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => window.print()}
                            className="text-gray-600 hover:text-gray-900"
                            title="Print"
                          >
                            <FaPrint className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No reports found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
