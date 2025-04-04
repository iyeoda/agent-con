import React, { useState } from 'react';
import { Report, ReportCategory, ReportFormat } from '../../types/reports';
import { reportCategories, reportFormats } from '../../mock-data/reports';

interface ReportEditorProps {
  report?: Report;
  onSave: (report: Partial<Report>) => void;
  onClose: () => void;
}

const ReportEditor: React.FC<ReportEditorProps> = ({ report, onSave, onClose }) => {
  const [title, setTitle] = useState(report?.title || '');
  const [content, setContent] = useState(report?.content || '');
  const [category, setCategory] = useState<ReportCategory>(report?.category || 'Project Status');
  const [format, setFormat] = useState<ReportFormat>(report?.format || 'Narrative');
  const [tags, setTags] = useState<string[]>(report?.tags || []);

  const handleSave = () => {
    onSave({
      title,
      content,
      category,
      format,
      tags,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="flex h-screen">
      {/* Main Editor */}
      <div className="flex-1 bg-white p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Report Title"
            className="w-full text-2xl font-semibold text-[#3A366E] mb-6 p-2 border-b border-[#A7CEBC] focus:outline-none"
          />

          <div className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your report..."
              className="w-full h-[calc(100vh-200px)] p-4 border border-[#A7CEBC] rounded-md focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-[320px] bg-[#F7F5F2] border-l border-[#A7CEBC] p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#3A366E]">Properties</h2>
          <button
            onClick={onClose}
            className="text-[#4C5760] hover:text-[#3A366E]"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#3A366E] mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ReportCategory)}
              className="w-full p-2 border border-[#A7CEBC] rounded-md"
            >
              {reportCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A366E] mb-2">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ReportFormat)}
              className="w-full p-2 border border-[#A7CEBC] rounded-md"
            >
              {reportFormats.map(fmt => (
                <option key={fmt} value={fmt}>{fmt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A366E] mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags.join(', ')}
              onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
              placeholder="Add tags separated by commas"
              className="w-full p-2 border border-[#A7CEBC] rounded-md"
            />
          </div>

          <div className="pt-4 border-t border-[#A7CEBC]">
            <h3 className="text-sm font-medium text-[#3A366E] mb-4">AI Assistance</h3>
            <button className="w-full mb-2 p-2 text-left text-sm text-[#4C5760] hover:bg-white rounded-md transition-colors">
              🪄 Suggest improvements
            </button>
            <button className="w-full mb-2 p-2 text-left text-sm text-[#4C5760] hover:bg-white rounded-md transition-colors">
              📝 Generate next section
            </button>
            <button className="w-full p-2 text-left text-sm text-[#4C5760] hover:bg-white rounded-md transition-colors">
              📊 Create chart from data
            </button>
          </div>

          <div className="pt-4 border-t border-[#A7CEBC]">
            <button
              onClick={handleSave}
              className="w-full bg-[#D15F36] text-white py-2 rounded-md hover:bg-opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportEditor; 