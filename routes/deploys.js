const express = require('express');

const { readJSON, writeJSON } = require('../utils');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await readJSON('./data/deploys.json');

        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error' });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { url, name } = req.body;

        const newDeploy = {
            url,
            name
        };

        const data = await readJSON('./data/deploys.json');

        data.deploys.push(newDeploy);
        
        if (await writeJSON('./data/deploys.json', data)) {
            return res.json({ status: 'success', message: 'Successfully saved deploy to file' });
        }

        res.json({ status: 'error', message: 'Error writing deploy to file' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: 'Error' });
    }
});

module.exports = router;