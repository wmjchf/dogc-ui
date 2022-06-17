import path from "path";
import fs from "fs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

// 多入口文件
const componentDir = "components";
const cModuleNames = fs.readdirSync(path.resolve(__dirname, componentDir));
const componentEntryFiles = cModuleNames
  .map((name) =>
    /^[A-Z]\w*/.test(name) ? `${componentDir}/${name}/index.tsx` : undefined
  )
  .filter((n) => !!n);

export default {
  input: [
    path.resolve(__dirname, "./components/index.ts"),
    ...componentEntryFiles,
  ],
  output: {
    format: "esm",
    dir: path.resolve(__dirname, "./dist"),
    preserveModules: true,
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
      declarationDir: path.resolve(__dirname, "./dist/libs/types"),
    }),
  ],
  external: [/@babel\/runtime/],
};
