import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { Express, Request, Response } from "express";
//const __dirname = dirname(fileURLToPath(import.meta.url));

export default class ContentController{

    private app;

    constructor(express: Express){

        this.app = express;
    
        this.app.get('/file/:fileName', (res: Response, req: Request) => {
    
            res.sendFile(`../public/${req.params.fileName}`);
        
        });
    
    }

}
