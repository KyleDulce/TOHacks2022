import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { Request, Response } from "express";
import { Express } from 'express';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default class ContentController{

    private app;

    constructor(express: Express){

        this.app = express;
    
        this.app.get('/file/:fileName', (res: Response, req: Request) => {
    
            res.sendFile(path.join(__dirname, `/public/${req.params.fileName}`));
        
        });
    
    }

}
