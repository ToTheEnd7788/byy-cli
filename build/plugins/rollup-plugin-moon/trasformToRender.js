import HtmlAst from "./cleanHtmlAst";

class TransformRender {
  constructor(tpl) {
    this.tpl = tpl;
    this.render = null;

    this._buildRender();
  }

  _buildRender() {
    this.render = new HtmlAst(this.tpl);
  }
}

export default TransformRender;