import React, { useState, useEffect } from 'react';

function NotebookRenderer() {
  const [notebookData, setNotebookData] = useState(null);

  useEffect(() => {
    // Load the notebook JSON file
    fetch('/ab_data.csv')
      .then(response => response.json())
      .then(data => setNotebookData(data))
      .catch(error => console.error('Error loading notebook JSON:', error));
  }, []);

  const renderCell = (cell) => {
    if (cell.cell_type === 'code') {
      return (
        <pre>{cell.source.join('')}</pre>
      );
    } else if (cell.cell_type === 'markdown') {
      // Convert markdown source to HTML
      const markdownSource = cell.source.join('');
      return (
        <div dangerouslySetInnerHTML={{ __html: markdownSource }} />
      );
    } else {
      return null; // Handle other cell types as needed
    }
  };

  return (
    <div>
      <h1>Rendered Jupyter Notebook</h1>
      {notebookData && (
        <div>
          {notebookData.cells.map((cell, index) => (
            <div key={index}>
              {renderCell(cell)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotebookRenderer;
