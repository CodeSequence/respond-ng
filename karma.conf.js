module.exports = function(config) {
  config.set({
    // ... normal karma configuration
    basePath: './',
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    files: [
      'tests.bundle.js'
    ],

    preprocessors: {
      'tests.bundle.js': ['webpack']
    },

    webpack: {
      resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      module: {
        loaders: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: 'babel?presets[]=es2015!ts-loader?ignoreDiagnostics[]=2300&ignoreDiagnostics[]=2661&ignoreDiagnostics[]=2375' }
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    }

  });
};
