// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [contentSnippet, setContentSnippet] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', event.target.file.files[0]);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      setContentSnippet(result.contentSnippet);
    } else {
      // Handle error
      console.error('Upload failed');
    }
  };

  return (
    <div>
      <h1>Upload an EPUB File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" required />
        <button type="submit">Upload File</button>
      </form>
      {contentSnippet && (
        <div>
          <h2>File Content Snippet</h2>
          <p>{contentSnippet}</p>
        </div>
      )}
    </div>
  );
}
