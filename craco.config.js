const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@apis': path.resolve(__dirname, "./src/apis/"),
      '@modules': path.resolve(__dirname, "./src/modules/"),
      '@components': path.resolve(__dirname, "./src/components/")
    }
  }
}
