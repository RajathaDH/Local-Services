if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');

const app = express();

app.use(express.static('public', { index: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const bookmarksRouter = require('./routes/bookmarks');

app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
});

app.use('/bookmarks', bookmarksRouter);

const PORT = process.env.PORT || 5454;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));