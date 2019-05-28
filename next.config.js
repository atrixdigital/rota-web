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

const withExportPath = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    exportPathMap: async () => {
      let pages = {
        "/": { page: "/" },
        "/auth/login": { page: "/auth" },
        "/auth/register": { page: "/auth" },
        "/dashboard": { page: "/dashboard" },
        "/check-email": { page: "/check-email" },
        "/my-department": { page: "/my-department" },
        "/manage-staff": { page: "/manage-staff" },
        "/manage-schedule": { page: "/manage-schedule" },
        "/manage-leaves": { page: "/manage-leaves" }
      };

      return pages;
    }
  });
};

const withDistFolder = (nextConfig = {}) =>
  Object.assign({}, nextConfig, { distDir: "dist" });

// module.exports = withExportPath(
//   withTypescript(withCSS(withImages(withDotEnv(withDistFolder()))))
// );

module.exports = withExportPath(
  withTypescript(withCSS(withImages(withDotEnv(withDistFolder(withSass())))))
);
