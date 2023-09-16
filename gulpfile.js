/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require("gulp");
const less = require("gulp-less");
const through2 = require("through2");
const del = require("del");

/**
 * 拷贝less文件
 */
function copyLess() {
  return gulp
    .src("packages/ui/components/**/*.less")
    .pipe(gulp.dest(`packages/ui/es`))
    .pipe(gulp.dest(`packages/ui/cjs`));
}

/**
 * 生成组件库css文件
 */
function less2css() {
  return gulp
    .src("packages/ui/components/**/*.less")
    .pipe(
      less({
        javascriptEnabled: true,
      })
    ) // 处理less文件
    .pipe(gulp.dest(`packages/ui/es`))
    .pipe(gulp.dest(`packages/ui/cjs`));
}

/**
 * 生成主题库css文件
 */
function lessvar2css() {
  return gulp
    .src("packages/ui-theme-default/less/global.less")
    .pipe(
      less({
        javascriptEnabled: true,
      })
    ) // 处理less文件
    .pipe(gulp.dest(`packages/ui-theme-default`));
}

/**
 * 拷贝style/index.js
 */
function copyLessJs() {
  return gulp
    .src("packages/ui/components/**/*.js")
    .pipe(gulp.dest(`packages/ui/es`))
    .pipe(gulp.dest(`packages/ui/cjs`));
}

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, ".css");
}

/**
 * 将index.js转成css.js
 */
function index2css() {
  return gulp
    .src("packages/ui/components/**/*.js")
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 处理文件内容
          file.path = file.path.replace(/index\.js/, "css.js"); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      })
    )
    .pipe(gulp.dest(`packages/ui/es`))
    .pipe(gulp.dest(`packages/ui/cjs`));
}

function copyType() {
  return gulp
    .src("packages/ui/es/types/**/*.d.ts")
    .pipe(gulp.dest(`packages/ui/cjs`))
    .pipe(gulp.dest(`packages/ui/es`));
}

function delType(cb) {
  del(["packages/ui/es/types", "packages/ui/cjs/types"], cb());
}

const generateType = gulp.series(copyType, delType);

const build = gulp.parallel(generateType, less2css, lessvar2css);

exports.default = build;
