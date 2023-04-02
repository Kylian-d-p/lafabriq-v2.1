import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { log } from '../globalFunc';

async function getAllPictures(req: Request, res: Response) {
    const folderPath = path.join(__dirname, '../../creations/');
    try {
        const elements = await new Promise<string[]>((resolve, reject) => {
            fs.readdir(folderPath, (err, elements) => {
                if (err) {
                    log(err, true)
                    reject(err);
                } else {
                    resolve(elements);
                }
            });
        });

        const files: string[] = [];
        for (const element of elements) {
            const filePath = path.join(folderPath, element);
            try {
                const stats = await fs.promises.stat(filePath);
                if (stats.isFile()) {
                    files.push(element);
                }
            } catch (err) {
                console.error(err);
            }
        }
        res.status(200).json(files);
    } catch (err) {
        console.error(err);
        res.status(500).send('Une erreur est survenue');
    }
}

export default getAllPictures;
