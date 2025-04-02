import { useRef, useState } from "react";
import { Image } from "../types/types";
import ImageCard from "./ImageCard";

interface Props {
  images: Image[];
  selectedIds: number[];
  onSelect: (id: number) => void;
  onDragStart?: (imageId: number) => void;
  onDelete?: (id: number) => void;
  onToggleVisibility?: (id: number) => void;
  onReorder: (newOrder: number[]) => void;
}

export default function ImageGrid({
  images,
  selectedIds,
  onSelect,
  onDragStart,
  onDelete,
  onToggleVisibility,
  onReorder,
}: Props) {
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm mt-10">
        No Images in this folder 🖼️
      </div>
    );
  }

  const handleDragStart = (id: number) => {
    setDraggedId(id);
    onDragStart?.(id);
  };

  const handleDrop = (targetId: number) => {
    if (draggedId === null || draggedId === targetId) return;

    const currentIndex = images.findIndex((img) => img.id === draggedId);
    const targetIndex = images.findIndex((img) => img.id === targetId);

    const reordered = [...images];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    const newOrder = reordered.map((img) => img.id);
    onReorder(newOrder);

    setDraggedId(null);
  };

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      {images.map((img) => (
        <div
          key={img.id}
          draggable
          onDragStart={() => handleDragStart(img.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(img.id)}
        >
          <ImageCard
            image={img}
            selected={selectedIds.includes(img.id)}
            onSelect={onSelect}
            onDelete={onDelete}
            onToggleVisibility={onToggleVisibility}
          />
        </div>
      ))}
    </div>
  );
}
