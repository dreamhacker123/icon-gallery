import { Request, Response } from 'express';
import { Image } from '../models/image.model';
import { emitUpdate } from '../socket';

export const deleteImages = async (req: Request, res: Response) => {
  try {
    const { imageIds } = req.body;

    if (!Array.isArray(imageIds) || imageIds.length === 0) {
      return res.status(400).json({ error: 'imageIds are required' });
    }

    const images = await Image.findAll({ where: { id: imageIds } });

    await Image.destroy({ where: { id: imageIds } });

    images.forEach((img) => emitUpdate('image_deleted', img.id));
    res.status(200).json({ message: 'Images deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete images' });
  }
};