import { useState } from 'react';
import { Eye, EyeOff, Trash2, ExternalLink } from 'lucide-react';
import { Image } from '../types/types';
import { SERVER_API_BASE_URL } from '../constants/constant';
import ConfirmModal from './ConfirmModal';
import TruncatedTextWithTooltip from './TruncatedTextWithTooltip';

interface Props {
  image: Image;
  selected: boolean;
  onSelect: (id: number) => void;
  onDragStart?: (id: number) => void;
  onToggleVisibility?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function ImageCard({
  image,
  selected,
  onSelect,
  onDragStart,
  onToggleVisibility,
  onDelete,
}: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showToggleConfirm, setShowToggleConfirm] = useState(false);

  const imageUrl = `${SERVER_API_BASE_URL}${image.imageUrl}`;

  return (
    <div
      className={`relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer ${
        selected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{ width: '200px', height: '250px' }}
      draggable={!!onDragStart}
      onDragStart={(e) => {
        e.dataTransfer.setData('imageId', image.id.toString());
        onDragStart?.(image.id);
      }}
    >
      <img
        src={imageUrl}
        alt={image.title}
        className="w-full h-[150px] object-cover"
        onClick={() => onSelect(image.id)}
      />

      <div className="flex items-center justify-between px-3 py-2 bg-white border-t text-sm h-[100px]">
        <TruncatedTextWithTooltip text={image.title} />
        <div className="flex gap-2 items-center">
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-gray-600 hover:text-green-600"
            title="View full image"
          >
            <ExternalLink size={18} />
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowToggleConfirm(true);
            }}
            className="text-gray-600 hover:text-blue-500"
            title="Toggle visibility"
          >
            {image.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirm(true);
            }}
            className="text-gray-600 hover:text-red-500"
            title="Delete image"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {showToggleConfirm && (
        <ConfirmModal
          message={image.isVisible ? 'Hide this icon?' : 'Show this icon?'}
          onConfirm={() => {
            onToggleVisibility?.(image.id);
            setShowToggleConfirm(false);
          }}
          onCancel={() => setShowToggleConfirm(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete?"
          onConfirm={() => {
            onDelete?.(image.id);
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
