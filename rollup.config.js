import typescriptPlugin from "rollup-plugin-typescript";
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: "./src/core/instance/index.ts",
  plugins: [
    typescriptPlugin(),
    // terser(),
  ],
  output: {
    file: "libs/byy.js",
    format: "es",
    comments: false
  }
};