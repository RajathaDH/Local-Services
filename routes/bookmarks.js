const fs = require('fs').promises;
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const fileData = await fs.readFile('./data/bookmarks.json', 'utf-8');
        const bookmarks = JSON.parse(fileData);

        res.json(bookmarks);
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

        const fileData = await fs.readFile('./data/bookmarks.json', 'utf-8');
        const jsonData = JSON.parse(fileData);
        const bookmarks = jsonData.bookmarks;

        bookmarks.push(newBookmark);

        await fs.writeFile('./data/bookmarks.json', JSON.stringify(jsonData, null, 4));

        res.json({ status: 'success', message: 'Successfully saved bookmark to file' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: 'Error writing bookmark to file' });
    }
});

module.exports = router;