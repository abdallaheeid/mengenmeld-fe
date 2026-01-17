module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['ChromeHeadless'],
    reporters: ['progress', 'junit'],

    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'karma-results.xml',
      useBrowserName: false,
    },
  });
};
