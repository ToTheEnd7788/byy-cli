module.exports = {
  input: "./scripts/byy-cli.js",
  
  plugins: [
    // typescriptPlugin()
  ],
  output: {
    file: "script/bin.js",
    format: "cjs",
    indent: false,
    banner: "#!/usr/bin/env node"
  }
};