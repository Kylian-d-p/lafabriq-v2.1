import { Request, Response, NextFunction } from 'express';
import * as fileType from 'file-type';

export default async function checkImageUpload(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[];
    const allowedExtensions = ['jpg', 'jpeg', 'png'];

    const isImagePromises = files.map((file) => fileType.fromBuffer(file.buffer).then((result) => {
        const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
        const mimeType = result?.mime.toLowerCase();
        return allowedExtensions.includes(fileExtension as string) && mimeType?.startsWith('image/');
    }));

    const isImageArray = await Promise.all(isImagePromises);

    if (!isImageArray.some(isImage => isImage)) {
        return res.status(400).json({ message: 'Les fichiers doivent être des images au format JPEG, JPG ou PNG.' });
    }

    next();
}
