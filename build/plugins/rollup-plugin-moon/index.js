import { SplitCode } from "./splitCode";
import * as ts from "typescript";
import { js as beautify } from "js-beautify";
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

        let { renderStr, renderFuncList } = new TransformRender(template);

        let pos = script.lastIndexOf('}');

        script = `${script.slice(0, pos)},\n${renderStr}${script.slice(pos)}`;
        
        for (let key in renderFuncList) {
          let mBegin = script.indexOf("methods:");
          let curBegin = script.indexOf("{", mBegin) + 1;
          script = `${script.slice(0, curBegin)}${renderFuncList[key]},\n${script.slice(curBegin)}`
        }

        return {
          code: beautify(script, {
            indent_size: 2,
            space_in_empty_paren: false
          }),
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

        return src;
      }
    },

    generateBundle(a, b) {

      for (let name in b) {
        let code = b[name].code;
        let opt = readConfigFile(ts);

        let aaa = ts.transpileModule(code, {
          compilerOptions: ts.convertCompilerOptionsFromJson(opt, process.cwd()).options
        });

        b[name].code = aaa.outputText;
      }
      
    }
  };
}