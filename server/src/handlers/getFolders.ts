import { Request, Response } from 'express';
import  {Folder}  from '../models/folder.model';

export const getFolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.findAll({
      attributes: ['id', 'name'],
      order: [['order', 'ASC'],['createdAt', 'DESC']],
    });
    res.status(200).json(folders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
};
