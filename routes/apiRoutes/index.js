const router = require("express").Router();
const  db = require("../../data/db.json");
const fs = require('fs');
const path = require('path');

// gets all notes
router.get('/notes', (req, res) => {
  let results = db;
  res.json(results);
});

// POST route creates notes
router.post('/notes', (req, res) => {
  id = db.length+1;
  req.body.id = JSON.stringify(id)

  let notesArr = db;
  let note = req.body;

  notesArr.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../.././data/db.json'),
    JSON.stringify(notesArr, null, 2)
  );

    res.json(note);

});

//deletes notes from db.json when user clicks on trash icon
router.delete('/notes/:id', (req, res) => {
  fs.readFile('data/db.json', (err, data) => {
    if(err) {
      return console.log(err);
    }

    let notesArr = JSON.parse(data);
    notesArr.forEach((note, i) => {
      console.log(note.id);
      if(note.id === req.params.id) {
        console.log(note);
        notesArr.splice(i, 1);
        console.log(notesArr);
      
        fs.writeFileSync(
          path.join(__dirname, '../.././data/db.json'),
          JSON.stringify(notesArr, null, 2), (err) => {
        if(err) {
          console.log(err);
        }
        res.send(console.log('Note removed from list'));
      })
      };
    });
  });
});

module.exports = router;
