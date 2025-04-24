import axios from 'axios';
import express from 'express';
import fs from 'node:fs';

import paths from './paths.js';

const app = express();

app.use(express.json());

app.all(`/*`, async (req, res) => {
    let path = req.url.split('?')[0];

    let file = paths.find((pathData) => {
        if (typeof pathData.match === 'string') {
            return path === pathData.match;
        } else if (pathData.match instanceof RegExp) {
            return pathData.match.test(path);
        }
        return false;
    });

    if (!file) {
        console.log(`Unknown file for path "${path}"`);
        return res.status(404).send(`Unknown file for path "${path}"`);
    }

    console.log(`forwarding ${path} to "${file.handler}"`);

    try {
        await (await import(`./routes/${file.handler}.js`)).default(req, res, path);
    } catch (err) {
        console.error(`Failed to load handler ${file.handler}:`, err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(6060, () => console.log(`http://localhost:6060`));