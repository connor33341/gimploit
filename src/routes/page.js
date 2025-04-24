import axios from 'axios';
import fs from 'fs';

export default async (_req, res, path) => {
    try {
        if (path !== '/join') return res.redirect('/join');

        let request = await axios.get(`https://www.gimkit.com/join`);

        ['content-type', 'set-cookie'].forEach((header) => {
            if (request.headers[header])
                res.header(header, request.headers[header]);
        });

        request.data = request.data.replace(`<head>`, `<head>
            <script>${fs.readFileSync("build/bundle.min.js", 'utf-8')}</script>`);

        request.data = request.data.replace(`content="https://www.gimkit.com">`, `content="https://www.gimkit.com"><script>document.querySelector('meta[property="cdn-map-assets-url"]').content = location.origin</script>`)

        res.send(request.data);
    } catch (e) {
        console.error(e, path);
    };
};