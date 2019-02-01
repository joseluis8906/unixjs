const express = require("express");
const app = express();
const port = 3000;
var path = require("path");


const Session = require("./sbin/contrib/Session");
const GControl = require("./sbin/GControl");

app.use(express.json());
app.get("/", (req, res) => res.send("Unixjs"));

app.all("/session/", (req, res) => new Session(req, res));
app.all("/gcontrol/", (req, res) => new GControl(req, res));

app.get("/unixjs.html", function(req, res) {
  res.sendFile(path.join(__dirname + "/share/unixjs.html"));
});
app.use("/bin", express.static("bin"));
app.use("/boot", express.static("boot"));
app.use("/lib", express.static("lib"));
app.use("/audios", express.static("share"));
app.use("/css", express.static("share/css"));
app.use("/documents", express.static("share"));
app.use("/fonts", express.static("share/fonts"));
app.use("/share", express.static("share"));
app.use("/videos", express.static("share"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));