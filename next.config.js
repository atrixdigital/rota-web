require("dotenv").config();
const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const fetch = require("node-fetch");
const http = require("https");
const withSass = require("@zeit/next-sass");

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}

const path = require("path");
const Dotenv = require("dotenv-webpack");

const withDotEnv = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];

      return config;
    }
  });

// const withExportPath = (nextConfig = {}) => {
//   return Object.assign({}, nextConfig, {
//     exportPathMap: async () => {
//       // get all projects from api

//       const getData = () => {
//         return new Promise(resolve => {
//           const options = {
//             method: "POST",
//             hostname: "osama-ahmed-resume-server.herokuapp.com",
//             port: null,
//             path: "/graphql",
//             headers: {
//               "content-type": "application/json",
//               "cache-control": "no-cache",
//               "postman-token": "b25a3c94-b5bd-957f-245c-e43f094bd437"
//             }
//           };

//           const req = http.request(options, res => {
//             const chunks = [];

//             res.on("data", chunk => chunks.push(chunk));

//             res.on("end", () => {
//               const body = Buffer.concat(chunks);
//               resolve(JSON.parse(body.toString()));
//             });

//             res.on("error", err => {
//               console.log(err);
//             });
//           });

//           req.write(
//             JSON.stringify({
//               operationName: null,
//               variables: {},
//               query: "{\n  getAllProject {\n    id\n  }\n}\n"
//             })
//           );
//           req.end();
//         });
//       };

//       let pages = {
//         "/": { page: "/" },
//         "/about": { page: "/about" },
//         "/contact": { page: "/contact" },
//         "/projects": { page: "/projects" },
//         "/resume": { page: "/resume" }
//       };

//       const response = await getData();

//       for (let i = 0; i < response.data.getAllProject.length; i++) {
//         const {
//           data: { getAllProject }
//         } = response;
//         pages[`/project/${getAllProject[i].id}`] = {
//           page: `/project`,
//           query: {
//             id: getAllProject[i].id
//           }
//         };
//       }

//       return pages;
//     }
//   });
// };

const withDistFolder = (nextConfig = {}) =>
  Object.assign({}, nextConfig, { distDir: "dist" });

const withCSSLoader = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    loader: "css-loader",
    options: {
      importLoaders: 2,
      modules: true,
      // namedExport: true, // this is  invalid Options ,I find it
      camelCase: true,
      localIdentName: "[path][name]__[local]--[hash:base64:5]"
    }
  });

// module.exports = withExportPath(
//   withTypescript(withCSS(withImages(withDotEnv(withDistFolder()))))
// );

module.exports = withTypescript(
  withCSS(withImages(withDotEnv(withDistFolder(withSass()))))
);
