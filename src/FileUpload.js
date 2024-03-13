import React, { useState, useRef } from 'react';
import UserService from './UserService';
import { Card, Alert, Spinner } from 'react-bootstrap';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    handlePreview(selectedFile);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    handlePreview(droppedFile);
  };

  const handlePreview = (selectedFile) => {
    // Generate preview for image files
    if (selectedFile && selectedFile.type.includes('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        setUploading(true);
        const response = await UserService.uploadFile(formData);
        console.log('File uploaded:', response.data);
        // Reset form after successful upload
        setUploadSuccess(true);
        setFile(null);
        setPreview(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
        setTimeout(() => setUploadSuccess(false), 3000); // Hide success message after 3 seconds
      }
    } else {
      console.error('No file selected.');
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${dragging ? 'dragging' : ''}`}
      style={{ minHeight: '100vh' }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Card style={{ width: '500px',minHeight: '40vh', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        <Card.Body className='text-center'>
          <h2 className="text-center">Upload File</h2>
          {uploadSuccess && (
            <Alert variant="success" onClose={() => setUploadSuccess(false)} dismissible>
              <Spinner animation="border" size="sm" /> File uploaded successfully!
            </Alert>
          )}
          <div className="text-center">
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
            <div
              className="drop-area"
              onClick={handleClickFileInput}
            >
              {dragging ? <p>Drop file here</p> : <p>Drag & Drop file here</p>} or <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleClickFileInput}>browse your file</span>
            </div>
            {preview && <img src={preview} alt="File Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
            <button className={`btn btn-primary mt-3 ${uploading ? 'disabled' : ''}`} onClick={handleUpload} disabled={!file || uploading}>
              <strong>{uploading ? <><Spinner animation="border" size="sm" /> Uploading...</> : 'Upload'}</strong>
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FileUpload;
