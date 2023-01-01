import path from "path";
import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

const ENV = process.env.ENV;

export default {
  input: path.resolve(__dirname, "./components/index.ts"),
  output: {
    format: ENV,
    dir: path.resolve(__dirname, `./${ENV}`),
    preserveModules: true,
    exports: "auto",
    preserveModulesRoot: "components",
  },
  plugins: [
    babel({
      babelHelpers: "runtime",
      extensions: [".js", ".ts", ".jsx", ".tsx"],
      exclude: "node_modules/**",
      configFile: path.resolve(__dirname, ".babelrc"),
    }),
    typescript({
      tsconfig: path.resolve(__dirname, "./tsconfig.json"),
      declaration: true,
      declarationDir: path.resolve(__dirname, `./${ENV}/types`),
    }),
  ],
  external: [/@babel\/runtime/, "react", "ui-theme-default", "classnames"],
};
