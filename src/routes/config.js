import fs from 'node:fs';
import path from 'node:path';

export default (req, res, urlPath) => {
    // Extract filename from path (e.g., "/config/settings.json" -> "settings.json")
    const filename = urlPath.replace(/^\/config\//, '');
    const filePath = path.join(__dirname, '..', 'exploit', 'config', filename);

    console.log(`Serving config file: ${filePath}`); // Debug

    // Check if file exists
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.log(`File not found: ${filePath}`);
            return res.status(404).send(`Config file "${filename}" not found`);
        }

        // Serve the file
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(`Error serving file ${filePath}:`, err);
                res.status(500).send('Error serving config file');
            }
        });
    });
};