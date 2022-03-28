const router = require("express").Router();
const db = require("../../data/db.json");
const fs = require("fs");
const path = require("path");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// gets all notes
router.get("/notes", (req, res) => {
  let results = db;
  res.json(results);
});

// POST route creates notes
router.post("/notes", (req, res) => {
  id = db.length + 1;
  req.body.id = JSON.stringify(id);

  let notesArr = db;
  let note = req.body;

  notesArr.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../.././data/db.json"),
    JSON.stringify(notesArr, null, 2)
  );

  res.json(note);
});

//deletes notes from db.json when user clicks on trash icon
router.delete("/notes/:id", function(req, res) {
  const idToDelete = req.params.id;
  console.log(idToDelete);
  readFileAsync("./data/db.json", "utf8").then(function(data){
    console.log(data);
    const notes = [].concat(JSON.parse(data));
    console.log(notes);
    const newNotesData = []
    for (let i = 0; i < notes.length; i++) {
      if (idToDelete !== notes[i].id) {
        newNotesData.push(notes[i])
      }
    }
    console.log(newNotesData)
    return newNotesData
  }).then(function(notes){
    console.log(notes)
    writeFileAsync("./data/db.json", JSON.stringify(notes))
    res.send(notes);
  })
});

// router.delete("/notes/:id", (req, res) => {
//   fs.readFile("data/db.json", "utf8", (err, data) => {
//     let notesArr = [].concat(JSON.parse(data));
//     notesArr.forEach((note, i) => {
//       // console.log(note.id);
//       if (note.id === req.params.id) {
//         // console.log(note);
//         notesArr.splice(i, 1);
//         console.log(notesArr);
//         return notesArr;
//       }
//     });
//   }).then((notes) =>
//     fs.writeFileSync(
//       path.join(__dirname, "../.././data/db.json"),
//       JSON.stringify(notes, null, 2),
//       res.send("note deleted successfully!")
//     )
//   );
// });

module.exports = router;
