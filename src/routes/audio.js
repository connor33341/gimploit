import axios from 'axios';

export default async (_req, res, path) => {
    try {
        let request = await axios.get(`https://gimkit.com${path}`, { responseType: 'stream' });

        ['content-type', 'set-cookie'].forEach((header) => {
            if (request.headers[header])
                res.header(header, request.headers[header]);
        });

        request.data.pipe(res);
    } catch (e) {
        console.error(e, path);
    };
};