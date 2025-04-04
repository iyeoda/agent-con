import React from 'react';
import { Report } from '../../types/reports';
import { format } from 'date-fns';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
  onEdit: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, onClose, onEdit }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-white border-l border-[#A7CEBC] shadow-lg overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#3A366E] mb-2">{report.title}</h2>
            <p className="text-sm text-[#4C5760]">{report.projectName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#4C5760] hover:text-[#3A366E]"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
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

        <div className="mb-6">
          <button
            onClick={onEdit}
            className="w-full bg-[#D15F36] text-white py-2 rounded-md hover:bg-opacity-90"
          >
            Edit Report
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-[#3A366E] mb-2">Created by</h3>
            <p className="text-sm text-[#4C5760]">{report.createdBy.name}</p>
            <p className="text-xs text-[#4C5760]">
              {format(new Date(report.createdAt), 'MMM d, yyyy')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#3A366E] mb-2">Last modified</h3>
            <p className="text-xs text-[#4C5760]">
              {format(new Date(report.updatedAt), 'MMM d, yyyy h:mm a')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#3A366E] mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {report.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-[#F7F5F2] text-[#4C5760] rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#3A366E] mb-2">Shared with</h3>
            <div className="space-y-2">
              {report.sharing.map(share => (
                <div
                  key={share.userId}
                  className="flex items-center justify-between p-2 bg-[#F7F5F2] rounded-md"
                >
                  <span className="text-sm text-[#4C5760]">{share.userName}</span>
                  <span className="text-xs px-2 py-1 bg-white text-[#4C5760] rounded">
                    {share.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#A7CEBC] pt-6">
          <h3 className="text-sm font-medium text-[#3A366E] mb-4">Content</h3>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-[#4C5760]">
              {report.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail; 