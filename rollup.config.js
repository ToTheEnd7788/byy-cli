module.exports = {
  input: "./scripts/byy-cli.js",
  
  plugins: [
    // typescriptPlugin()
  ],
  output: {
    file: "bin/script",
    format: "cjs",
    indent: false,
    banner: "#!/usr/bin/env node"
  }
};