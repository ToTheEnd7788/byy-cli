import { Parse } from "html-ast";

let renderStr = 
  `render(c) {
    return ('div', {
      className: "app",
      'click.stop': test
    }, [123])
  }`;

function transformStrs(list) {
  return list.reduce((acc, item) => {
    let name = Object.keys(item)[0],
      value = item[name];

    name = name === 'class'
      ? "className"
      : name;
    
      acc +=
        `"${name}": "${value}",\n`;

    return acc;
  }, "");
}

function transformDymanics(list) {
  return list.reduce((acc, item) => {
    let name = Object.keys(item)[0],
      curName = name.slice(1) === 'class'
        ? "className"
        : name.slice(1);

    acc +=
      `${curName}: ${item[name]},\n`;
    return acc;
  }, ``);
}

function transfromProps(list) {
  return list.reduce((acc, item) => {
    let name = Object.keys(item)[0];

    acc += `
      "${name.slice(2)}": ${item[name]},\n
    `;

    return acc;
  }, "");
}

function transformBinds(list) {
  return list.reduce((acc, item) => {
    let name = Object.keys(item)[0];

    acc +=
      `"${name.slice(2)}": ${item[name]},\n`

    return acc;
  }, "");
}

function transformEvents(list) {
  return list.reduce((acc, item) => {
    let name = Object.keys(item)[0],
      value = item[name];

    let hasParams = value.indexOf("(");

    if (hasParams === -1) {
      acc +=
        `"${name.slice(1)}": [${value}]`;
    } else {
      let paramsList = value.slice(hasParams).slice(1, -1).split(','),
        handler = value.slice(0, hasParams),
        params = "";

      for (let p of paramsList) {
        if (/^\$/.test(p)) p = `"${params}"`
        params +=
          `${p},`
      }

      acc +=
        `"${name.slice(1)}": [${handler}, ${params.slice(0, -1)}],`;
    }
    return acc;
  }, "");
}

function transformAttrs(attrs = []) {
  let eventsExp = /^@{1}[^@]+$/,
    strExp = /^[^@^:]/,
    bindExp = /^@{2}(.+)$/,
    propsExp = /^:{2}(.+)$/,
    dymanicExp = /^:{1}[^:]+$/,
    result;

  let strs = attrs.filter(item => {
    return strExp.test(Object.keys(item)[0]);
  });

  let props = attrs.filter(item => {
    return propsExp.test(Object.keys(item)[0]);
  });

  let binds = attrs.filter(item => {
    return bindExp.test(Object.keys(item)[0]);
  });

  let ons = attrs.filter(item => {
    return eventsExp.test(Object.keys(item)[0]);
  });

  let dymanics = attrs.filter(item => {
    return dymanicExp.test(Object.keys(item)[0]);
  });

  result =
    `{
       ${transformStrs(strs)}
       ${transformDymanics(dymanics)}
      props: {
        ${transfromProps(props)}
      },

      bind: {
        ${transformBinds(binds)}
      },

      on: {
        ${transformEvents(ons)}
      }
    }`;

  return result;
}

function buildRender(ast) {
  let result = "",
  children = [];

  for (let item of ast) {
    if (item.children) {
      children = buildRender(item.children);
    }

    result +=
      `('${item.name}', {
        ${transformAttrs(item.attr)}
      }, [${children}])`;
  }

  console.log("%s", result);

  return result;
}

export default function(tpl) {
  let ast = [Parse(tpl)];

  buildRender(ast);
}