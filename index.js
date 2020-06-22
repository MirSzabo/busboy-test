const express = require("express");
const Busboy = require("busboy");
const fs = require("fs");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'}).sendFile(__dirname + "/public/finish-upload.html");;
  return res.end();
});

app.post("/fileupload", function (req, res) {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    const saveTo = path.join(__dirname, "uploads/" + filename);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on("finish", () => {
    res.writeHead(200, { Connection: "close" });
    res.end("File is saved");
  });

  return req.pipe(busboy);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
