const router = require("express").Router();
const db = require("../../data/db.json");
const fs = require("fs");
const path = require("path");
const util = require("util");
const uuid =require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// gets all notes
router.get("/notes", (req, res) => {
  readFileAsync("./data/db.json", "utf8")
  .then(function(data){
    res.json(JSON.parse(data));
  })
});

// POST route creates notes
router.post("/notes", (req, res) => {
  let notes = [];
  readFileAsync("./data/db.json", "utf8")
  .then(function(data){
    notes = JSON.parse(data);

    const newNote = req.body;
    newNote.id = uuid.v4();
    console.log(newNote.id)
    notes.push(newNote);

    return  writeFileAsync(
      "./data/db.json",
      JSON.stringify(notes, null, 2)
    );
  }).then(()=>{
    res.json(notes);
  })
});

//deletes notes from db.json when user clicks on trash icon
router.delete("/notes/:id", function(req, res) {
  const idToDelete = req.params.id;
  console.log(idToDelete + " = idToDelete");
  readFileAsync("./data/db.json", "utf8")
  .then(function(data){
    console.log("we are in delete");
    const notes = JSON.parse(data);
    return notes.filter(note=>note.id != idToDelete);
  }).then(function(notes){
    console.log(notes)
    writeFileAsync("./data/db.json", JSON.stringify(notes)).then(()=> {
      res.json(notes);
    })
  })
});

module.exports = router;
