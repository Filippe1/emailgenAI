// components/MonacoEditor.js
import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function MonacoEditor() {
  const [html, setHtml] = useState('<h1>Hello World</h1><p>Edit me!</p>');
  
  return (
    <div className="flex h-screen p-4 gap-4">
      {/* Editor Column */}
      <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
        <h2 className="p-2 bg-gray-100 font-semibold">Editor</h2>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>
      
      {/* Preview Column */}
      <div className="flex-1 flex flex-col border rounded-lg overflow-hidden">
        <h2 className="p-2 bg-gray-100 font-semibold">Preview</h2>
        <div 
          className="flex-1 p-4 overflow-auto bg-white"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}