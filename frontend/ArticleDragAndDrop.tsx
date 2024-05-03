import { useState, useCallback } from 'react';
import axios from 'axios';

class ArticleDragAndDropProps {
    uploadEndpoint: string;
    onGenerating: (id: string) => void;
}

// Define a type for the file details state
type FileDetails = {
  name: string;
  size: number;
} | null;

function ArticleDragAndDrop(props: ArticleDragAndDropProps) {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [fileDetails, setFileDetails] = useState<FileDetails>(null);
  const [file, setFile] = useState<File>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      setFileDetails({ name: file.name, size: file.size });
      setFile(file);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // 'file' is the key expected by the server

    try {
      const response = await axios.post(props.uploadEndpoint, formData);
      props.onGenerating(response.data.JobId);
      setUploaded(true);
    } catch (error) {
      alert(`Failed to upload file: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        borderRadius: '20px',
        position: 'relative',
        border: dragOver ? '2px solid #3a6db5' : '2px dashed grey',
        padding: '20px',
        width: '300px',
        height: '200px',
        textAlign: 'center',
        color: dragOver ? '#3a6db5' : 'grey',
        // cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!!!fileDetails && <div>Drag and drop an article here</div>}
      {fileDetails && (
        <div>
          <p>File Name: {fileDetails.name}</p>
          <p>File Size: {fileDetails.size} bytes</p>
          {!uploaded && <button onClick={handleUpload}>Generate</button>}
        </div>
      )}
    </div>
  );
};

export default ArticleDragAndDrop;