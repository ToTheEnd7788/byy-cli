import HtmlAst from "./cleanHtmlAst";

class TransformRender {
  constructor(tpl) {
    this.tpl = tpl;
    this.ast = null;
    this.renderStr;

    this._init();
  }

  _init() {
    this.ast = new HtmlAst(this.tpl).ast;
    
    this.renderStr =
    `
    render(_c) {
      return ${this._buildRender(this.ast[0])};
    }`;
    console.log("%s", this.renderStr);
  }

  __buildTextNode(value) {
    let tplStrExp = /^{{([\s\S]+)}}$/,
      result;

    if (tplStrExp.test(value)) {
      result = `${value.replace(tplStrExp, "$1")}`;
    } else {
      result = `"${value}"`;
    }

    return result;
  }

  __buildAttributes({ attrs, isComponent}) {
    let result = "",
      colonExp = /^:(.+)$/,
      atExp = /^@(.+)$/;

    let colons = attrs.filter(item => {
      return colonExp.test(item.name);
    }),
      ats = attrs.filter(item => {
        return atExp.test(item.name);
      });

    if (isComponent) {
      let map = {
        props: {
          exp: colonExp,
          list: colons,
          begin: colons.length > 0
            ? "props: {\n"
            : ""
        },
        bind: {
          exp: atExp,
          list: ats,
          begin: ats.length > 0
            ? "bind: {\n"
            : ""
        }
      };

      for (let key in map) {
        result += map[key]['list'].reduce((acc, {name, value}, index, arr) => {
          if (index !== arr.length - 1) {
            acc += `  ${name.replace(map[key]['exp'], "$1")}: ${value},\n`;
          } else {
            acc += `  ${name.replace(map[key]['exp'], "$1")}: ${value}\n}`;

            if (key !== 'bind') {
              acc += ",\n";
            }
          }
  
          return acc;
        }, map[key]['begin']);
      }
    } else {
      let commons = attrs.filter(item => {
        return /^[a-z].+$/.test(item.name)
      });
    }

    return result;
  }

  _buildRender(node) {
    let {
      nodeName,
      childNodes,
      value
    } = node,
    str;

    if (nodeName ==="#text") {
      str = this.__buildTextNode(value.trim());
    } else {
      let childs = childNodes.map(item => {
        let temp =
          `${this._buildRender(item)}`;
        return temp;
      });

      str =
        `_c("${nodeName}", {
          ${this.__buildAttributes(node)}
        }, [
          ${childs.join(',\n')}
        ])`;
    }

    return str;
  }
}

export default TransformRender;