module.exports = {
    //...
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
  };

// module.exports = {
//     resolve: {
//       fallback: {

//         "zlib": require.resolve("browserify-zlib"),
//         "http": require.resolve("stream-http"),
//         "fs" : false,
//         "os": require.resolve("os-browserify/browser"),
//         "crypto": require.resolve("crypto-browserify"),
//         "stream": require.resolve("stream-browserify"),
//         "path": require.resolve("path-browserify"),
//         "url": require.resolve("url/")

//       }
//     }
//   };
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// module.exports = {
// 	// Other rules...
// 	plugins: [
// 		new NodePolyfillPlugin()
// 	]
// };

