const express = require("express");
const Busboy = require("busboy");
const fs = require("fs");
const app = express();

//middleware to serve static files
app.use(express.static("public"));

//file input element
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<form action="fileupload" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});

//store file in the folder
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
