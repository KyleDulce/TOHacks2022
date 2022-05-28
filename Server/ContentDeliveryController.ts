import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let app;

function init(express){

    app = express;

}

app.get('/file/:fileName', (res, req) => {

    res.sendFile(path.join(__dirname, `/public/${req.params.fileName}`));

});