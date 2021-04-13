if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');

const app = express();

app.use(express.static('public', { index: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
});

const bookmarksRouter = require('./routes/bookmarks');
const deploysRouter = require('./routes/deploys')

app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/deploys', deploysRouter);

const PORT = process.env.PORT || 5454;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));