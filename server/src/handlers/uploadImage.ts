import { Request, Response } from 'express';
import { emitUpdate } from '../socket';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Image } from '../models/image.model';
import { Folder } from '../models/folder.model';

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('image');

export const uploadImage = (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Max size is 5MB.' });
      }
      return res.status(500).json({ error: 'Upload failed', details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const { title, folderId } = req.body;

      //  Check if folder exists (if folderId provided)
      if (folderId) {
        const folder = await Folder.findByPk(folderId);
        if (!folder) {
          return res.status(400).json({ error: 'Invalid folderId — folder not found' });
        }
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      const image = await Image.create({
        title,
        imageUrl,
        folderId: folderId || null,
      });

      emitUpdate('image_uploaded', image); 

      res.status(201).json(image);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'DB save failed' });
    }
  });
};
