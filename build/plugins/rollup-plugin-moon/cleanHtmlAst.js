import { parseFragment } from "parse5";

export default class  {
  constructor(tpl) {
    this.tpl = tpl;
    this.ast;

    this._init();
  }

  _init() {
    this.ast = this._filterAst(parseFragment(this.tpl).childNodes);
    console.log(11111, this.ast[0]);

    let renderStr =
      `render(_c) {
        return _c('name', {

        }, []);
      }`
  }

  _filterAst(childNodes) {
    return childNodes.reduce((
      acc,
      { nodeName, tagName, attrs, childNodes, value }
    ) => {
      if (nodeName !== "#text" || value.trim()) {
        childNodes = childNodes || [];

        acc.push({
          nodeName,
          tagName,
          attrs,
          childNodes: this._filterAst(childNodes),
          value,
          isComponent: /^.+-.+$/.test(nodeName)
        });
      }

      return acc;
    }, [])
  }
}