import babel from "@rollup/plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import html from "@web/rollup-plugin-html";
import iife from "rollup-plugin-iife";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/js",
  output: {
    name: "mainJS",
    dir: "build",
    format: "esm",
    sourceMap: process.env.NODE_ENV === "development" ? true : false,
    globals: {
      navbar: "navBar",
    },
  },
  plugins: [
    nodeResolve(),
    postcss({
      sourceMap: process.env.NODE_ENV === "production" ? false : true,
      autoModules: true,
      extensions: [".css", ".scss"],
      use: ["sass"],
      plugins: [autoprefixer()],
    }),
    html({
      input: "src/**/*.html",
      minify: process.env.NODE_ENV === "production" ? true : false,
      transformHtml: [
        /**
         *
         * @param {string} html
         * @param {*} args
         * @returns
         *
         * @todo Need to implement support for browsers that do
         *       not support 'type="module"' attributes in script
         *       tags
         */
        (html, args) => {
          let newHtml = html;
          const chunks = Object.entries(args.bundle.bundle).filter((bundle) => {
            if (bundle[0].match(/style-inject\.[a-z0-9\-]*\.js$/)) {
              newHtml = newHtml.replace(
                "<body>",
                `<body><script src='${bundle[0]}' defer></script>`
              );
              return bundle;
            }
          });

          return newHtml;
        },
      ],
    }),
    babel({ babelHelpers: "bundled" }),
    iife(), // Convert bundled esm into iife, done to support code splitting using iife
    process.env.NODE_ENV === "production" && uglify(),
    process.env.NODE_ENV === "development" &&
      serve({
        // Launch in browser (default: false)
        open: true,

        // Folder to serve files from
        contentBase: "build",

        // Options used in setting up server
        host: "localhost",
        port: 10001,

        //set headers
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }),
  ],
};
