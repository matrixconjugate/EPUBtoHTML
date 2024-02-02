// index.js
import { useState } from 'react';

const IndexPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('epubFile', file);

      const response = await fetch('/api/convertEpub', {
        method: 'POST',
        body: formData,
      });
       
      if (response.ok) {
        console.log('Conversion successful!');
      } else {
        console.error('Conversion failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>EPUB to HTML Converter</h1>
      <input type="file" accept=".epub" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Convert
      </button>
    </div>
  );
};

export default IndexPage;
