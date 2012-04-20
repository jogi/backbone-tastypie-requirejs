define([
  // Libs
  "jquery",
  "use!underscore",
  "use!backbone_tastypie",
  "use!icanhaz"
],

function($, _, Backbone, ich) {
  // Put application wide code here

  return {
    // Create a custom object with a nested Views object
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Keep active application instances namespaced under an app object.
    app: _.extend({}, Backbone.Events)
  };
});
