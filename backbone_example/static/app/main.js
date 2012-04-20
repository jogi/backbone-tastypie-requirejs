require([
  "backtasty",

  // Libs
  "jquery",
  "use!backbone_tastypie",

  // Modules
  "modules/example",
  "modules/tweet"
],

function(backtasty, $, Backbone, Example, Tweet) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      ":example/": "example",
      ":hash": "index"
    },

    index: function() {

    },

    example: function(hash) {
      var route = this;
      var tutorial = new Example.Views.Tutorial();

      // Attach the tutorial to the DOM
      tutorial.render(function(el) {
        $("#main").html(el);

        // Fix for hashes in pushState and hash fragment
        if (hash && !route._alreadyTriggered) {
          // Reset to home, pushState support automatically converts hashes
          Backbone.history.navigate("", false);

          // Trigger the default browser behavior
          location.hash = hash;

          // Set an internal flag to stop recursive looping
          route._alreadyTriggered = true;
        }
      });
    }
  });

  // Shorthand the application namespace
  var app = backtasty.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    app.router = new Tweet.Router();
    app.tweets = new Tweet.Collection();
    app.list = new Tweet.Views.ListApp({
        el: $("#app"),
        collection: app.tweets
    });
    app.detail = new Tweet.Views.DetailApp({
        el: $("#app")
    });
    app.router.bind('route:list', function(){
        app.tweets.maybeFetch({
            success: _.bind(app.list.render, app.list)                
        });
    });
    app.router.bind('route:detail', function(id){
        app.tweets.getOrFetch(app.tweets.urlRoot + id + '/', {
            success: function(model){
                app.detail.model = model;
                app.detail.render();                    
            }
        });
    });

    app.list.bind('navigate', app.router.navigate_to, app.router);
    app.detail.bind('home', app.router.navigate_to, app.router);
    Backbone.history.start({
        pushState: true, 
        silent: app.loaded
    });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
