import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Button } from './Button';

export function Header() {
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    setLoading(true);
    setError('');

    try {
      await axios.post('https://querypdf.onrender.com/upload_pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedFileName(acceptedFiles[0].name);
      alert('File uploaded and processed successfully');
    } catch (err) {
      setError('Failed to upload file');
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex justify-between items-center p-4 shadow bg-white fixed w-full z-10">
      {/* Left: Title */}
      <div className="flex-1">
        <span className="tracking-tighter font-bold text-2xl">SmartDoc Q&A</span>
      </div>

      {/* Center: Upload Button */}
      <div className="flex-1 flex justify-center" {...getRootProps()}>
        <input {...getInputProps()} aria-label="Upload PDF" className="hidden" />
        <Button>{loading ? 'Processing...' : 'Upload PDF'}</Button>
      </div>

      {/* Right: File Name or Error */}
      <div className="flex-1 flex justify-end items-center">
        {uploadedFileName && (
          <div className="bg-green-200 text-gray-700 font-semibold px-3 py-1 rounded-md truncate max-w-[150px]">
            {uploadedFileName}
          </div>
        )}
        {error && (
          <div className="text-red-500 ml-2 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
