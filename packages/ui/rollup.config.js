import path from "path";
import { babel } from "@rollup/plugin-babel";
import nullImport from "rollup-plugin-null";
import image from "@rollup/plugin-image";
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
    nullImport({
      ext: [".less"],
    }),
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
    image(),
  ],
  external: ["react", "ui-theme-default", "classnames"],
};
