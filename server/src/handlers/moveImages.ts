import { Request, Response } from 'express';
import { Image } from '../models/image.model';
import { emitUpdate } from '../socket';

export const moveImages = async (req: Request, res: Response) => {
  try {
    const { imageIds, folderId } = req.body;

    if (!Array.isArray(imageIds) || imageIds.length === 0 || folderId === undefined) {
      return res.status(400).json({ error: 'imageIds and folderId are required' });
    }

    await Image.update(
      { folderId: folderId || null },
      { where: { id: imageIds } }
    );

    // Optional: Emit each update
    const movedImages = await Image.findAll({ where: { id: imageIds } });
    movedImages.forEach((img) => emitUpdate('image_updated', img));

    res.status(200).json({ message: 'Images moved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to move images' });
  }
};
