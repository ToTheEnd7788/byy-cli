import { Parse } from "html-ast";

class TransformRender {
  constructor(tpl) {
    this.tpl = tpl;
    this.htmlAst = Parse(tpl);

    this._buildRender();
  }

  _buildRender() {
    console.log(333333, this.htmlAst);
  }
}

export default TransformRender;