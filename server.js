const express = require('express');
const { notes } = require('./db/notes');

const app = express();

app.get('/api/notes', (req, res) => {
    res.json(notes);
});
app.listen(3001, () => {
    console.log(`Api server now on port 3001!`)
});
