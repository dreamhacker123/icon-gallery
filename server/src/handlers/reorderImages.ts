import { Request, Response } from 'express';
import { Image } from '../models/image.model';
import { emitUpdate } from '../socket';

export const reorderImages = async (req: Request, res: Response) => {
  const { imageIds } = req.body as { imageIds: number[] };

  if (!Array.isArray(imageIds) || !imageIds.every(id => typeof id === 'number')) {
    return res.status(400).json({ error: 'imageIds must be an array of numbers' });
  }

  try {
    await Promise.all(
      imageIds.map((id, index) =>
        Image.update({ order: index }, { where: { id } })
      )
    );

    // ✅ Emit update to all clients with updated imageIds
    emitUpdate('images_reordered', { imageIds });

    res.status(200).json({ message: 'Images reordered successfully' });
  } catch (error) {
    console.error('Reorder error:', error);
    res.status(500).json({ error: 'Failed to reorder images' });
  }
};
