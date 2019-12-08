import path from "path";
import typescriptPlugin from "rollup-plugin-typescript";
import aliasPlugin from "@rollup/plugin-alias";
import scssPlugin from "rollup-plugin-scss";
import byyPlugin from "./plugins/rollup-plugin-moon";

const root = path.resolve(__dirname, "../");

const urls = {
  srcRoot: path.resolve(root, "src")
},

base = {
  output: (name) => {
    return {
      file: `dist/js/${name}.js`,
      format: "es"
    }
  },

  plugins: (name) => {
    return [
      byyPlugin({
        name: "123"
      }),
      aliasPlugin({
        resolve: ['.js', '.ts', '.moon', '.scss'],
        entries: {
          "__scss": path.resolve(urls.srcRoot, "scss"),
          "__components": path.resolve(urls.srcRoot, "components")
        }
      }),
      scssPlugin({
        output: `dist/css/${name}.css`
      }),
      typescriptPlugin()
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
