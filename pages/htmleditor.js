// components/HTMLEditor.js
import { useState } from 'react';

export default function HTMLEditor() {
  const [html, setHtml] = useState('<h1>Hello World</h1><p>Edit me!</p>');
  
  return (
    <div className="editor-container">
      <div className="editor-column">
        <h2>Editor</h2>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="editor-textarea"
        />
      </div>
      <div className="editor-column">
        <h2>Preview</h2>
        <div 
          className="preview-area"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}