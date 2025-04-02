import { useState } from 'react';
import { Folder } from '../types/types';

interface Props {
  folders: Folder[];
  onDelete: (folderId: number) => void;
  onCreate: (name: string) => void;
}

export default function FolderList({ folders, onDelete, onCreate }: Props) {
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreate = () => {
    if (!newFolderName.trim()) return;
    onCreate(newFolderName.trim());
    setNewFolderName('');
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">📁 Folders</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Create
        </button>
      </div>

      <ul className="space-y-2">
        {folders.map((folder) => (
          <li
            key={folder.id}
            className="flex justify-between items-center border px-4 py-2 rounded shadow-sm"
          >
            <span>{folder.name}</span>
            <button
              onClick={() => onDelete(folder.id)}
              className="text-sm bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
