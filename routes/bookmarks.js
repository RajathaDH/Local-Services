const express = require('express');

const { readJSON, writeJSON } = require('../utils');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await readJSON('./data/bookmarks.json');

        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error' });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { url, name } = req.body;

        const newBookmark = {
            url,
            name
        };

        const data = await readJSON('./data/bookmarks.json');

        data.bookmarks.push(newBookmark);
        
        if (await writeJSON('./data/bookmarks.json', data)) {
            return res.json({ status: 'success', message: 'Successfully saved bookmark to file' });
        }

        res.json({ status: 'error', message: 'Error writing bookmark to file' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: 'Error' });
    }
});

module.exports = router;