import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Report } from '../../types/reports';
import { format } from 'date-fns';
import { X, Edit2, Share2, Download, MoreVertical } from 'lucide-react';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
}

interface Cell {
  id: string;
  value: string;
  isHeader: boolean;
}

interface Row {
  id: string;
  cells: Cell[];
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, onClose }) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/project/${report.projectId}/reports/${report.id}/edit`);
  };

  const renderContent = () => {
    if (report.format === 'Tabular') {
      try {
        const rows = JSON.parse(report.content) as Row[];
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {row.cells.map((cell) => (
                      <td
                        key={cell.id}
                        className={`
                          border border-[#A7CEBC] p-2 min-w-[120px]
                          ${cell.isHeader ? 'bg-[#F7F5F2] font-semibold' : ''}
                        `}
                      >
                        {cell.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } catch (e) {
        console.error('Failed to parse tabular report content:', e);
        return <div className="text-[#D15F36]">Error displaying tabular data</div>;
      }
    }
    
    return (
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: report.content }}
      />
    );
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[480px] bg-white border-l border-[#A7CEBC] shadow-lg flex flex-col">
      <div className="border-b border-[#A7CEBC] p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">{report.title}</h2>
            <div className="flex items-center gap-2 text-sm text-[#4C5760]">
              <span>{report.projectName}</span>
              <span>•</span>
              <span>Created by {report.createdBy.name}</span>
              <span>•</span>
              <span>Last edited {format(new Date(report.updatedAt), 'MMM d, yyyy')}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#4C5760] hover:text-[#D15F36]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-3 py-1 text-sm border border-[#A7CEBC] rounded-md hover:bg-[#F7F5F2]"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm border border-[#A7CEBC] rounded-md hover:bg-[#F7F5F2]">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm border border-[#A7CEBC] rounded-md hover:bg-[#F7F5F2]">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="p-1 text-[#4C5760] hover:text-[#D15F36]">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {report.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {report.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-[#F7F5F2] rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail; 