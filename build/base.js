import path from "path";
import typescriptPlugin from "rollup-plugin-typescript";
import copyPlugin from "rollup-plugin-copy";
import aliasPlugin from "@rollup/plugin-alias";
import scssPlugin from "rollup-plugin-scss";

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

  plugins: [
    aliasPlugin({
      resolve: ['.js', '.ts', '.moon', '.scss'],
      entries: {
        __scss: path.resolve(urls.srcRoot, "scss")
      }
    }),
    scssPlugin({
      output: (styles, stylesNode) => {
        console.log(3333, styles);
        console.log(4444, stylesNode);
      }
    }),
    typescriptPlugin(),
    copyPlugin({
      targets: [
        {
          src: "src/views/*",
          dest: "dist/views"
        }
      ]
    })
  ]
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
