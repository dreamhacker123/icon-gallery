import { SERVER_API_BASE_URL } from '../constants/constant';

export const uploadImage = async (
  title: string,
  file: File,
  folderId?: string
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('image', file);
  if (folderId) formData.append('folderId', folderId);

  const res = await fetch(`${SERVER_API_BASE_URL}/images`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Image upload failed');
  }

  return await res.json();
};

export const fetchImages = async (
  folderId?: string,
  filters?: { isVisible: boolean }
) => {
  let url = `${SERVER_API_BASE_URL}/images`;

  const query = new URLSearchParams();

  // Add folder filter
  if (folderId) {
    query.append('folderId', folderId);
  } else {
    query.append('folderId', 'null'); // for images without folder
  }

  // Add visibility filter
  if (filters?.isVisible === false) {
    query.append('visible', 'false');
  } else if (filters?.isVisible === true) {
    query.append('visible', 'true');
  }

  // Append query string
  url += `?${query.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch images');
  return res.json();
};




/**
 * Toggle image visibility
 */
export const toggleImagesVisibility = async (imageIds: number[]) => {
  const res = await fetch(`${SERVER_API_BASE_URL}/images/toggle-visibility`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageIds }),
  });

  if (!res.ok) {
    throw new Error('Failed to toggle visibility');
  }

  return res.json();
};

//Move Images
export const moveImagesToFolder = async (
  imageIds: number[],
  folderId: number
) => {
  const res = await fetch(`${SERVER_API_BASE_URL}/images/move`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageIds, folderId }),
  });

  if (!res.ok) {
    throw new Error('Failed to move images');
  }

  return res.json();
};

//Delete Images
export const deleteImages = async (imageIds: number[]) => {
  const res = await fetch(`${SERVER_API_BASE_URL}/images`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageIds }),
  });

  if (!res.ok) throw new Error('Failed to delete images');
  return res.json();
};

//Re-order Images
export const reorderImages = async (imageIds: number[]) => {
  const res = await fetch(`${SERVER_API_BASE_URL}/images/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageIds }),
  });
  if (!res.ok) throw new Error('Failed to reorder images');
};


