import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImages, reorderImages } from '../api/image-api';
import { Image } from '../types/types';
import ImageGrid from '../components/ImageGrid';

export default function FolderPage() {
  const { folderId } = useParams();
  const [images, setImages] = useState<Image[]>([]);

  const refreshImages = () => {
    if (folderId) {
      fetchImages(folderId).then(setImages);
    }
  };

  useEffect(() => {
    refreshImages();
  }, [folderId]);

  const handleReorder = async (imageIds: number[]) => {
    await reorderImages(imageIds);
    refreshImages();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">🗂️ Images in Folder {folderId}</h1>
      <ImageGrid
        images={images}
        selectedIds={[]}
        onSelect={() => {}}
        onReorder={handleReorder}
      />
    </div>
  );
}
