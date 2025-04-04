import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockReports } from '../../mock-data/reports';
import { ReportFormat } from '../../types/reports';
import RichTextEditor from './RichTextEditor';
import TabularEditor from './TabularEditor';

interface ReportEditorProps {
  mode: 'create' | 'edit';
}

const ReportEditor: React.FC<ReportEditorProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { projectId, reportId } = useParams();
  
  const existingReport = mode === 'edit' && reportId ? 
    mockReports.find(r => r.id === reportId) : null;

  const [title, setTitle] = useState(existingReport?.title || '');
  const [content, setContent] = useState(existingReport?.content || '');
  const [format, setFormat] = useState<ReportFormat>(existingReport?.format || 'Narrative');
  const [tags, setTags] = useState<string[]>(existingReport?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const handleSave = () => {
    // In a real app, this would make an API call to save the report
    console.log('Saving report:', { title, content, format, tags });
    navigate(`/project/${projectId}/reports`);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value as ReportFormat);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-[#A7CEBC] p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">
            {mode === 'create' ? 'New Report' : 'Edit Report'}
          </h1>
          <div className="space-x-2">
            <button
              onClick={() => navigate(`/project/${projectId}/reports`)}
              className="px-4 py-2 text-sm border border-[#A7CEBC] rounded-md hover:bg-[#F7F5F2]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-[#D15F36] text-white rounded-md hover:bg-[#BA4F2C]"
            >
              Save Report
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Report Title"
            className="w-full text-xl p-2 border border-[#A7CEBC] rounded-md"
          />

          <div className="flex items-center gap-2">
            <label htmlFor="format" className="text-sm font-medium text-[#4C5760]">
              Format:
            </label>
            <select
              id="format"
              value={format}
              onChange={handleFormatChange}
              className="p-2 border border-[#A7CEBC] rounded-md text-sm"
            >
              <option value="Narrative">Narrative</option>
              <option value="Tabular">Tabular</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-[#F7F5F2] rounded-md text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-[#D15F36] hover:text-[#BA4F2C]"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tags..."
              className="px-2 py-1 text-sm border border-[#A7CEBC] rounded-md focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {format === 'Narrative' ? (
          <RichTextEditor
            content={content}
            onChange={handleContentChange}
          />
        ) : (
          <TabularEditor mode={mode} />
        )}
      </div>
    </div>
  );
};

export default ReportEditor; 