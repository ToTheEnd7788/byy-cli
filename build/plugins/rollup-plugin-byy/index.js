import { SplitCode } from "./splitCode";

export default function byy (options) {
  let regExp = /\.byy$/;
  return {
    name: "byy",

    transform(code, id) {
      if (!regExp.test(id)) return null;

      let { template, script, style } = new SplitCode(code);

      console.log(55555, style);

      return script;
    },

    generateBundle(opts) {
      console.log(5555, opts)
    }
  };
}