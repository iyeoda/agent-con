import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockReports } from '../../mock-data/reports';
import { Plus, Trash2, Save, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface TabularEditorProps {
  mode: 'create' | 'edit';
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

const TabularEditor: React.FC<TabularEditorProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { projectId, reportId } = useParams();
  
  const existingReport = mode === 'edit' && reportId ? 
    mockReports.find(r => r.id === reportId) : null;

  const [title, setTitle] = useState(existingReport?.title || '');
  const [tags, setTags] = useState<string[]>(existingReport?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [rows, setRows] = useState<Row[]>(() => {
    // Initialize with a header row and 5 data rows if creating new
    if (mode === 'create') {
      return [
        {
          id: 'header-row',
          cells: Array(5).fill(null).map((_, i) => ({
            id: `header-${i}`,
            value: `Column ${i + 1}`,
            isHeader: true
          }))
        },
        ...Array(5).fill(null).map((_, rowIndex) => ({
          id: `row-${rowIndex}`,
          cells: Array(5).fill(null).map((_, colIndex) => ({
            id: `cell-${rowIndex}-${colIndex}`,
            value: '',
            isHeader: false
          }))
        }))
      ];
    }
    
    // If editing, try to parse existing content or use default
    if (existingReport?.content) {
      try {
        const parsedContent = JSON.parse(existingReport.content);
        if (Array.isArray(parsedContent) && parsedContent.length > 0) {
          return parsedContent;
        }
      } catch (e) {
        console.error('Failed to parse existing report content:', e);
      }
    }
    
    // Default if parsing fails
    return [
      {
        id: 'header-row',
        cells: Array(5).fill(null).map((_, i) => ({
          id: `header-${i}`,
          value: `Column ${i + 1}`,
          isHeader: true
        }))
      },
      ...Array(5).fill(null).map((_, rowIndex) => ({
        id: `row-${rowIndex}`,
        cells: Array(5).fill(null).map((_, colIndex) => ({
          id: `cell-${rowIndex}-${colIndex}`,
          value: '',
          isHeader: false
        }))
      }))
    ];
  });
  
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const handleSave = () => {
    // In a real app, this would make an API call to save the report
    const content = JSON.stringify(rows);
    console.log('Saving tabular report:', { title, content, tags });
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

  const handleCellChange = (rowId: string, cellId: string, value: string) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          cells: row.cells.map(cell => {
            if (cell.id === cellId) {
              return { ...cell, value };
            }
            return cell;
          })
        };
      }
      return row;
    }));
  };

  const handleAddRow = (position: 'before' | 'after', rowId: string) => {
    const rowIndex = rows.findIndex(row => row.id === rowId);
    if (rowIndex === -1) return;
    
    const insertIndex = position === 'before' ? rowIndex : rowIndex + 1;
    const newRowId = `row-${Date.now()}`;
    
    const newRow: Row = {
      id: newRowId,
      cells: rows[0].cells.map((_, colIndex) => ({
        id: `cell-${newRowId}-${colIndex}`,
        value: '',
        isHeader: false
      }))
    };
    
    const newRows = [...rows];
    newRows.splice(insertIndex, 0, newRow);
    setRows(newRows);
  };

  const handleAddColumn = (position: 'before' | 'after', columnIndex: number) => {
    const newRows = rows.map(row => {
      const newCells = [...row.cells];
      const insertIndex = position === 'before' ? columnIndex : columnIndex + 1;
      
      newCells.splice(insertIndex, 0, {
        id: `cell-${row.id}-${Date.now()}`,
        value: '',
        isHeader: row.id === 'header-row'
      });
      
      return { ...row, cells: newCells };
    });
    
    setRows(newRows);
  };

  const handleDeleteRow = (rowId: string) => {
    if (rows.length <= 2) return; // Keep at least header + 1 data row
    setRows(rows.filter(row => row.id !== rowId));
  };

  const handleDeleteColumn = (columnIndex: number) => {
    if (rows[0].cells.length <= 2) return; // Keep at least 2 columns
    setRows(rows.map(row => ({
      ...row,
      cells: row.cells.filter((_, i) => i !== columnIndex)
    })));
  };

  const handleCellKeyDown = (e: React.KeyboardEvent, rowIndex: number, cellIndex: number) => {
    const currentRow = rows[rowIndex];
    const currentCell = currentRow.cells[cellIndex];
    
    if (e.key === 'Enter') {
      e.preventDefault();
      // Move to next row, same column
      if (rowIndex < rows.length - 1) {
        const nextRow = rows[rowIndex + 1];
        const nextCell = nextRow.cells[cellIndex];
        setSelectedCell(nextCell.id);
        document.getElementById(nextCell.id)?.focus();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Move to next column, or next row if at end of row
      if (cellIndex < currentRow.cells.length - 1) {
        const nextCell = currentRow.cells[cellIndex + 1];
        setSelectedCell(nextCell.id);
        document.getElementById(nextCell.id)?.focus();
      } else if (rowIndex < rows.length - 1) {
        const nextRow = rows[rowIndex + 1];
        const nextCell = nextRow.cells[0];
        setSelectedCell(nextCell.id);
        document.getElementById(nextCell.id)?.focus();
      }
    } else if (e.key === 'ArrowUp' && rowIndex > 0) {
      e.preventDefault();
      const prevRow = rows[rowIndex - 1];
      const prevCell = prevRow.cells[cellIndex];
      setSelectedCell(prevCell.id);
      document.getElementById(prevCell.id)?.focus();
    } else if (e.key === 'ArrowDown' && rowIndex < rows.length - 1) {
      e.preventDefault();
      const nextRow = rows[rowIndex + 1];
      const nextCell = nextRow.cells[cellIndex];
      setSelectedCell(nextCell.id);
      document.getElementById(nextCell.id)?.focus();
    } else if (e.key === 'ArrowLeft' && cellIndex > 0) {
      e.preventDefault();
      const prevCell = currentRow.cells[cellIndex - 1];
      setSelectedCell(prevCell.id);
      document.getElementById(prevCell.id)?.focus();
    } else if (e.key === 'ArrowRight' && cellIndex < currentRow.cells.length - 1) {
      e.preventDefault();
      const nextCell = currentRow.cells[cellIndex + 1];
      setSelectedCell(nextCell.id);
      document.getElementById(nextCell.id)?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-auto p-4">
        <div className="border border-[#A7CEBC] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={row.id} className="group">
                    {row.cells.map((cell, cellIndex) => (
                      <td 
                        key={cell.id}
                        className={`
                          border border-[#A7CEBC] p-2 min-w-[120px] relative
                          ${cell.isHeader ? 'bg-[#F7F5F2] font-semibold' : ''}
                          ${selectedCell === cell.id ? 'ring-2 ring-[#D15F36]' : ''}
                          ${selectedRow === row.id ? 'bg-[#F7F5F2] bg-opacity-50' : ''}
                          ${selectedColumn === cellIndex ? 'bg-[#F7F5F2] bg-opacity-50' : ''}
                        `}
                        onClick={() => setSelectedCell(cell.id)}
                        onMouseEnter={() => {
                          setSelectedRow(row.id);
                          setSelectedColumn(cellIndex);
                        }}
                        onMouseLeave={() => {
                          setSelectedRow(null);
                          setSelectedColumn(null);
                        }}
                      >
                        <input
                          id={cell.id}
                          type="text"
                          value={cell.value}
                          onChange={(e) => handleCellChange(row.id, cell.id, e.target.value)}
                          onKeyDown={(e) => handleCellKeyDown(e, rowIndex, cellIndex)}
                          className={`
                            w-full bg-transparent border-none focus:outline-none
                            ${cell.isHeader ? 'font-semibold' : ''}
                          `}
                        />
                        
                        {/* Row actions */}
                        {rowIndex > 0 && (
                          <div className="absolute left-0 top-0 -ml-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleAddRow('before', row.id)}
                              className="p-1 text-[#4C5760] hover:text-[#D15F36]"
                              title="Add row above"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRow(row.id)}
                              className="p-1 text-[#4C5760] hover:text-[#D15F36]"
                              title="Delete row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAddRow('after', row.id)}
                              className="p-1 text-[#4C5760] hover:text-[#D15F36]"
                              title="Add row below"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        
                        {/* Column actions */}
                        {cellIndex > 0 && rowIndex === 0 && (
                          <div className="absolute top-0 left-0 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex">
                            <button
                              onClick={() => handleAddColumn('before', cellIndex)}
                              className="p-1 text-[#4C5760] hover:text-[#D15F36]"
                              title="Add column to the left"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteColumn(cellIndex)}
                              className="p-1 text-[#4C5760] hover:text-[#D15F36]"
                              title="Delete column"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAddColumn('after', cellIndex)}
                              className="p-1 text-[#4C5760] hover:text-[#D15F36]"
                              title="Add column to the right"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              const lastRow = rows[rows.length - 1];
              handleAddRow('after', lastRow.id);
            }}
            className="flex items-center gap-1 px-3 py-1 text-sm border border-[#A7CEBC] rounded-md hover:bg-[#F7F5F2]"
          >
            <Plus className="w-4 h-4" />
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabularEditor; 