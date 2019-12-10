import { SplitCode } from "./splitCode";
import { format } from "esformatter";
import * as ts from "typescript";
import TransformRender from "./trasformToRender";
import fs from "fs";
import path from "path";

function readConfigFile(ts) {
  let configPath = path.resolve(process.cwd(), "tsconfig.json");

  return ts.readConfigFile(configPath, function(path) {
    return fs.readFileSync(path, 'utf-8');
  }).config.compilerOptions;
}

export default function byy (options) {
  let regExp = /\.moon$/,
    testExp = /\.byy$/,
    js,tpl;

  return {
    name: "moon",

    resolveId(id, importer) {
      return id;
    },

    load(id) {
      if (regExp.test(id)) {
        let source = fs.readFileSync(id).toString();
        let { template, script } = new SplitCode(source);

        let opt = readConfigFile(ts);

        let testSrc = 
        `class TestOne {
          name: any
          constructor(name) {
            this.name = name;
          }
        
          __init() {
            console.log(11111, this.name);
          }
        }`

        let aaa = ts.transpileModule(testSrc, {
          compilerOptions: ts.convertCompilerOptionsFromJson(opt, process.cwd()).options
        });

        console.log(77777, aaa);

        return {
          code: script,
          map: null
        };
      } 
      
      if (/\.temp.+\.scss$/.test(id)) {
        return { code: ".test-one { color: red;  &__main {font-family: 'byy';} }", map: null };
      } else if (id === 'a.ts') {
        let opt = readConfigFile(ts);

        // let aaa = ts.transpileModule(js, {
        //   compilerOptions: ts.convertCompilerOptionsFromJson(opt, process.cwd()).options
        // });

        return { code: js, map: null }
      }
    },

    transform(code, id) {
      if (regExp.test(id)) {

        let src =
          `import "__temp/index";\n` +
          `${code}`;

        console.log("%s", src);

        return src;
      }

      console.log(4444, code, id);
    }
  };
}