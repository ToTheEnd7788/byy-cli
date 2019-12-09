import { SplitCode } from "./splitCode";
import { format } from "esformatter";
import TransformRender from "./trasformToRender";

export default function byy (options) {
  let regExp = /\.moon$/;

  return ({
    name: "moon",

    transform(code, id) {
      if (!regExp.test(id)) return null;
      
      let { template, script} = new SplitCode(code);

      let renderTransformer = new TransformRender(template);
      
      return script;
    }
  });
}