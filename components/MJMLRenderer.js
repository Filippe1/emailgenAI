import { useState } from 'react';

export default function MJMLRenderer() {
  const [mjml, setMjml] = useState(`<mjml>
  <mj-body>
    <mj-container>
      <mj-section>
        <mj-column>
          <mj-text>Hello World</mj-text>
        </mj-column>
      </mj-section>
    </mj-container>
  </mj-body>
</mjml>`);
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/render-mjml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mjml }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to render MJML');
      }

      const data = await response.json();
      setHtml(data.html);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>MJML Renderer</h1>
      
      <div className="editor-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mjml">MJML Code:</label>
            <textarea
              id="mjml"
              value={mjml}
              onChange={(e) => setMjml(e.target.value)}
              rows={15}
              style={{ width: '100%', fontFamily: 'monospace' }}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Rendering...' : 'Render MJML'}
          </button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      {html && (
        <div className="result-container">
          <h2>Rendered HTML:</h2>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          
          <h2>HTML Source:</h2>
          <pre>{html}</pre>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .editor-container {
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .error {
          color: red;
          margin-bottom: 20px;
        }
        .result-container {
          margin-top: 30px;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        pre {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}