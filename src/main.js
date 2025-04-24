import axios from 'axios';
import express from 'express';
import fs from 'node:fs';

import paths from './paths.js';

const app = express();

app.use(express.json());

app.all(`/*`, async (req, res) => {
    let path = req.url.split('?')[0];

    let file = paths.find((pathData) => typeof pathData.match === 'string' ? path === pathData.match : pathData.match.test(path));
    if (!file) return console.log(`Unknown file for path "${path}"`);

    console.log(`forwarding ${path} to "${file.handler}"`);

    await (await import(`./routes/${file.handler}.js`)).default(req, res, path);
});

app.listen(6060, () => console.log(`http://localhost:6060`));