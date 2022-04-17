module.exports = ({ env }) => {
  return {
    plugins: [
      require("autoprefixer"),
      env === "production" ? require("cssnano") : null,
    ],
  }
}
