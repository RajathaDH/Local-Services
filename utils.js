const fs = require('fs').promises;

async function readJSON(file) {
    try {
        const fileData = await fs.readFile(file, 'utf-8');
        const data = JSON.parse(fileData);

        return data;
    } catch (error) {
        console.log(error);
        return {};
    }
}

async function writeJSON(file, data) {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 4));

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    readJSON,
    writeJSON
}