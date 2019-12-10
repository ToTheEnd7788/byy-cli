import { SplitCode } from "./splitCode";
import { format } from "esformatter";
import * as ts from "typescript";
import TransformRender from "./trasformToRender";
import fs from "fs";

export default function byy (options) {
  let regExp = /\.moon$/,
    testExp = /\.byy$/;

  return {
    name: "moon",

    resolveId(id, importer) {
      return id;
    },

    load(id) {
      console.log(666666, id);
      if (regExp.test(id)) {
        let source = fs.readFileSync(id).toString();
        let { template, script} = new SplitCode(source);

        return {code: script, map: null};
      } else if (/\/\.temp\/.+\.scss$/.test(id)) {
        return { code: ".test-one { color: red;  &__main {font-family: 'byy';} }", map: null };
      }
    },

    transform(code, id) {
      if (regExp.test(id)) {

        this.meta.url = "byy";

        let src =
          `import "__temp/index"` +
          `${code}`;

        return src;
      }

    }
  };
}