import express from "express";
import path from "path";
import fs from "fs";

const app = express(),
  viewsRoot = path.resolve(__dirname, "../dist");

app.get('/:name', (req, res) => {
  res.set('Content-Type', 'text/html');
  fs.readFile(`${viewsRoot}/${req.params.name}.html`, (err, data) => {
    if (err) {
      res.send('<h1>Not Found</h1>')
    } else {
      res.end(data);
    }
  })
});

app.use("/dist/", express.static(path.resolve(__dirname, "../dist")));

app.listen(8080, err => {
  if (err) console.error(err);
  console.log("The server is listening at port:8080...");
})