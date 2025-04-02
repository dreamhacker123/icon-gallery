import { useState } from "react";
import { Folder } from "../types/types";
import { Folder as FolderIcon, Trash2 } from "lucide-react";
import TruncatedTextWithTooltip from "./TruncatedTextWithTooltip";

interface Props {
  folders: Folder[];
  onDelete: (folderId: number) => void;
  onCreate: (name: string) => void;
  onDropImage: (folderId: number, imageId: number) => void;
  onReorder: (updatedFolders: Folder[]) => void;
}

export default function FolderList({
  folders,
  onDelete,
  onCreate,
  onDropImage,
  onReorder,
}: Props) {
  const [newFolderName, setNewFolderName] = useState("");
  const [highlightedFolderId, setHighlightedFolderId] = useState<number | null>(null);
  const [draggedFolderId, setDraggedFolderId] = useState<number | null>(null);

  const handleCreate = () => {
    if (!newFolderName.trim()) return;
    onCreate(newFolderName.trim());
    setNewFolderName("");
  };

  const handleDragStart = (e: React.DragEvent, id: number, type: "image" | "folder") => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("id", id.toString());
    setDraggedFolderId(type === "folder" ? id : null);
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const draggedId = parseInt(e.dataTransfer.getData("id"), 10);

    if (type === "folder") {
      handleFolderDrop(draggedId, targetId);
    } else{
      
      onDropImage(targetId, draggedId);
    }
    setHighlightedFolderId(null);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleFolderDrop = (sourceId: number, targetId: number) => {
    if (sourceId === targetId) return;

    const currentIndex = folders.findIndex((f) => f.id === sourceId);
    const targetIndex = folders.findIndex((f) => f.id === targetId);

    const reordered = [...folders];
    const [dragged] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, dragged);

    onReorder(reordered);
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

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            draggable
            onDragStart={(e) => handleDragStart(e, folder.id, "folder")}
            onDrop={(e) => handleDrop(e, folder.id)}
            onDragOver={handleDragOver}
            onDragEnter={() => setHighlightedFolderId(folder.id)}
            onDragLeave={() => setHighlightedFolderId(null)}
            className={`relative border rounded-lg shadow-sm bg-white hover:shadow-md transition flex flex-col justify-center items-center p-2 ${
              highlightedFolderId === folder.id ? "ring-2 ring-green-400" : ""
            }`}
            style={{ aspectRatio: "1 / 1", minHeight: "120px" }}
          >
            <FolderIcon size={80} className="text-gray-400 mb-auto mt-4" />
            <div className="flex items-center justify-between w-full px-2 mt-auto mb-2 text-sm">
              <TruncatedTextWithTooltip text={folder.name} />
              <button
                onClick={() => onDelete(folder.id)}
                className="text-red-500 hover:text-red-700 ml-2"
                title="Delete Folder"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
