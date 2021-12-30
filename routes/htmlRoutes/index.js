// use router to be able to connect all the routes to the server file. If we use app it will think its a new app.
// path is used to help with files and directory paths
const path = require("path");
const router = require("express").Router();


// route that connects homepage with server
// respond with an HTML page to display in the browser. So instead of using res.json(), we're using res.sendFile()
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../.././public/index.html"));
});

// route that connects notes page with server
router.get("/animals", (req, res) => {
  res.sendFile(path.join(__dirname, "../.././public/notes.html"));
});

// wildcard route; and it should always come last
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

module.exports = router;
