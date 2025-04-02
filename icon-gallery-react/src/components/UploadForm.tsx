import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { SERVER_API_BASE_URL } from '../constants/constant';

const socket = io(SERVER_API_BASE_URL);

interface Props {
  folders: any[];
  onUpload: () => void;
}

export default function UploadForm({ folders, onUpload }: Props) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [folderId, setFolderId] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!file || !title) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', file);
    if (folderId) formData.append('folderId', folderId);

    await fetch(`${SERVER_API_BASE_URL}/images`, {
      method: 'POST',
      body: formData,
    });

    setTitle('');
    setFile(null);
    setFolderId('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUpload();
  };

  useEffect(() => {
    socket.on('image_uploaded', onUpload);
    return () => {
      socket.off('image_uploaded', onUpload);
    };
  }, [onUpload]);

  return (
    <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 bg-blue-50 shadow-sm">
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 rounded w-40"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border px-2 py-1 rounded w-48"
        />
        <select
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="border px-2 py-1 rounded w-40"
        >
          <option value="">No Folder</option>
          {folders.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
