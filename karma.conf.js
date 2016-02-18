module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'app/lib/angular.js',
      'app/lib/angular-mocks.js',
      'app/lib/js-data.js',
      'app/lib/js-data-localstorage.js',
      'app/lib/js-data-angular.js',
      'app/app.js',
      'app/**/*.controller.js',
      'app/**/*.spec.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}