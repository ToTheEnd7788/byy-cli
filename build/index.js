import { rollup, watch } from "rollup";
import { base, pages } from "./base";

async function build(name) {

  try {
    const bundle = await rollup(Object.assign({}, {
      plugins: base.plugins(name),
      input: `./src/js/pages/${name}.js`
    }));
  
    bundle.generate(base.output(name)).then(() => {
      bundle.write(base.output(name));
    });
  } catch(err) {
    console.log(55555, err);
  }
  
}

for (let page of pages) build(page.name);