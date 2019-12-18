import chalk from "chalk";
import path from "path";
import jsonFormat from "json-format";
import { readFileSync, writeFileSync }  from "fs";
import { spawnSync, spawn } from "child_process";

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
        false
      ],
      "4": [
        "Enter the installer which you want to use",
        "installer",
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
    // Copy and write files, folders
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

    console.log(chalk.bold.green(`\n Then install dependencies...\n`));

    let scriptParams = this.installer === "yarn"
      ? []
      : ["install"],
      scriptName = process.platform === "win32"
        ? `${this.installer}.cmd`
        : this.installer;

        
    let install = spawn(scriptName, scriptParams);
    install.stdout.on("data", data => {
      process.stdout.write(data.toString("utf8"));
    });

    install.stderr.on("data", data => {
      process.stdout.write(data.toString("utf8"));
    });

    install.on("exit", () => {
      let parmas = ["dev"];

      console.log(chalk.bold.green(
        `\n  > Open the dev-server\n  you can see a todos demo in http://127.0.0.1:8080/index\n`
      ));

      if (this.installer !== "yarn") parmas.unshift("run");
      let dev = spawn(scriptName, parmas);

      dev.stdout.on("data", data => {
        process.stdout.write(data.toString("utf8"));
      });
  
      dev.stderr.on("data", data => {
        process.stdout.write(data.toString("utf8"));
      });
    });
  }

  buildStdIn(tips, name, isLast) {
    if (name === "name") {
      this.package = Object.assign(this.package, {
        name: path.basename(process.cwd())
      });
    }
  
    return new Promise((res, rej) => {
      let extraMsg = this.package[name];

      if (name === "installer") extraMsg = "yarn/npm/cnpm, default is yarn";

      process.stdout.write(
        chalk.yellowBright(`\n${tips}${chalk.bold.greenBright(`(${extraMsg})`)}:`)
      );
    
      process.stdin.on("data", (value) => {
        if (value.trim() && value.trim() !== this.package[name]) {
          if (this.settedName.indexOf(name) === -1) {
            if (name === "installer") this.installer = value.trim();
            else this.package[name] = value.trim();
            this.settedName.push(name);
          }
        } else {
          if (this.settedName.indexOf(name) === -1) {
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

export default Step;