import { Request, Response } from 'express';
import { Image } from '../models/image.model';
import { emitUpdate } from '../socket';

export const toggleVisibility = async (req: Request, res: Response) => {
  try {
    const { imageIds } = req.body;

    if (!Array.isArray(imageIds) || imageIds.length === 0) {
      return res.status(400).json({ error: 'imageIds is required' });
    }

    // Flip visibility using raw SQL expression
    await Image.update(
      { isVisible: Image.sequelize!.literal('NOT isVisible') },
      { where: { id: imageIds } }
    );

    const updatedImages = await Image.findAll({ where: { id: imageIds } });
    updatedImages.forEach((img) => emitUpdate('image_visibility_toggled', img));

    res.status(200).json({ message: 'Visibility toggled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle visibility' });
  }
};
