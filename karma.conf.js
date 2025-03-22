module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage-istanbul-reporter"), // Add the coverage reporter here
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false, // Keep Jasmine Spec Runner visible in the browser
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage"), // Output directory for reports
      reports: ["html", "lcovonly", "text-summary"], // Formats for coverage reports
      fixWebpackSourcePaths: true,
    },
    reporters: ["progress", "coverage-istanbul"], // Add coverage-istanbul to the reporters
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
