import { rollup } from "rollup";
import { base, pages } from "./base";

async function build(name) {
  try {
    const bundle = await rollup(Object.assign({}, {
      plugins: base.plugins(name),
      input: `./src/js/pages/${name}.js`
    }));

    let { output } = await bundle.generate(base.output(name));
  
    bundle.generate(base.output(name)).then(() => {
      bundle.write(base.output(name));
    });
  } catch(err) {
    console.error(55555555, err);
  }
}

for (let page of pages) build(page.name);
