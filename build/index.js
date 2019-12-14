import { rollup, watch } from "rollup";
import { base, pages } from "./base";

const isDev = process.env.NODE_ENV === "development";

async function build(name) {
  try {
    const bundle = await rollup(Object.assign({}, {
      plugins: base.plugins(name),
      input: `./src/js/pages/${name}.js`
    }));

    let { output } = await bundle.generate(base.output(name));

    console.log(55555555555, output);
  
    bundle.generate(base.output(name)).then(() => {
      bundle.write(base.output(name));
    });
  } catch(err) {
    console.log(55555, err);
  }
}

function devBuild(name) {
  let watchOptions = {
    ...Object.assign({}, {
      plugins: base.plugins(name),
      input: `./src/js/pages/${name}.js`
    }),
    output: base.output(name)
  }

  const watcher = watch(watchOptions);

  watcher.on("event", e => {
    // console.log(111111, e);
  });

  // watcher.close();

}

if (isDev) {
  for (let page of pages) devBuild(page.name);
} else {
  for (let page of pages) build(page.name);
}
