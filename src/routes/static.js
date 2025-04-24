import axios from 'axios';

export default async (req, res, path) => {
    try {
        let request = await axios({
            url: `https://www.gimkit.com${path}`,
            method: req.method.toLowerCase(),
            data: req.body,
            headers: {
                origin: 'https://www.gimkit.com',
                referer: 'https://www.gimkit.com/',
                host: 'www.gimkit.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.116 Safari/537.36'
            },
            validateStatus: false
        });

        ['content-type', 'set-cookie'].forEach((header) => {
            if (request.headers[header])
                res.header(header, request.headers[header]);
        });

        res.status(request.status).send(request.data);
    } catch (e) {
        console.error(e, path);
    };
};