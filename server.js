const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/notes');
const { dirname } = require('path');

const PORT = process.env.PORT || 3001
const app = express();

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
      path.join(__dirname, './db/notes.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}
function validateNote(note) {
    if(!note.title || typeof note.title !== "string") {
        return false;
    }
    if(!note.text | typeof note.text !== "string") {
        return false;
    }
    return true;
}
// parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//parse incoming json data
app.use(express.json());

app.use(express.static('__dirname'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    if(!validateNote(req.body)) {
        res.status(400).send("This note is not formatted correctly.")
    } else {
    // add note to json file and notes array 
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}!`)
});
