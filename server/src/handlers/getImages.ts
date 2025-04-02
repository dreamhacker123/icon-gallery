import { Request, Response } from 'express';
import { Image } from '../models/image.model';

export const getImages = async (req: Request, res: Response) => {
  try {
    const { folderId, visible } = req.query;

    const where: any = {};

    if (folderId) where.folderId = isNaN(Number(folderId))?null:Number(folderId);
    if (visible !== undefined) where.isVisible = visible === 'true';

    const images = await Image.findAll({
      where,
      order: [['order', 'ASC'],['createdAt', 'DESC']],
    });

    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
