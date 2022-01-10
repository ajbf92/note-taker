const router = require("express").Router();
const res = require("express/lib/response");
const  db = require("../../data/db.json");

router.get("/notes", (req, res) => res.json(db));

router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = db.length.toString();
  // req.body is where our incoming content will be
  console.log(req.body);
  res.json(req.body);

  const { title, text, id } = req.body;
  if (title && text && id) {
    const newNote = {
      title,
      text,
      id,
    };
    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.json(response);
    return
  } else {
    res.json("Error in creating new note");
  }
});

module.exports = router;
