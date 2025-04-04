import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Level } from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import Highlight from '@tiptap/extension-highlight';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { FileText, Type, Code, Bold, Italic, List, ListOrdered, Image as ImageIcon, Link as LinkIcon, Quote, Table as TableIcon, Strikethrough, Underline as UnderlineIcon, CheckSquare } from 'lucide-react';
import TurndownService from 'turndown';
import showdown from 'showdown';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_'
  });

  const markdownConverter = new showdown.Converter({
    tables: true,
    tasklists: true,
    strikethrough: true,
    emoji: true
  });

  const convertToMarkdown = useCallback((html: string) => {
    return turndownService.turndown(html);
  }, []);

  const convertToHtml = useCallback((markdown: string) => {
    return markdownConverter.makeHtml(markdown);
  }, []);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#D15F36] hover:text-[#BA4F2C] underline'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-md'
        }
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-[#F7F5F2] p-4 rounded-md font-mono text-sm'
        }
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-yellow-100'
        }
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-[#A7CEBC] pl-4 italic'
        }
      }),
      BulletList,
      OrderedList,
      TaskList,
      TaskItem.configure({
        nested: true
      }),
      Strike,
      Underline,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full'
        }
      }),
      TableRow,
      TableCell,
      TableHeader
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      if (isMarkdownMode) {
        setMarkdownContent(convertToMarkdown(html));
      }
    },
  });

  useEffect(() => {
    if (editor && !isMarkdownMode) {
      editor.commands.setContent(content);
    }
  }, [content, editor, isMarkdownMode]);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setMarkdownContent(newMarkdown);
    const html = convertToHtml(newMarkdown);
    onChange(html);
  };

  const toggleMode = () => {
    setIsMarkdownMode(!isMarkdownMode);
    if (isMarkdownMode && editor) {
      const html = convertToHtml(markdownContent);
      editor.commands.setContent(html);
    } else if (editor) {
      const markdown = convertToMarkdown(editor.getHTML());
      setMarkdownContent(markdown);
    }
  };

  return (
    <div className="border border-[#A7CEBC] rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b border-[#A7CEBC] p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isMarkdownMode && (
            <>
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('bold') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('italic') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('strike') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <Strikethrough className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('underline') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <UnderlineIcon className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-[#A7CEBC] mx-2" />
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('bulletList') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('orderedList') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleTaskList().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('taskList') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <CheckSquare className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-[#A7CEBC] mx-2" />
              <select
                onChange={(e) => {
                  if (e.target.value === 'paragraph') {
                    editor?.chain().focus().setParagraph().run();
                  } else {
                    editor?.chain().focus().toggleHeading({ level: parseInt(e.target.value) as Level }).run();
                  }
                }}
                className="text-sm border border-[#A7CEBC] rounded px-2 py-1"
              >
                <option value="paragraph">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
              </select>
              <div className="h-4 w-px bg-[#A7CEBC] mx-2" />
              <button
                onClick={() => {
                  const url = window.prompt('Enter link URL:');
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('link') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('Enter image URL:');
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
                className="p-1 rounded hover:bg-[#F7F5F2]"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('blockquote') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('codeBlock') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  editor?.chain().focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run();
                }}
                className={`p-1 rounded hover:bg-[#F7F5F2] ${editor?.isActive('table') ? 'bg-[#F7F5F2]' : ''}`}
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
        <button
          onClick={toggleMode}
          className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-[#F7F5F2]"
        >
          {isMarkdownMode ? (
            <>
              <Type className="w-4 h-4" />
              <span className="text-sm">WYSIWYG</span>
            </>
          ) : (
            <>
              <Code className="w-4 h-4" />
              <span className="text-sm">Markdown</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        {isMarkdownMode ? (
          <textarea
            value={markdownContent}
            onChange={handleMarkdownChange}
            className="w-full h-[calc(100vh-400px)] p-4 font-mono text-sm focus:outline-none"
            placeholder="Write your content in Markdown..."
          />
        ) : (
          <EditorContent 
            editor={editor} 
            className="prose max-w-none p-4 min-h-[calc(100vh-400px)]"
          />
        )}
      </div>
    </div>
  );
};

export default RichTextEditor; 