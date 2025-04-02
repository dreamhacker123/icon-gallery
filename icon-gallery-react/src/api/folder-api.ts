import { SERVER_API_BASE_URL } from '../constants/constant';

export const fetchFolders = async () => {
  const res = await fetch(`${SERVER_API_BASE_URL}/folders`);
  if (!res.ok) throw new Error('Failed to fetch folders');
  return res.json();
};

export const deleteFolder = async (folderId: number) => {
    const res = await fetch(`${SERVER_API_BASE_URL}/folders/${folderId}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) throw new Error('Failed to delete folder');
    return res.json();
  };

  // Create a new folder
export const createFolder = async (name: string) => {

    const res = await fetch(`${SERVER_API_BASE_URL}/folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
  
    if (!res.ok) throw new Error('Failed to create folder');
    return res.json();
  };
  
//Reorder folders

export const reorderFolders = async (folderIds: number[]) => {
    const res = await fetch(`${SERVER_API_BASE_URL}/folders/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderIds }),
    });
  
    if (!res.ok) throw new Error('Failed to reorder folders');
  };

