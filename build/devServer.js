import express from "express";
import path from "path";
import fs from "fs";
import { watch } from "rollup";
import { base } from "./base";

let watcher = {};

const app = express(),
  viewsRoot = path.resolve(__dirname, "../dist");

let watchOptions = {
  ...Object.assign({}, {
    plugins: base.plugins("index"),
    input: `./src/js/pages/index.ts`
  }),
  output: base.output("index")
}

watcher["index"] = watch(watchOptions);

watcher["index"].on('event', e => {
  if (e.code === "ERROR") {
    console.log(555555, e.error);
  }
})

app.get('/:name', (req, res) => {
  res.set('Content-Type', 'text/html');
  fs.readFile(`${viewsRoot}/${req.params.name}.html`, (err, data) => {
    if (err) {
      res.send('<h1>Not Found</h1>')
    } else {
      if (!watcher[req.params.name]) {
        
      }

      res.end(data);
    }
  })
});

app.use("/dist/", express.static(path.resolve(__dirname, "../dist")));

app.listen(8080, err => {
  if (err) console.error(err);
  console.log("The server is listening at port:8080...");
})