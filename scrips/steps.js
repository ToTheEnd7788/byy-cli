const chalk = require("chalk");
const path = require("path");
const jsonFormat = require("json-format")
const { readFileSync, writeFileSync } = require("fs");
const { spawnSync } = require("child_process");

process.stdin.setEncoding("utf8");

class Step {
  constructor() {
    this.installer = "yarn";

    this.origin = process.env.ORIGIN_PATH;

    this.package = JSON.parse(
      readFileSync(path.resolve(this.origin, "config.json"), "utf8")
    );

    this.writeList = this.package.writeList;

    this.settedName = [];

    this.steps = {
      "1": [
        "Enter the project name",
        "name",
        false
      ],
      "2": [
        "Enter the project version",
        "version",
        false
      ],
      "3": [
        "Enter the project author or your name",
        "author",
        true
      ]
    };

    delete this.package.writeList;
  }

  copy(type, src) {
    let params = [`${this.origin}/${src}`, "./"];

    if (type === "folder") {
      params.unshift("-r");
    }
    let a = spawnSync("cp", params);

    if (a.code === 0 || a.status === 0) {
      console.log(` Copy-${type}: ${src} => destination successfully...`);
    } else {
      console.log(` Copy-${type}: ${src} => destination Failed!!!`);
    }
  }

  writeFile(name, data) {
    writeFileSync(`./${name}`, data);

    console.log(` WriteFile-${name} to destination Successfully...`);
  }

  callback() {
    for (let target of this.writeList) {
      let { name, type, path } = target;

      if (type === "memory") {
        this.writeFile(path, jsonFormat(this[name], {
          size: 2,
          type: "space"
        }));
      } else {
        this.copy(type, path);
      }
    }
  }

  buildStdIn(tips, name, isLast) {
    if (name === "name") {
      this.package = Object.assign(this.package, {
        name: path.basename(process.cwd())
      });
    }
  
    return new Promise((res, rej) => {
      process.stdout.write(
        chalk.yellowBright(`\n${tips}${chalk.bold.greenBright(`(${this.package[name]})`)}:`)
      );
    
      process.stdin.on("data", (value) => {
        if (value.trim() && value.trim() !== this.package[name]) {
          if (this.settedName.indexOf(name) === -1) {
            this.package[name] = value.trim();
            this.settedName.push(name);
          }
        }
  
        if (isLast) {
          process.stdin.emit("end");

          this.callback();
        }
  
        res(value);
      })
    });
  }

  async runSteps() {
    for (let key in this.steps) {
      await this.buildStdIn(...this.steps[key]);
    }
  }
}

module.exports = new Step;