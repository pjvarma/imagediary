
// pages/api/upload.js
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Upload failed: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post((req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const imageUrl = `/uploads/${file.filename}`;
  res.status(200).json({ url: imageUrl });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
