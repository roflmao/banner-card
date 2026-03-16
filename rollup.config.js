import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import filesize from "rollup-plugin-filesize";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.js",
  output: {
    file: "banner-card.js",
    format: "es",
  },
  plugins: [resolve(), json(), commonjs(), terser(), filesize()],
};
