import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import ImageGrid from "../components/ImageGrid";
import BulkActionBar from "../components/BulkActionBar";
import { io } from "socket.io-client";
import { SERVER_API_BASE_URL } from "../constants/constant";
import {
  fetchImages,
  toggleImagesVisibility,
  moveImagesToFolder,
  deleteImages,
  reorderImages,
} from "../api/image-api";
import { createFolder, deleteFolder, fetchFolders, reorderFolders } from "../api/folder-api";
import { Folder, Image } from "../types/types";
import FolderList from "../components/FolderList";
import TruncatedTextWithTooltip from "../components/TruncatedTextWithTooltip";

const socket = io(SERVER_API_BASE_URL);

export default function DashboardPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [moveToFolderId, setMoveToFolderId] = useState("");
  const [draggedImageId, setDraggedImageId] = useState<number | null>(null);
  const [showHidden, setShowHidden] = useState(false);

  const refreshImages = () => {
    fetchImages(selectedFolder, { isVisible: !showHidden }).then(setImages);
  };

  useEffect(() => {
    fetchFolders().then(setFolders);
  }, []);

  useEffect(() => {
    refreshImages();
  }, [selectedFolder, showHidden]);

  useEffect(() => {
    socket.on("image_uploaded", refreshImages);
    socket.on("image_updated", refreshImages);
    socket.on("image_visibility_toggled", refreshImages);
    socket.on("images_reordered", refreshImages);
    socket.on("folder_created", () => fetchFolders().then(setFolders))
    socket.on('folders_reordered', () => fetchFolders().then(setFolders));

    return () => {
      socket.off("image_uploaded", refreshImages);
      socket.off("image_updated", refreshImages);
      socket.off("image_visibility_toggled", refreshImages);
      socket.off("images_reordered", refreshImages);
      socket.off("folder_created");
      socket.off('folders_reordered');
    };
  }, [selectedFolder, showHidden]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleImageVisibility = async (id: number) => {
    await toggleImagesVisibility([id]);
    refreshImages();
  };

  const handleDeleteImage = async (id: number) => {
    await deleteImages([id]);
    refreshImages();
  };

  const handleToggleVisibility = async () => {
    await toggleImagesVisibility(selectedIds);
    setSelectedIds([]);
    refreshImages();
  };

  const handleCreateFolder = async (name: string) => {
    await createFolder(name);
    fetchFolders().then(setFolders);
  };

  const handleDeleteFolder = async (folderId: number) => {
    await deleteFolder(folderId);
    fetchFolders().then(setFolders);
    refreshImages();
  };

  const handleMoveToFolder = async () => {
    if (!moveToFolderId) return;
    await moveImagesToFolder(selectedIds, Number(moveToFolderId));
    setSelectedIds([]);
    setMoveToFolderId("");
    refreshImages();
  };

  const handleDeleteSelected = async () => {
    await deleteImages(selectedIds);
    setSelectedIds([]);
    refreshImages();
  };

  const handleDragStart = (imageId: number) => {
    setDraggedImageId(imageId);
  };

  const handleDrop = async (folderId: number) => {
    if (draggedImageId) {
      await moveImagesToFolder([draggedImageId], folderId);
      setDraggedImageId(null);
      refreshImages();
    }
  };

  const handleReorder = async (updatedFolders: Folder[]) => {
    setFolders(updatedFolders);
    await reorderFolders(updatedFolders.map(folder => folder.id));
  };

  const handleReorderImages = async (imageIds: number[]) => {
    await reorderImages(imageIds);
    refreshImages();
  };
  

  const currentFolderName =
    selectedFolder && folders.length
      ? folders.find((f) => f.id.toString() === selectedFolder)?.name || "Unknown"
      : "Main Folder";

  return (
    <div className="p-6 space-y-4">
      <UploadForm folders={folders} onUpload={refreshImages} />

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-semibold text-gray-800">
          📁 Current Folder:{" "}
          <span className="font-normal inline-block align-middle"><TruncatedTextWithTooltip text={currentFolderName} maxLength={20} /></span>
        </div>

        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded shadow-sm">
            <label className="text-sm font-medium text-gray-700">
              Filter by Folder:
            </label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">Main Folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  <TruncatedTextWithTooltip text={folder.name} />
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowHidden((prev) => !prev)}
            className={`px-4 py-2 rounded text-sm font-medium shadow-sm transition ${
              showHidden
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {showHidden ? "✅ Showing Hidden Icons" : "🙈 Show Hidden Icons"}
          </button>
        </div>
      </div>

      {selectedIds.length > 0 && !showHidden && (
        <BulkActionBar
          selectedIds={selectedIds}
          folders={folders}
          moveToFolderId={moveToFolderId}
          setMoveToFolderId={setMoveToFolderId}
          onMove={handleMoveToFolder}
          onToggle={handleToggleVisibility}
          onDelete={handleDeleteSelected}
          onClear={() => setSelectedIds([])}
        />
      )}

      <ImageGrid
        images={images}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onDragStart={handleDragStart}
        onDelete={handleDeleteImage}
        onToggleVisibility={handleToggleImageVisibility}
        onReorder={handleReorderImages}
      />

      <FolderList
        folders={folders}
        onDelete={handleDeleteFolder}
        onCreate={handleCreateFolder}
        onDropImage={handleDrop}
        onReorder={handleReorder}
      />
    </div>
  );
}
