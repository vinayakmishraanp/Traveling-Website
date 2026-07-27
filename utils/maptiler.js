const maptiler = require("@maptiler/client");

maptiler.config.apiKey = process.env.MAP_TOKEN;

module.exports = maptiler;