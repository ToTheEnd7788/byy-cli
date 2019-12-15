import path from "path";
import aliasPlugin from "@rollup/plugin-alias";
import scssPlugin from "rollup-plugin-scss";
import byyPlugin from "rollup-plugin-byy";
import copyPlugin from "rollup-plugin-copy";
import commonPlugin from "rollup-plugin-commonjs";
import resolvePlugin from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const root = path.resolve(__dirname, "../"),
  isDev = process.env.NODE_ENV === "development";

const urls = {
  srcRoot: path.resolve(root, "src")
},

base = {
  treeshake: false,
  output: (name) => {
    return {
      file: `dist/js/${name}.js`,
      format: "es"
    }
  },

  plugins: (name) => {
    return [
      resolvePlugin(),
      commonPlugin({
        include: /node_modules/
      }),
      aliasPlugin({
        resolve: ['.scss', '.js', '.ts', '.byy'],
        entries: {
          "__scss": path.resolve(urls.srcRoot, "scss"),
          "__components": path.resolve(urls.srcRoot, "components"),
          "__temp": path.resolve(root, ".temp"),
          "__imgs": path.resolve(urls.srcRoot, "imgs")
        }
      }),
      byyPlugin(),
      scssPlugin({
        output: `dist/css/${name}.css`
      }),
      copyPlugin({
        targets: [
          {
            src: "src/views/*",
            dest: "dist/"
          },
          {
            src: "src/imgs/*",
            dest: "dist/imgs/"
          }
        ]
      })
    ].concat(isDev ? [] : [terser({
      ie8: true,
      output: {
        comments: false
      }
    })]);
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
