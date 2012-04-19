// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/underscore",
    backbone: "../assets/js/libs/backbone",
    backbone_tastypie: "../assets/js/libs/backbone-tastypie",
    icanhaz: "../assets/js/libs/iCanHaz",

    // Shim Plugin
    use: "../assets/js/plugins/use"
  },

  use: {
    backbone_tastypie: {
      deps: ["use!backbone", "use!underscore", "jquery"],
      attach: "Backbone"
    },

    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },

    underscore: {
      attach: "_"
    },
    
    icanhaz: {
      deps: ["jquery"],
      attach: "ich"
    }

  }
});
