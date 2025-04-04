import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { mockReports, reportCategories, reportFormats } from '../../mock-data/reports';
import { Report, ReportCategory, ReportFormat } from '../../types/reports';
import { format } from 'date-fns';
import ReportDetail from './ReportDetail';
import ReportEditor from './ReportEditor';

interface ReportsProps {
  projectId: string;
}

const Reports: React.FC<ReportsProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ReportCategory[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<ReportFormat[]>([]);
  const [recentReports, setRecentReports] = useState<Report[]>(mockReports.slice(0, 3));

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(report.category);
    const matchesFormat = selectedFormats.length === 0 || selectedFormats.includes(report.format);
    return matchesSearch && matchesCategory && matchesFormat;
  });

  const handleReportClick = (reportId: string) => {
    navigate(`/project/${projectId}/reports/${reportId}`);
  };

  const handleNewReport = () => {
    navigate(`/project/${projectId}/reports/new`);
  };

  const ReportsList = () => (
    <div className="flex h-screen">
      {/* Left Sidebar - Categories */}
      <div className="w-[220px] bg-white border-r border-[#A7CEBC] p-4">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full px-3 py-2 border border-[#A7CEBC] rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-[#3A366E] font-semibold mb-2">Categories</h3>
          {reportCategories.map(category => (
            <label key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  }
                }}
                className="mr-2"
              />
              <span className="text-[#4C5760]">{category}</span>
            </label>
          ))}
        </div>

        <div>
          <h3 className="text-[#3A366E] font-semibold mb-2">Format</h3>
          {reportFormats.map(format => (
            <label key={format} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFormats.includes(format)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFormats([...selectedFormats, format]);
                  } else {
                    setSelectedFormats(selectedFormats.filter(f => f !== format));
                  }
                }}
                className="mr-2"
              />
              <span className="text-[#4C5760]">{format}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#F7F5F2] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#3A366E]">Reports</h1>
          <button 
            onClick={handleNewReport}
            className="bg-[#D15F36] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            + New Report
          </button>
        </div>

        {/* Recently Accessed */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#3A366E] mb-4">Recently Accessed</h2>
          <div className="grid grid-cols-3 gap-4">
            {recentReports.map(report => (
              <div 
                key={report.id} 
                className="bg-[#F7F5F2] rounded-md p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
                onClick={() => handleReportClick(report.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    report.format === 'Narrative' ? 'bg-green-100 text-green-800' :
                    report.format === 'Tabular' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {report.format}
                  </span>
                  <span className="text-xs text-[#4C5760]">
                    Last edited: {format(new Date(report.updatedAt), 'MMM d, yyyy')}
                  </span>
                </div>
                <h3 className="text-[#3A366E] font-medium mb-1">{report.title}</h3>
                <p className="text-sm text-[#4C5760]">Created by: {report.createdBy.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All Reports */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#3A366E] mb-4">All Reports</h2>
          <div className="space-y-4">
            {filteredReports.map(report => (
              <div 
                key={report.id} 
                className="flex items-center justify-between p-4 hover:bg-[#F7F5F2] rounded-md transition-colors cursor-pointer"
                onClick={() => handleReportClick(report.id)}
              >
                <div className="flex-1">
                  <h3 className="text-[#3A366E] font-medium">{report.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-[#4C5760]">{report.projectName}</span>
                    <span className="text-sm text-[#4C5760]">•</span>
                    <span className="text-sm text-[#4C5760]">{format(new Date(report.updatedAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    report.format === 'Narrative' ? 'bg-green-100 text-green-800' :
                    report.format === 'Tabular' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {report.format}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    {report.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ReportDetailRoute = () => {
    const { reportId } = useParams();
    const report = mockReports.find(r => r.id === reportId);
    
    if (!report) {
      return <div>Report not found</div>;
    }

    return (
      <ReportDetail
        report={report}
        onClose={() => navigate(`/project/${projectId}/reports`)}
        onEdit={() => navigate(`/project/${projectId}/reports/${reportId}/edit`)}
      />
    );
  };

  const ReportEditorRoute = () => {
    const { reportId } = useParams();
    const report = reportId === 'new' ? undefined : mockReports.find(r => r.id === reportId);

    const handleSave = (updatedReport: Partial<Report>) => {
      // In a real app, this would make an API call
      console.log('Saving report:', updatedReport);
      navigate(`/project/${projectId}/reports`);
    };

    return (
      <ReportEditor
        report={report}
        onSave={handleSave}
        onClose={() => navigate(`/project/${projectId}/reports`)}
      />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<ReportsList />} />
      <Route path="/new" element={<ReportEditorRoute />} />
      <Route path="/:reportId" element={<ReportDetailRoute />} />
      <Route path="/:reportId/edit" element={<ReportEditorRoute />} />
    </Routes>
  );
};

export default Reports; 