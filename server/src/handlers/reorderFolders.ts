import { Request, Response } from 'express';
import { Folder } from '../models/folder.model';
import { emitUpdate } from '../socket'; // Make sure emitUpdate is correctly imported

export const reorderFolders = async (req: Request, res: Response) => {
  const { folderIds } = req.body as { folderIds: number[] };

  if (!Array.isArray(folderIds) || !folderIds.every(id => typeof id === 'number')) {
    return res.status(400).json({ error: 'folderIds must be an array of numbers' });
  }

  try {
    // Update the order of the folders in the database
    await Promise.all(
      folderIds.map((id, index) =>
        Folder.update({ order: index }, { where: { id } })
      )
    );

    // Emit the update to notify the frontend of the change
    emitUpdate('folders_reordered', folderIds);

    res.status(200).json({ message: 'Folders reordered successfully' });
  } catch (error) {
    console.error('Reorder error:', error);
    res.status(500).json({ error: 'Failed to reorder folders' });
  }
};
