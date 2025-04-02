import { Request, Response } from 'express';
import { Folder } from '../models/folder.model';
import { emitUpdate } from '../socket';

export const deleteFolders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const folder = await Folder.findByPk(id);
    if (!folder) return res.status(404).json({ error: 'Folder not found' });

    await folder.destroy();

    emitUpdate('folder_deleted', { id });
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete folder' });
  }
};
