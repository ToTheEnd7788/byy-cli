module.exports = {
  input: "./scripts/byy-cli.js",
  
  plugins: [
    // typescriptPlugin()
  ],
  output: {
    file: "bin/byy-cli",
    format: "cjs",
    indent: false,
    banner: "#!/usr/bin/env node"
  }
};