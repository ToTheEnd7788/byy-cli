import path from "path";
import typescriptPlugin from "rollup-plugin-typescript";
import aliasPlugin from "@rollup/plugin-alias";
import scssPlugin from "rollup-plugin-scss";
import byyPlugin from "./plugins/rollup-plugin-moon";
import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

const babelConfig = {
  'presets': [
    ['env', {
      'targets': {
        'browsers': ['IE 8']
      },
      'loose': true
    }]
  ]
};

const root = path.resolve(__dirname, "../");

const urls = {
  srcRoot: path.resolve(root, "src")
},

base = {
  treeshake: false,
  output: (name) => {
    return {
      file: `dist/js/${name}.js`,
      format: "cjs"
    }
  },

  plugins: (name) => {
    return [
      // babel(babelrc({
      //   addExternalHelpersPlugin: true,
      //   config: babelConfig,
      //   exclude: 'node_modules/**'
      // })),

      typescriptPlugin(),
      aliasPlugin({
        resolve: ['.js', '.ts', '.moon', '.scss'],
        entries: {
          "__scss": path.resolve(urls.srcRoot, "scss"),
          "__components": path.resolve(urls.srcRoot, "components"),
          "__temp": path.resolve(root, ".temp")
        }
      }),
      byyPlugin({
        name: "123"
      }),
      scssPlugin({
        output: `dist/css/${name}.css`
      })
    ];
  }
},

  pages = [
    {
      name: "index",
      path: "/index"
    }
  ];

export {
  base,
  pages
};
