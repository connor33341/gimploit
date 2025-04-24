import axios from 'axios';
import { Buffer } from "buffer";

export default async (_req, res, path) => {
    try {
        let request = await axios.get(`https://gimkit.com${path}`, { responseType: 'arraybuffer' });

        ['content-type', 'set-cookie'].forEach((header) => {
            if (request.headers[header])
                res.header(header, request.headers[header]);
        });

        res.send(Buffer.from(request.data, 'binary'));
    } catch (e) {
        console.error(e, path);
    };
};