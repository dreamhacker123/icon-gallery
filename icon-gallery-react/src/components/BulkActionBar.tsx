import { Folder } from '../types/types';

interface Props {
  selectedIds: number[];
  folders: Folder[];
  moveToFolderId: string;
  setMoveToFolderId: (id: string) => void;
  onMove: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export default function BulkActionBar({
  selectedIds,
  folders,
  moveToFolderId,
  setMoveToFolderId,
  onMove,
  onToggle,
  onDelete,
  onClear,
}: Props) {
  return (
    <div className="flex gap-4 items-center bg-gray-100 p-2 rounded">
      <span>{selectedIds.length} selected</span>

      <button onClick={onToggle} className="bg-blue-500 text-white px-3 py-1 rounded">
        Toggle Visibility
      </button>

      <select
        value={moveToFolderId}
        onChange={(e) => setMoveToFolderId(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">Move to Folder</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>

      <button onClick={onMove} className="bg-green-500 text-white px-3 py-1 rounded">
        Move
      </button>

      <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>

      <button onClick={onClear} className="bg-gray-300 px-2 py-1 rounded">
        Clear
      </button>
    </div>
  );
}
