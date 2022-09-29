const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

 module.exports = {
    chainWebpack: config => {
        [
            new GoogleFontsPlugin({
                fonts: [
                    { family: "Poppins" }
                ]
            })
        ]
     }
 }