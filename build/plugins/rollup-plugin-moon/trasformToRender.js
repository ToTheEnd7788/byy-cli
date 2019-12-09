import { Parse } from "html-ast";
import HtmlAst from "./cleanHtmlAst";

class TransformRender {
  constructor(tpl) {
    this.tpl = tpl;
    this.htmlAst = 

    this._buildRender();
  }

  _buildRender() {
    this.ast = new HtmlAst(this.tpl);
  }
}

export default TransformRender;