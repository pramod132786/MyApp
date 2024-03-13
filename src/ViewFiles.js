import React, { useState, useEffect } from 'react';
import UserService from './UserService';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ViewFiles = () => {
  const [files, setFiles] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  useEffect(() => {
    // Fetch files from backend
    UserService.getAllFiles()
      .then(response => {
        console.log(response.data);
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const handleView = (fileName, fileType) => {
    // Conditionally handle viewing based on file type
    if (fileType === 'mp4') {
      // Redirect to the specified URL for MP4 files
      window.open(`http://localhost:9003/file/get?fileName=${fileName}`);
    } else {
      // Open file in new tab for viewing
      UserService.viewFile(fileName)
        .then(response => {
          window.open(URL.createObjectURL(response.data));
        })
        .catch(error => {
          console.error('Error viewing file:', error);
        });
    }
  };

  const handleDownload = (fileName) => {
    // Make request to download endpoint
    UserService.downloadFile(fileName)
      .then(response => {
        // Create a link and click it to trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  };

  const handleDelete = (id, fileName) => {
    setFileToDelete({ id, fileName });
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    const { id } = fileToDelete;
    // Handle delete functionality here
    UserService.deleteFile(id)
      .then(response => {
        console.log('File deleted:', response.data);
        // Update the state to reflect the deletion
        setFiles(files.filter(file => file.id !== id));
        setShowConfirmation(false);
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="container">
        <div className='d-flex justify-content-end'>
            <Link to="/fileupload" className='btn btn-primary mt-2'><i class="bi bi-cloud-upload"></i> upload</Link>
        </div>
      <h2 className='text-center text-primary'>User Total Files</h2>
      <div className='d-flex justify-content-center'>

      
      <table className="table table-center">
        <thead>
          <tr>
            <th>S.No</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{file.fileName}</td>
              <td>{file.fileType}</td>
              <td>
                <button className="btn btn-primary mr-2 me-2" onClick={() => handleView(file.fileName, file.fileType)}>
                  View
                </button>
                <button className="btn btn-success mr-2 me-2" onClick={() => handleDownload(file.fileName)}>
                  Download
                </button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(file.id, file.fileName)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {fileToDelete?.fileName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewFiles;
