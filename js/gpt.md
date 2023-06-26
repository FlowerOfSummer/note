// Webpack is a module bundler that takes modules with dependencies and generates static assets representing those modules.

// Loaders are transformations that are applied to the source code of a module. They allow you to pre-process files as you import or “load” them. 

// Plugins are used to extend the functionality of Webpack. They can be used to perform a wider range of tasks like bundle optimization, asset management, and injection of environment variables.

// To create a loader, you need to export a function that takes the source code as input and returns the transformed source code as output. The function should also include a set of options that can be passed to the loader. 

${INSERT_HERE}
// To create a loader, you need to export a function that takes the source code as input and returns the transformed source code as output. The function should also include a set of options that can be passed to the loader. 

// Here's a simple implementation of a webpack loader that compresses images using imagemin:

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = function(source) {
  const callback = this.async();
  imagemin.buffer(source, {
    plugins: [
      imageminMozjpeg()
    ]
  }).then(buffer => {
    callback(null, buffer);
  }).catch(error => {
    callback(error);
  });
};
// Here's a simple implementation of a webpack plugin that converts px to rem:

const pxToRem = require('postcss-pxtorem');

module.exports = class PxToRemPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('PxToRemPlugin', (compilation, callback) => {
      const cssAssets = Object.keys(compilation.assets).filter(asset => asset.endsWith('.css'));
      cssAssets.forEach(asset => {
        const source = compilation.assets[asset].source();
        postcss([pxToRem]).process(source).then(result => {
          compilation.assets[asset] = {
            source: () => result.css,
            size: () => result.css.length
          };
        }).catch(error => {
          console.error(error);
        });
      });
      callback();
    });
  }
};
