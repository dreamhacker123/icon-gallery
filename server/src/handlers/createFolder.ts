import { Request, Response } from 'express';
import { Folder } from '../models/folder.model';
import { emitUpdate } from '../socket';

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Folder name is required' });
    }

    const existing = await Folder.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ error: 'Folder with this name already exists' });
    }

    const folder = await Folder.create({ name });

    emitUpdate('folder_created', folder);
    res.status(201).json(folder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create folder' });
  }
};
